// 1. 工厂模式
// 缺点：对象无法识别，因为所有实例都指向一个原型(即 Object.prototype)
function createPerson(name) {
  console.log(name);
  let o = new Object();
  o.name = name;
  o.getName = function () {
    console.log(this.name);
  };
  return o;
}

let person01 = createPerson("huaqi");
let person02 = createPerson("huahua");
console.log(person01);
console.log(person02);

// 2. 构造函数模式
// 优点：实例可以被识别为一个特定的类型
// 缺点：每次创建实例时，每个方法都要被创建一次
function Person(name) {
  this.name = name;
  this.getName = function () {
    console.log(this.name);
  };
}

let person03 = new Person("huaqi");
console.log(person03);

// 2.1. 构造函数模式优化
// 优点：解决了每个方法都要被重新创建的问题
// 缺点：没有封装性
function PersonV2(name) {
  this.name = name;
  this.getName = getName;
}

function getName() {
  console.log(this.name);
}

// 3. 原型模式
// 优点：方法不会被重新创建
// 缺点：所有的属性和方法都共享；不能初始化参数
function PersonProto(name) {}
PersonProto.prototype.name = "huaqi";
PersonProto.prototype.getName = function () {
  console.log(this.name);
};

let person04 = new PersonProto();
console.log(person04);

// 3.1. 原型模式优化
// 优点：封装性好了一点
// 缺点：原版本缺点仍存在；丢失了 constructor 属性
function PersonProtoV2(name) {}
PersonProtoV2.prototype = {
  name: "huaqi",
  getName: function () {
    console.log(this.name);
  },
};

// 3.2. 原型模式再优化
// 优点：实例可以通过 constructor 属性找到所属构造函数
// 缺点：V0版本缺点仍存在
function PersonProtoV3() {}

PersonProtoV3.prototype = {
  constructor: PersonProtoV3,
  name: "huaqi",
  getName: function () {
    console.log(this.name);
  },
};

// 4. 组合模式（构造函数模式与原型模式组合）
// 优点：共享与私有分离，使用最广泛的方式
// 缺点：封装性可能差一点
function PersonCombin(name) {
  this.name = name;
}

PersonCombin.prototype = {
  constructor: PersonCombin,
  getName: function () {
    console.log(this.name);
  },
};
