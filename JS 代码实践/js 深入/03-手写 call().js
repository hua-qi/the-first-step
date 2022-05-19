// 手写实现
var foo = {
  value: 1,
};

function bar() {
  console.log(this.value);
}

// bar.call(foo); // 1

// call01 为函数绑定 this
Function.prototype.call01 = function (context) {
  //   console.log(context); {value: 1}
  //   console.log(this); [Function: bar]
  context.fn = this;
  context.fn();
  delete context.fn;
};
// bar.call01(foo);

// call02 接收函数传递的参数

function bar01(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}

// bar01.call(foo, "huaqi", 21);

// ...arguments  rest 运算符，接收剩余参数
Function.prototype.call02 = function (context, ...arguments) {
  // console.log(context);  { value: 1 }
  // console.log(arguments);  ["huaqi", 21];

  context.fn = this;
  // ... 扩展运算符
  context.fn(...arguments);
  delete context.fn;
};

// bar01.call02(foo, "huaqi", 21);

// call03
// 1. context 为空时，为全局对象
// 2. 具有返回值

var value = 1;

function bar02(name, age) {
  // console.log(this);
  let value = this.value;
  return {
    name,
    age,
    value,
  };
}

// ... rest 运算符
Function.prototype.call03 = function (context, ...arguments) {
  if (typeof this !== "function") {
    throw new Error("Type Error");
  }

  // node 环境下如何是好
  // context = context || global
  // context = context || window;
  context = context || globalThis;

  context.fn = this;
  // ... 解构运算符
  let result = context.fn(...arguments);
  delete context.fn;

  return result;
};

let res = bar02.call03(null, "huaqi", 21);
// console.log(res);

let res01 = bar02.call(null, "huaqi", 21);
// console.log(res01);

//  res 与 res01 值一致
// { name: 'huaqi', age: 21, value: undefined }
// value 均为 undefined

// ES3 实现
Function.prototype.callES03 = function (context) {
  // console.log(context);  { value: 1 }
  // console.log(arguments);  [Arguments] { '0': { value: 1 }, '1': 'huaqi', '2': 21 }
  // arguments 类数组对象可以使用 for 循环遍历
  if (typeof this !== "function") {
    throw new Error("Type Error");
  }

  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`);
  }

  // 边界判断，且 context 为原始值时，使用 Object 构造函数进行处理
  context = Object(context) || globalThis;
  context.fn = this;
  console.log(args.toString());
  // eval() 会将传入的 string 作为 JavaScript 代码执行
  let result = eval(`context.fn(${args})`); // args 自动执行 Array.prototype.toString() 方法

  delete context.fn;
  return result;
};

let res02 = bar02.callES03(null, "huaqi", 21);
console.log(res02);

console.log(typeof this !== "");
