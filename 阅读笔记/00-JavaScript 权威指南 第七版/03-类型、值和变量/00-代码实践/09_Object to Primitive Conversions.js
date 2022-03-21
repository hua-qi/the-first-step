let obj = {
  name: "huaqi",
  age: 20,
};

/**
 * 1. Object To Boolean
 * 所有对象都会转换为 true
 */

let myFlase = new Boolean(false);

let bool00 = Boolean(obj);
let bool01 = Boolean([]);
let bool02 = Boolean(myFlase);

console.log(bool00);
console.log(bool01);
console.log(bool02);

console.log("=================");

/**
 * 2. Object-To-String
 * 首先使用 prefer-string 算法将对象转换为原始类型
 * 再根据相应规则将原始类型转换为字符串
 */

let str01 = String(obj);
let str02 = `${obj}`;

console.log(str01);
console.log(str02);
