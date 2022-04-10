// 数据绑定的关键在于监听数据的变化，可是对于这样一个对象
/* 
let obj = {
  value: 1,
}; 
*/
// 我们该怎么知道 obj 发生了改变呢？

// 一、defineProperty
// ES5 提供了 Object.defineProperty 方式，该方法可以在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象
// 语法：Object.defineProperty(obj, prop, descriptor)
// obj: 要在其上定义属性的对象
// prop：要定义或修改的属性的名称
// descriptor：将被定义或修改的属性的描述符（分为 数据描述符和存取描述符）

/* 
数据描述符
value, 默认为 undefined
writable, 默认为 fasle
enumerable, 默认为 fasle
configurable, 默认为 fasle
 */
/* 
存取描述符
get, 默认为 undefined
set, 默认为 undefined
enumerable, 默认为 fasle
configurable, 默认为 fasle
 */

let obj = {};
Object.defineProperty(obj, "num", {
  value: 1,
  writable: true,
  enumerable: true,
  configurable: true,
});
// 对象 obj 拥有属性 num，值为 1

let userName = "huaqi";
Object.defineProperty(obj, "name", {
  get: function () {
    return userName;
  },
  set: function (newName) {
    userName = newName;
  },
  enumerable: true,
  configurable: true,
});

// 注： 所有的属性描述符都是非必须的
Object.defineProperty(obj, "age", {});

console.log(obj); // age: undefined

console.log("===================================");

// 二、Setters 和 Getters
// 存取描述符中的 get 和 set，两个方法又被称为 getter 和 setter。
// 由 getter 和 setter 定义的属性称作 “存储器属性”

// 当程序 查询 存取器属性的值时，JavaScript 调用 getter 方法。这个方法的返回值就是属性存取表达式的值
// 当程序 设置 一个存取器属性的值时，JavaScript 调用 setter 方法，将 赋值表达式 “=” 右侧的值当作参数传入 setter。从某种意义上讲，这个方法负责“设置”属性值。可以忽略 setter 方法的返回值。

let objV2 = {},
  value = null;

Object.defineProperty(objV2, "num", {
  get: function () {
    console.log("执行了 get 操作");
    return value;
  },
  set: function (newValue) {
    console.log("执行了 set 操作");
    value = newValue;
  },
});

objV2.num = 1; // 执行了 set 操作
console.log(objV2.num); // 执行了 get 操作

// 进一步封装，监控数据改变
function Archiver() {
  let value = null;
  // archive 档案
  let archive = [];

  Object.defineProperty(this, "num", {
    get: function () {
      console.log("执行了 get 操作");
      return value;
    },
    set: function (newValue) {
      console.log("执行了 set 操作");
      value = newValue;
      archive.push({ val: newValue });
    },
  });

  this.getArchive = function () {
    return archive;
  };
}

let arc = new Archiver();

arc.num; // 执行了 get 操作
arc.num = 11; // 执行了 set 操作
arc.num = 13; // 执行了 set 操作

console.log(arc.num);
console.log(arc.getArchive());

console.log("==============================");

// 三、watch API（封装 defineProperty ）
// 当数据改变时，自动进行渲染工作
// 请见17-watch API.html
// =======================================

// 四、proxy
/* 
使用 defineProperty 只能重定义属性的读取（get）和 设置（set）行为。

ES6 提供了 Proxy 可以重定义更多的行为，比如 in、delete、函数调用等更多行为

Proxy n. 代理，在这里表示由它来 “代理” 某些操作
ES6 原生提供了 Proxy 构造函数，用于生成 Proxy 实例

语法： let proxy = new Proxy(target, handler);

proxy 对象所有用法，都是上述形式，不同的只是 handler 参数的写法

new Proxy() 表示生成一个 Proxy 实例，
target 表示所要拦截的目标对象(注意 函数亦是对象)
hanlder 亦是一个对象，用于定制拦截行为

 */

let proxy = new Proxy(
  {},
  {
    get: function (obj, prop) {
      console.log("读取 get 操作");
      return obj[prop];
    },
    set: function (obj, prop, value) {
      console.log("设置 set 操作");
      obj[prop] = value;
    },
  }
);

proxy.time = 53; // 设置 set 操作
console.log(proxy.time); // 读取操作 53

console.log("-------------------------------");

// 除get、set 之外，proxy 可以拦截多大 13 种操作
// 比如  has(target, propKey) 可以拦截 propKey in proxy 的操作，返回一个布尔值

let handler = {
  has(target, key) {
    if (key[0] === "_") {
      return false;
    }

    return key in target;
  },
};

let target = {
  _prop: "foo",
  prop: "foo",
};

let hasProxy = new Proxy(target, handler);
console.log("_prop" in hasProxy); // false
console.log("prop" in hasProxy); // true

console.log("-------------------------------");

// apply 方法拦截函数的调用、call 和 apply 的操作
/* 
apply 接受三个参数
目标对象
目标对象的上下文对象（this）
目标对象的参数数组
 */

let applyTarget = function () {
  return "I am the applyTarget";
};

let applyHandler = {
  apply: function () {
    return "I am the proxy";
  },
};

let applyProxy = new Proxy(applyTarget, applyHandler);

let ret = applyProxy();
console.log(ret); // I am the proxy

console.log("--------------------");

/*
ownKeys 方法可以拦截对象自身属性的读取操作
具体来说，拦截以下操作：
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Object.keys()

下述例子拦截第一个字符为下划线的属性名，避免被 for of 遍历到
  */
let propertyTarget = {
  _bar: "foo",
  _prop: "bar",
  prop: "baz",
};

let propertyHandler = {
  ownKeys(target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== "_");
  },
};

let propertyProxy = new Proxy(propertyTarget, propertyHandler);

for (let key of Object.keys(propertyProxy)) {
  console.log(propertyTarget[key]);
}
// baz

/* 
使用场景
1. vue2 使用 defineProperty 通过 getter / setter 进行数据劫持
2. vue3 换成 Proxy，存在向下兼容问题
 */
