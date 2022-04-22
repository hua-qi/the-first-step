function Promise(executor) {
  // 状态描述 pending resolved rejected
  this.state = "pending";

  // 成功结果
  this.value = undefined;
  // 失败原因
  this.reason = undefined;

  // 保存成功回调
  this.onResolvedCallbacks = [];
  // 保存失败回调
  this.onRejectedCallbacks = [];

  // 处理函数立即执行
  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }

  // 使用 _this = this 托管构造函数的 this
  let _this = this;

  function resolve(value) {
    if (_this.state === "pending") {
      _this.value = value;

      // 遍历执行成功回调函数
      _this.onResolvedCallbacks.forEach(cb => cb(value));

      _this.state = "resolved";
    }
  }

  function reject(reason) {
    if (_this.state === "pending") {
      _this.reason = reason;

      // 遍历执行失败回调
      _this.onRejectedCallbacks.forEach(cb => cb(reason));

      _this.state = "rejected";
    }
  }
}

/* 
首先then 方法必须返回一个 promise 对象(划重点)

如果then方法中返回的是一个普通值(如 Number、String 等)就使用此值包装成一个新的 Promise 对象返回

如果then方法中没有return语句，就返回一个用 Undefined 包装的 Promise 对象

如果then方法中出现异常，则调用失败态方法(reject)跳转到下一个then的 onRejected

如果then方法没有传入任何回调，则继续向下传递(值穿透)

如果then方法中返回了一个 Promise 对象，那就以这个对象为准，返回它的结果
 */

Promise.prototype.then = function (onFulfilled, onRejected) {
  // 需要对 then 的参数进行类型判断，两个参数不是必选参，如果不是函数类型应对其进行处理
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : value => value;

  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : err => {
          throw err;
        };

  // then 返回一个新的 Promise
  let newP = new Promise((resolve, reject) => {
    // pending 状态判断，此时异步代码为执行完毕，将回调推入队列
    if (this.state === "pending") {
      // this.onResolvedCallbacks.push(onFulfilled);
      // this.onRejectedCallbacks.push(onRejected);
      // 将上述代码进行优化

      this.onResolvedCallbacks.push(value => {
        try {
          let ret = onFulfilled(value);
          resolve(ret);
        } catch (err) {
          reject(err);
        }
      });

      this.onRejectedCallbacks.push(reason => {
        try {
          let ret = onRejected(reason);
          resolve(ret);
        } catch (err) {
          reject(err);
        }
      });
    }

    if (this.state === "resolved") {
      try {
        // 获取返回值进行 resolve
        let ret = onFulfilled(this.value);
        resolve(ret);
      } catch (err) {
        // 捕获异常并 reject
        reject(err);
      }
    }

    if (this.state === "rejected") {
      try {
        let ret = onRejected(this.reason);
        resolve(ret);
      } catch (err) {
        reject(err);
      }
    }
  });

  return newP;
};

Promise.prototype.catch = function (onRejected) {
  if (this.state === "rejected") {
    onRejected(this.reason);
  }
};

/*
 * 处理根据上一个 then 方法的返回值，生成新的 Promise 对象
 * 解析then返回值与新Promise对象
 * @param {Object} 新的Promise对象，就是我们创建的 newP 实例
 * @param {*} ret 上一个then的返回值
 * @param {Function} resolve newP 处理器函数的resolve
 * @param {Function} reject newP 处理器函数的reject
 */
function resolvePromise(newP, ret, resolve, reject) {}

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

console.log(p1);

p1.then(data => console.log(data));
