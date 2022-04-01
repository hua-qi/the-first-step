// 1. 初步实现

function objectFactory() {
  // 声明一个新 object，获取构造函数（取得类数组对象 arguments 的第一项）
  let obj = new Object(),
    Constructor = [].shift.call(arguments);

  // 之后 obj 可以访问 构造函数原型中的属性
  obj.__proto__ = Constructor.prototype;

  // 使得构造函数的 this 指向 新的空对象(obj)
  // 并执行构造函数代码,诸如 this.name = "huaqi" (注 由于构造函数每次实例化时,都会执行内部代码,会为引用类型创建新的堆地址)
  // 为 this(即空对象) 挂载新属性
  Constructor.apply(obj, arguments);

  return obj;
}

function Otaku(name, age) {
  this.name = name;
  this.age = age;

  this.habit = "Games";
}

Otaku.prototype.strength = 60;
Otaku.prototype.introduce = function () {
  console.log(`My name is ${this.name}`);
};

let otakuPerson = objectFactory(Otaku, "huahua", 21);
console.log(otakuPerson);
console.log(otakuPerson.strength);
otakuPerson.introduce();

// 2. 如果构造函数拥有返回值
// 2.1. 若返回值为引用类型，那么相当于使用对应构造函数创建了一个实例（对象、数组）
// 2.2.若返回值为原始类型，那么相当于没有返回值

// 2.1.
function Otaku01(name, age) {
  this.strength = 60;
  this.age = age;

  return {
    name,
    habit: "Games",
  };
  //   return ["name", "Game"];
}

let person01 = new Otaku01("hua", 20);
console.log(person01);

// 2.2.
function Otaku02(name, age) {
  this.strength = 60;
  this.age = age;

  return `${name}'s habit is games.`;
}

let person02 = new Otaku02("hua", 20);
console.log(person02);

// 3. 完美版 new 实现
function objectFactoryV2() {
  let obj = new Object();

  Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  let ret = Constructor.apply(obj, arguments);

  // 判断构造函数返回值
  // 如果是引用类型，则返回结果
  // 如果是原始值类型，则返回新对象
  return typeof ret === "object" ? ret : obj;
}
