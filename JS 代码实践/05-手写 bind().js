globalThis.value = "global";

let obj = {
  value: "huaqi",
};

function foo(name, age) {
  console.log(this.value);
  return {
    name,
    age,
  };
}

// 1. bind01 返回绑定了新 this 的函数 (且考虑返回值情况)
Function.prototype.bind01 = function (context) {
  context = Object(context) || globalThis;

  // 箭头函数没有自己的 this 指向，其 this 会默认指向父级作用域
  // 为什么
  return () => {
    return this.apply(context);
  };
};

let foo01 = foo.bind01(obj);
// foo01();

let foo02 = foo.bind01();
// let age = foo02();
// console.log(age);
// console.log(globalThis);

console.log("===========================================================");

// 2. 模拟函数传参
Function.prototype.bind02 = function (context) {
  context = Object(context) || globalThis;
  let self = this;
  // 此时是 原函数 bind this 时接收参数
  let args = Array.prototype.slice.call(arguments, 1);
  return function () {
    // 此时是 经过 bind 处理后的函数 接收参数
    let bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(context, args.concat(bindArgs));
  };
};
let foo03 = foo.bind02(obj, "huaqi");
// let ret = foo03(21);
// console.log(ret);

console.log("===========================================================");

// 3. 保留函数的 构造函数特性
Function.prototype.bind03 = function (context) {
  // 调用 bind03() 的函数判断
  if (typeof this !== "function") {
    throw new Error("Type Error");
  }
  // context 边界判断
  context = Object(context) || globalThis;
  // 获取调用 bind03() 的函数
  let self = this;

  // 获取 调用 bind03() 传参
  let args = Array.prototype.slice.call(arguments, 1);

  // 经 bind03() 处理后返回的新函数
  let fBound = function () {
    //  获取新函数的参数
    let bindArgs = Array.prototype.slice.call(arguments);

    // 当函数作为构造函数时，this 指向实例
    // 当函数作为普通函数时，this 指向 globalThis
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(bindArgs)
    );
  };

  // 修改 经bind03() 处理的新函数 prototype 为 原调用者的 prototype
  // 此时有一个弊端, 由于 fBound 与 调用 bind03()的原函数共用一个 prototye
  // 故而修改其中任意一个的 prototype 会影响其他
  //   fBound.prototype = this.prototype;

  // 设定一个中转站
  let fNOP = function () {};

  fNOP.prototye = this.prototype;

  fBound.prototype = new fNOP();
  return fBound;
};

let obj02 = {
  value: 99999,
};

function ff(name, age) {
  this.name = name;
  this.age = age;
  console.log(this.value);
}
ff.prototype.friend = "huahua";

// 此时尽管 绑定了 obj02
// 但是当 newFf 作为构造函数时, this指向自身
let newFf = ff.bind03(obj02);

console.log(newFf.toString());

let FfObj = new newFf("huaqi", 21);
console.log(FfObj);
