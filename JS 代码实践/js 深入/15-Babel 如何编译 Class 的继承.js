// 一、ES5 寄生组合式继承
function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype);

let child1 = new Child("hua", 18);
console.log(child1);
// 这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。

// 二、ES6 extend
// Class 通过 extends 关键字实现继承
// 比 ES5 通过修改原型链实现继承，要清晰和方便

class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, ability) {
    super(name); // 调用父类的 construor(name)
    this.ability = ability;
  }
}

class Labrador extends Dog {
  constructor(name, ability) {
    this.name = name;
    this.ability = ability;
  }
}

let husky = new Dog("husky", "run");
console.log(husky);

// let labrador = new Labrador("labrador", "run");ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor

// 注意点：
// 1. super 关键字表示父类的构造函数，相当于 ES5 的 Parent.call(this)
// 2. 子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错，子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类就得不到 this 对象。
// 3. 也正是因为这个原因，在子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错

// 三、子类的 _proto_
// 在 ES6 中，父类的 静态方法，可以被子类继承
class Foo {
  static classMethod() {
    return "hello";
  }
}

class Bar extends Foo {}

console.log(Bar.classMethod()); // hello

// 这是因为 Class 作为构造函数的语法糖，同时具有 prototype 属性 和 _proto_ 属性，因此同时存在两条继承链
// （1）子类的 _proto_ 属性，表示构造函数的继承，总是指向父类
// （2）子类的 prototype 属性的 _proto__ 属性，表示方法的继承，总是指向父类的 prototype 属性

console.log(Bar.__proto__ === Foo); // true
console.log(Bar.prototype.__proto__ === Foo.prototype); // true
