// 01-实现 call、apply
/* 
思路：利用 this 的上下文特性

实现 apply 只需要将 ...args 换为 args
 */

Function.prototype.myCall = function (context = globalThis, ...args) {
  const fn = Symbol("fn");
  context[fn] = this;

  // 利用 this 执行，相当于 contetx.call(...args)
  const res = context[fn](...args);

  delete context[fn];
  return res;
};

// 02 bind
/* 
核心要点：
1、对于普通函数，绑定 this 指向
2、对于构造函数，保证原函数的原型对象上的属性不能丢失
 */

Function.prototype.bind = function (context = globalThis, ...args) {
  // this 指向调用 bind() 的函数
  const self = this;
  const fBound = function () {
    //  this instanceof fBound 为 true 表示作为构造函数使用，如 new func.bind(obj)

    return self.apply(
      this instanceof fBound ? this : context || window,
      args.concat(Array.prototype.slice(arguments))
    );
  };

  // 保证原函数的原型对象不受影响
  fBound.prototype = Object.create(self.prototype);

  return fBound;
};
