// 1. 函数定义方式
// 1.1. 函数声明
function fn1() {
  console.log(this);
}
// 匿名函数声明
// function() {
//     console.log(this)
// }

// 1.2. 函数表达式
let fn2 = function () {
  console.log(this);
};
let fn3 = () => {
  console.log(this);
};

// 1.3. 构造函数
let fn4 = Function("", "console.log(this)");

// 函数执行
// 1. 直接调用全局函数
// fn1(); // 指向全局对象(window、global)

// 2. 作为对象方法进行调用
let obj01 = {
  name: "huaqi",
  fn1: function () {
    console.log(this);
    // console.log(this.__proto__.__proto__);
  },
};
// obj01.fn1();
// console.log(obj01);

// 3. 作为构造函数方法进行调用
function Obj02() {
  this.name = "hauqi";
  console.log(this.__proto__.__proto__);
  this.fn1 = function () {
    console.log(this);
  };
}
let obj02 = new Obj02();
// obj02.fn1();

// 3. 间接调用
function fn5() {
  console.log(this);
}
fn5.apply();
// 假值实验
fn5.apply(null);
fn5.apply(undefined);
// 6大假值中，只有以上二者会使 this 指向全局对象
fn5.apply(""); // String("")
fn5.apply(NaN); // Number()
fn5.apply(0); // Number()
fn5.apply(-0); // Number()

//
fn5.apply(1);
fn5.apply("122");
fn5.apply(true);
fn5.apply(obj02);

// typeof
console.log(typeof NaN);
console.log(typeof null);
console.log(typeof Date);
