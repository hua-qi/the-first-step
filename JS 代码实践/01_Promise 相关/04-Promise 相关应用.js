// 1. 每隔 1 秒输出 1，2，3
const arr = [1, 2, 3];
let promise_test01 = () => {
  return arr.reduce((p, x) => {
    return p.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(console.log(x));
        }, 1000);
      });
    });
  }, Promise.resolve());
};

// promise_test01();

// 拓展：在一秒后同时打印 1、2、3
// 原因：如果 then() 的参数不是函数，会发生值穿透，但是 then() 中的代码仍会执行
// 则下述代码，即是将三个定时器，倒计时完毕后，依次加入 宏任务队列中
let promise_test02 = () => {
  return arr.reduce((p, x) => {
    return p.then(
      new Promise(resolve => {
        setTimeout(() => {
          resolve(console.log(x));
        }, 1000);
      })
    );
  }, Promise.resolve());
};

// promise_test02();
// ==================================================

// 实现红绿灯效果
function red() {
  console.log("red");
}

function green() {
  console.log("green");
}

function yellow() {
  console.log("yellow");
}

const light = function (timer, cb) {
  return new Promise(resolve => {
    cb();
    setTimeout(() => {
      resolve();
    }, timer);
  });
};

const step = function () {
  Promise.resolve()
    .then(() => {
      return light(3000, red);
    })
    .then(() => {
      return light(2000, green);
    })
    .then(() => {
      return light(1000, yellow);
    })
    .then(() => {
      step();
    });
};

// step();

// 拓展
const wait = timer => {
  return new Promise(resolve => {
    setTimeout(resolve, timer);
  });
};

const start = async () => {
  while (1) {
    red();
    await wait(3000);
    green();
    await wait(2000);
    yellow();
    await wait(1000);
  }
};

// start();

// =====================================================

// 3. 实现 mergePromise 函数
// 将参数 函数数组 按顺序先后执行，并且函数返回值按先后顺序填充到新数组中

const time = timer => {
  return new Promise(resolve => {
    setTimeout(resolve, timer);
  });
};

const ajax1 = () => {
  return time(2000).then(() => {
    console.log(1);
    return 1;
  });
};

const ajax2 = () => {
  return time(2000).then(() => {
    console.log(2);
    return 2;
  });
};

const ajax3 = () => {
  return time(2000).then(() => {
    console.log(3);
    return 3;
  });
};

async function mergePromise(arr) {
  let data = [];

  let promise = Promise.resolve();

  arr.forEach(item => {
    promise = promise.then(item).then(res => {
      data.push(res);
      return data;
    });
  });

  return promise;
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log("done");
  console.log(data); // data [1,2,3]
});

// ===================================================

// 4. 异步加载图片的方法

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      console.log("一张图片加载完成");
      resolve(img);
    };
    img.onerror = function () {
      reject(new Error("Could not load image at" + url));
    };
    img.src = url;
  });
}
