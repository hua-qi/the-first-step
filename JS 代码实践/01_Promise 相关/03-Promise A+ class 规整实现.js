// 定于三个常量表示状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

// 新建 MyPromise 类
class MyPromise {
  constructor(executor) {
    /* 
      executor 作为执行器，在 MyPromise 实例化时，会立即执行
      并传入 resolve reject 回调方法，监听执行器内函数的执行情况
       */
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  // 存储状态、成功值、失败原因
  status = PENDING;
  value = null;
  reason = null;

  /* 
    存储 then() 中的回调函数
    因为同一个实例可以多次调用 then 方法（这里并不是指链式调用）
 */
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  // 静态方法
  static resolve(parameter) {
    // 如果传入 MyPromise 则直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise(resolve => {
      resolve(parameter);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  // 执行器通过调用 resolve() 通知 MyPromise 状态改变为 Fulfilled
  resolve = value => {
    // 只有当前状态为 PENDING ，才可以执行状态更改 与 value 赋值
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;

      // 执行所有 then() 中的成功回调
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };

  // 执行器通过调用 reject() 通知 MyPromise 状态改变为 Rejected
  reject = reason => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;

      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };

  // MyPromise 通过调用 then() 对不同状态（Fulfilled、Rejected）执行不同的回调函数
  then(onFulfilled, onRejected) {
    // 可选参数处理
    const realOnFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : value => value;
    const realOnRejected =
      typeof onRejected === "function"
        ? onRejected
        : reason => {
            throw reason;
          };

    /* 
    为实现 then() 链式调用，在此处创建一个 MyPromise
    并在之后进行 return

    为什么不在这里直接 return ？
    为了判断 MyPromise 返回自身，需要有一个引用指向自身
     */
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化（由事件循环，该微任务必在当前函数之后执行）
        queueMicrotask(() => {
          try {
            const x = realOnFulfilled(this.value);

            // 获取 then() 成功回调函数的执行结果。并传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };

      // 根据当前状态，进行对应操作
      if (this.status === FULFILLED) {
        fulfilledMicrotask();
      } else if (this.status === REJECTED) {
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        /* 
          当前不知道未来的状态变化，将 then 的成功回调或失败回调分别存储
        // 等待执行器对应的回调函数执行后，再执行微任务创建
           */
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });

    return promise2;
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // 如果 then() 中回调返回自身，抛出类型错误并返回
  if (promise === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }

  if (typeof x === "object" || typeof x === "function") {
    // x 为 null 时，直接返回，否则后面的逻辑会报错
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      then = x.then;
    } catch (err) {
      // 如果获取 x.then 的值时，抛出错误，则以 error 为由拒绝 promise
      return reject(err);
    }

    // 如果then 是函数
    if (typeof then === "function") {
      let called = false;

      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            /* 
              如果 resolvePromise 和 rejectPromise 均被调用
              或者被同一参数调用多次，则优先采用首次调用并忽略剩下的调用
               */
            if (called) return;
            called = true;
            resolvePromise(promise, x, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (err) {
        // 如果调用 then 方法抛出异常 error

        // 且 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;

        // 否则以 error 为据因 拒绝 promise
        reject(err);
      }
    } else {
      // 如果 x 不为对象或者函数， 以 x 为参数执行 promise
      resolve(x);
    }
  }
}
