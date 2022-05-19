// ES6 的 Class 与 ES5 的构造函数如何对象
// Class 可以看作一个语法糖，绝大部分功能， ES5 都可以做到

// 1. constructor
class PersonES6 {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `hello, I am ${this.name}`;
  }
}
// 静态的或原型的数据属性必须定义在类定义的外面。
PersonES6.prototype.age = 21;

let huaqi = new PersonES6("huaqi");
// console.log(huaqi);

let ret = huaqi.sayHello();
// console.log(ret); // hello, I am huaqi

// 对应到 ES5
function PersonES5(name) {
  this.name = name;
}

PersonES5.prototype.age = 21;
PersonES5.prototype.sayHello = function () {
  return `hello, I am ${this.name}`;
};

let huahua = new PersonES5("huahua");
// console.log(huahua);

// 可以看到 ES5 的构造函数 PersonES5，对应 ES6 的 PersonES6 的 constructor 方法
// 注：类的内部所有定义的方法，都是不可枚举的（non-enumerable）

// ES6
let keys_6 = Object.keys(PersonES6.prototype);
let propName_6 = Object.getOwnPropertyNames(PersonES6.prototype);

/* console.log(keys_6); // []
console.log(propName_6); // [ 'constructor', 'sayHello' ] */

// ES5
let keys_5 = Object.keys(PersonES5.prototype);
let propName_5 = Object.getOwnPropertyNames(PersonES5.prototype);

/* console.log(keys_5); // [ 'sayHello' ]
console.log(propName_5); // [ 'constructor', 'sayHello' ] */

// 1. 实例属性
// 以前 定义实例属性，只能写在类的 constructor 方法里面
class PersonES6_1 {
  constructor() {
    this.state = {
      count: 0,
    };
  }

  // 现在亦可以写在 constructor 外面
  state_out = {
    age: 1,
  };
}

// 对应到 ES5
function PersonES5_1() {
  this.state = {
    count: 0,
  };
}

let per6 = new PersonES6_1();
let per5 = new PersonES5_1();
/* console.log(per6);
console.log(per5);
 */

// 2. 静态方法
// 所有在类中定义的方法，都会被实例继承。
// 如果在方法前，添加 static 关键字，表示该方法不会被实例继承，而是直接通过类来调用，即静态方法

// 2.1. ES6

class PeES6 {
  static sayHello() {
    return "hello";
  }
}

PeES6.sayHello(); // return "hello"

let hua = new PeES6();
// hua.sayHello(); // TypeError：hua.sayHello is not a function

// 2.2. 对应 ES5
function PeES5() {}

PeES5.sayHello = function () {
  return "hello";
};

PeES5.sayHello(); // return "hello"

let hua5 = new PeES5();
// hua5.sayHello(); // TypeError: hua5.sayHello() is not a function

// new 调用
// 类必须使用 new 调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不使用 new 亦可以执行

// PeES6(); // Class constructor PeES6 cannot be invoked without 'new'

// getter 和 setter

// 与 ES5 一样，在“类”内部可以使用 get 和 set 关键字，对，某个属性设置存值函数和取值函数，拦截该属性的存取行为

class Pers {
  get name() {
    return "huaqi";
  }

  set name(newName) {
    console.log("new name 为：" + newName);
  }
}

let pers6 = new Pers();

// pers6.name = "hua"; // new name 为: hua

// console.log(pers6.name);

// ES5
function Pers5() {}

Pers5.prototype = {
  get name() {
    return "huaqiqi";
  },

  set name(newName) {
    console.log(`new name is ${newName}`);
  },
};

let pers5 = new Pers5();
console.log(pers5);
// pers5.name = "xiaoqi";

// console.log(pers5.name);
