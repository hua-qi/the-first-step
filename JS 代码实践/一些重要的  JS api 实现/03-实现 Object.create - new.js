// 01 Object.create()

function create(proto) {
  function F() {}
  F.prototype = proto;
  F.prototype.constructor = F;

  return new F();
}

// 02 new 关键字
/* 
核心要点：
1、创建一个全新的对象，这个对象的 __proto__ 要指向构造函数的原型对象
2、执行构造函数
3、返回值为 Object 类型则作为 new 方法的返回值返回，否则返回上述创建的新对象
 */
function myNew(fn, ...args) {
  const instance = Object.create(fn.prototype);
  const res = fn.apply(instance, args);
  return typeof res === "object" ? res : instance;
}
