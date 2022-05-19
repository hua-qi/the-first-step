// 1. 原型链继承
function Parent(name) {
  this.name = name;
  this.firends = ["huahua", "xiaoqi"];
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child() {}

// 此时是将 Parent 实例作为 Child 的原型对象
// new 关键字，创建一个新对象，将构造函数属性作为新对象的属性（浅拷贝）
Child.prototype = new Parent("huaqi");

let child01 = new Child();

console.log(child01.getName());
child01.name = "huahua";
console.log(child01.getName());
console.log(child01.__proto__);

// 1.1. 原型链继承弊端
// 1.1.1. 创建 Child 的实例时,不能向 Parent 传参
// 1.1.2. 引用类型的属性被所有实例共享
let child02 = new Child();
console.log(child01.firends);
console.log(child02.firends);
console.log(Child.prototype);
console.log("===============");

console.log(child02.firends.push("qiqi"));
console.log(child01.firends);
console.log(child02.firends);
console.log(Child.prototype);
console.log("===================================");

// 2. 借用构造函数(经典继承)
// 优点
// 2.1. 避免了引用类型的属性被所有实例共享
// 2.2. 可以在 Child 中向 Parent 传参
// 缺点：方法在构造函数中定义，每次创建实例都会创建一遍方法
function Parent01(name) {
  this.name = name;
  this.firends = ["huahua", "xiaoqi"];
}
// 由于每次 构造函数实例化时
// 会创建一个空对象,而构造函数的 this 会指向该空对象
// Parent01.call(this) 执行时,相当于为这个 this(及空对象) 重新创建诸多属性
function Child01(name) {
  Parent01.call(this, name);
}

let child03 = new Child01();

console.log(child03);

let child04 = new Child01("huaqi");
console.log(child04);

console.log("=================================");
// 3. 组合继承（原型链继承与经典继承组合）
// 优点：融合原型链继承和构造的优点，是 JS 中最常用的继承模式
function ParentCombin(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

ParentCombin.prototype.getName = function () {
  console.log(this.name);
};

function ChildCombin(name, grade) {
  ParentCombin.call(this, name);
  this.grade = grade;
}

ChildCombin.prototype = new ParentCombin();
ChildCombin.prototype.constructor = ChildCombin;

let childCombin01 = new ChildCombin("huaqi", 11);
childCombin01.colors.push("black");

console.log(childCombin01);

let childCombin02 = new ChildCombin("huahua", 22);
console.log(childCombin02);

console.log("==================================");

// 4. 原型式继承
// 即 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型
// 缺点：包含引用类型的属性值始终都会共享相应的值，这点与原型链继承一致
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

let person = {
  name: "huaqi",
  firends: ["huahua", "qiqi"],
};

let person01 = createObj(person);
console.log(person01);
person01.firends.push("flower");
let person02 = createObj(person);
console.log(person02);
