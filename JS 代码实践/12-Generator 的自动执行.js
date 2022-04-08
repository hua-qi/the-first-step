// 一、单个异步任务

let fetch = require("node-fetch");

function* gen() {
  let url = "https://api.github.com/users/github";
  let result = yield fetch(url);
  console.log(result.bio);
}

// 获取最终结果

let iterator = gen();
let result = iterator.next();

result.value
  .then(function (data) {
    return data.json();
  })
  .then(function (jsonData) {
    iterator.next(jsonData);
  });

/* 
上述代码分析
1. 执行 Generator 函数，获取迭代器对象 iterator
2. 执行 iterator.next()，执行异步任务的第一个阶段，即 fetch(url)
2.1. 由于 fetch(url) 会返回一个 Promise 对象，所以 result 的值为
{ 
  value: Promise { <pending> }, 
  done: false
}
3. 执行 Promise.then() 格式化响应数据 data.json，return 格式化后数据（注意 一个新的 Promise 对象，仍具有 then() 方法）
4. 再调用 iterator.next() 并将格式化后的数据传进去，由此执行异步任务的第二阶段，代码执行完毕
 */

// 二、多个异步任务
let fetch = require("node-fetch");

function* gen01() {
  var r1 = yield fetch("https://api.github.com/users/github");
  var r2 = yield fetch("https://api.github.com/users/github/followers");
  var r3 = yield fetch("https://api.github.com/users/github/repos");

  console.log([r1.bio, r2[0].login, r3[0].full_name].join("\n"));
}

let iterator01 = gen01();
let result01 = iterator01.next();

// 很雷人

result01.value
  .then(function (data) {
    return data.json();
  })
  .then(function (jsonData) {
    return iterator.next(jsonData).value;
  })
  .then(function (data) {
    return data.json();
  })
  .then(function (jsonData) {
    return iterator.next(jsonData).value;
  })
  .then(function (data) {
    return data.json();
  })
  .then(function (jsonData) {
    return iterator.next(jsonData);
  });

// 上述代码优化 递归~

function run(gen) {
  let iterator = gen();

  function next(jsonData) {
    /* 
    result: {
      value: Promise { <pending> },
      done: false
    }
     */
    let result = iterator.next(jsonData);

    if (result.done) return;

    result.value
      .then(function (data) {
        return data.json();
      })
      .then(function (jsonData) {
        next(jsonData);
      });
  }

  next();
}

run(gen01);

// 三、启动器函数
// 为了应对更广泛的情况，比如 yield 后直接跟一个 Promise，而非 fetch 函数返回的 Promise，那么就没有自身的 json 方法
// 而在上述 run() 的代码实现中，会直接调用返回值的 json() 方法，若该返回值没有 json() 代码会报错

let fetch = require("node-fetch");
const { isPromise } = require("util/types");

function* gen02() {
  var r1 = yield fetch("https://api.github.com/users/github");
  var json1 = yield r1.json();
  var r2 = yield fetch("https://api.github.com/users/github/followers");
  var json2 = yield r2.json();
  var r3 = yield fetch("https://api.github.com/users/github/repos");
  var json3 = yield r3.json();

  console.log([json1.bio, json2[0].login, json3[0].full_name].join("\n"));
}

// 局限： yield 后一定要跟着一个 Promise 对象，才能保证 Generator 的自动执行
function run01(gen) {
  let iterator = gen();

  function next(data) {
    let result = iterator.next(data);

    if (result.done) return;

    result.value.then(function (data) {
      next(data);
    });
  }

  next();
}

run01(gen02);

// 四、普通异步请求
function fetchData(url, cb) {
  setTimeout(function () {
    cb({
      status: 200,
      data: url,
    });
  }, 100);
}

// 上述代码改造
function fetchData01(url) {
  return function (cb) {
    setTimeout(function () {
      cb({
        status: 200,
        data: url,
      });
    }, 1000);
  };
}

