// 1、实现单例模式
/* 
核心要点
使用闭包和 Proxy 属性拦截
 */

function proxy(func) {
  let instance;
  let handler = {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(func, args);
      }
      return instance;
    },
  };

  return new Proxy(func, handler);
}

/* 
对象方式
 */

function singleFunc() {}

const single = {
  unique: null,
  getInstance: function () {
    if (!this.unique) {
      this.unique = new singleFunc();
    }
    return this.unique;
  },
};

Object.freeze(single);
