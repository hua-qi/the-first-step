// 验证 对象声明 是  new Object 的 语法糖

let huaqi = new Object();
huaqi.name = "huaqi";
huaqi.__proto__.age = "21";
console.log(huaqi);
console.log(huaqi.__proto__);

let hua = {
  name: "huaqi",
};

console.log(hua);
console.log(hua.__proto__);
console.log(hua.__proto__.__proto__);

// 构造函数创建对象

function Foo() {
  this.name = "hua";
  Foo.prototype.name = "qi";
}

let fo = new Foo();
console.log(fo);
console.log(fo.__proto__);
console.log(fo.__proto__ === Foo.prototype);
console.log(fo.__proto__.__proto__);

console.log(Foo.__proto__ === Function.prototype);

console.log(Foo.prototype.__proto__);