// 普通异步请求的 Generator 函数封装
function* gen03() {
  var r1 = yield fetchData("https://api.github.com/users/github");
  var r2 = yield fetchData("https://api.github.com/users/github/followers");

  console.log([r1.data, r2.data].join("\n"));
}

let iterator02 = gen03();
let r1 = iterator02.next();

r1.value(function (data) {
  let r2 = iterator02.next(data);
  r2.value(function (data) {
    iterator02.next(data);
  });
});

// 递归优化

function run02(gen) {
  let iterator = gen();

  function next(data) {
    let result = iterator.next(data);

    if (result.done) return;

    result.value(next);
  }

  next();
}

run(gen03);

// 五、最终封装

// 由上述代码可知，Generator 函数的自动执行需要一种机制，即 当异步操作有了结果，能够自动交回执行权

// 有两种方法可以做到这一点
// 1. 回调函数。将异步操作进行包装，暴露出回调函数，在回调函数里面交回执行权
// 2. Promise 对象。将异步操作包装称 Promise 对象，用 then() 方法交回执行权

// 5.1. 第一版
function run(gen) {
  let iterator = gen();

  function next(data) {
    let result = iterator.next(data);

    if (result.done) return;

    if (isPromise(result.value)) {
      result.value.then(function (data) {
        next(data);
      });
    } else {
      result.value(next);
    }
  }

  next();
}

function isPromise(obj) {
  return "function" === typeof obj.then;
}

// 如何获得 Generator 函数的返回值？
// 如果 Generator 函数中出现了错误，这个错误应该如何捕获？

// 5.2. 第二版
function run(gen) {
  let iterator = gen();

  return new Promise(function (resolve, reject) {
    function next(data) {
      let result;

      try {
        result = iterator.next(data);
      } catch (err) {
        return reject(err);
      }

      if (result.done) {
        return resolve(result.value);
      }

      let value = toPromise(result.value);

      value
        .then(function (data) {
          next(data);
        })
        .catch(function (err) {
          reject(err);
        });
    }

    next();
  });
}

function isPromise(obj) {
  return "function" === typeof obj.then;
}

// 遵循 error first 原则
function thunkToPromise(fn) {
  return new Promise(function (resolve, reject) {
    fn(function (err, res) {
      if (err) return reject(err);

      resolve(res);
    });
  });
}

function toPromise(obj) {
  if (isPromise(obj)) return obj;

  if ("funtion" === typeof obj) return thunkToPromise(obj);

  return obj;
}

// 模拟数据请求（error first）
// 请求成功时，第一个参数应为 null，标识没有错误原因
function fetchData02(url) {
  return function (cb) {
    setTimeout(function () {
      cb(null, { status: 200, data: url });
    }, 1000);
  };
}

// 5.3. 优雅版

function run(gen) {
  return new Promise(function (resolve, reject) {
    let iterator;
    if (typeof gen === "function") {
      iterator = gen();
    }

    // 如果 iterator 不是一个迭代器
    if (!iterator || typeof iterator.next !== "function") {
      return resolve(iterator);
    }

    function onFulfilled(res) {
      let ret;

      try {
        ret = iterator.next(res);
      } catch (err) {
        return reject(err);
      }

      next(ret);
    }

    function onRejected(err) {
      let ret;

      try {
        ret = iterator.throw(err);
      } catch (err) {
        return reject(err);
      }

      next(ret);
    }

    function next(ret) {
      if (ret.done) {
        return resolve(ret.value);
      }

      let value = toPromise(ret.value);

      if (value && isPromise(value)) {
        return value.then(onFulfilled, onRejected);
      }

      return onRejected(
        new TypeError(
          `You may only yield a function, Promise but the following object was passed "${String(
            ret.value
          )}"`
        )
      );
    }
  });
}

// 如果再将上述 启动器函数完善，那么就相当于写了一个 co
// 实际上，上面的代码确实来自于 co
