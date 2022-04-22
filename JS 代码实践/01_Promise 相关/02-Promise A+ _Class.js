// 定义三个常量表示状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

// 新建 MyPromise 类
class MyPromise {
  constructor(executor) {
    try {
      // executor 是一个执行器，创建实例时，立即执行
      executor(this.reslove, this.reject);
    } catch (err) {
      // 捕捉执行器错误
      this.reject(err);
    }
  }

  // 存储状态的变量，初始值为 pending
  status = PENDING;

  // 成功值 / 失败的原因
  value = null;
  reason = null;

  // 存储成功回调函数 / 失败回调函数
  /* 
  注意不是链式调用，而是同一个 Promise  实例，多次调用 then() 
  存在问题，Promise 实例会存储结果，多次调用 then 时，最后调用的 then 中 成功和失败回调，会覆盖到之前的回调函数

  如果是同步 executor，直接返回当前值
  如果是异步 executor，需要将 then 方法中的回调依次存储起来

  onFulfilledCallback = null;
  onRejectedCallback = null;

  以下改进
  */
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  // 静态方法
  static resolve(parameter) {
    // 如果传入的参数为 MyPromise 的实例
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转换为常规方式
    return new MyPromise(resolve => {
      resolve(parameter);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  /*
  resolve 和 reject 为什么要用箭头函数？
  如果时普通函数的话，直接调用时 this 指向 window 或 undefined
  箭头函数可以使 this 指向当前实例对象
   */
  reslove = value => {
    // 只有当前状态是 pending，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改 与 value 赋值
      this.status = FULFILLED;
      this.value = value;

      // 如果成功回调函数存在，那么就调用
      // this.onFulfilledCallback && this.onFulfilledCallback(value);
      // 将存储的 then 成功回调函数依次执行
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };

  reject = reason => {
    // 处理同 resolve
    if (this.status === PENDING) {
      // 状态修改 与 value 赋值
      this.status = REJECTED;
      this.reason = reason;

      // 处理同 resolve，如果失败回调函数存在，那么就调用
      // this.onRejectedCallback && this.onRejectedCallback(reason);
      // 将存储的 then 失败回调函数依次执行
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };

  // then 的简单实现
  then(onFulfilled, onRejected) {
    // 参数可选
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : value => value;
    onRejected =
      typeof onRejected === "function" ? onRejected : reason => reason;

    // 实现 then 的链式调用，return MyPromise 的实例，
    const promise2 = new MyPromise((resolve, reject) => {
      // 状态判断
      if (this.status === FULFILLED) {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 调用 resolve 回调，并将值返回
            const x = onFulfilled(this.value);

            // resolvePromise 集中处理，将 promise2 传入
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      } else if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      } else if (this.status === PENDING) {
        // 由于不知晓未来的状态变化情况，将成功回调和失败回调存储
        this.onFulfilledCallbacks.push(value => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
        });
        this.onRejectedCallbacks.push(value => {
          queueMicrotask(() => {
            try {
              const x = onRejected(value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
        });
      }
    });

    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 判断 x 是否等于 自己（即 promise2）
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }

  // 判断 x 是否是 MyPromise 的实例
  if (x instanceof MyPromise) {
    /* 
    执行 x，调用其 then 方法，目的是将其状态变更为 fulfilled 或者 rejected
    x.then(value => resolve(value), reason => reject(reason))
    简化
     */
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}

// 对外暴露 MyPromise 类
// export default MyPromise;

const promise_1 = new MyPromise((resolve, reject) => {
  resolve("success");
  reject("err");
});

/* promise_1.then(
  value => {
    console.log("resolve: ", value);
  },
  err => {
    console.log("reject ", err);
  }
); */

const promise_2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
    reject("err");
  }, 2000);
});

/* promise_2
  .then()
  .then()
  .then(
    value => {
      console.log(1);
      console.log("resolve: ", value);
    },
    err => {
      console.log("reject ", err);
    }
  ); */

MyPromise.resolve()
  .then(() => {
    console.log(0);
    return MyPromise.resolve(4);
  })
  .then(res => {
    console.log(res);
  });
