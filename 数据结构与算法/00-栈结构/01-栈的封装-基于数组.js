/*
函数的不同称呼: 
Method: 和某一个对象实例有联系
Function: 普通函数 
 */

// 封装栈类
function Stack() {
  // 栈类的属性
  this.items = [];

  // 栈的相关操作
  // 1. 将元素压入栈
  /*
  此种声明方式：是为每个实例化后的类绑定一个方法
  即，每实例化一次对象，均会创建一个新的方法，占用内存
   this.push = function () {};
   */
  /*
  此种声明方式：是在构造函数的显式原型对象中添加方法
  通过该构造方法实例化的对象的隐式原型，与构造函数的显式原型 指向同一原型
  Stack.prototype.push = function () {}; 
   */
  Stack.prototype.push = function (element) {
    this.items.push(element);
  };

  // 2. 从栈中取出元素
  Stack.prototype.pop = function () {
    return this.items.pop();
  };

  // 3. 查看一下栈顶元素
  Stack.prototype.peek = function () {
    return this.items[this.items.length - 1];
  };

  // 4. 判断栈是否为空
  Stack.prototype.isEmpty = function () {
    return this.items.length === 0;
  };

  // 5. 获取栈中元素的个数
  Stack.prototype.size = function () {
    return this.items.length;
  };

  // 6. toString 方法
  Stack.prototype.toString = function () {
    let resStr = "";

    this.items.forEach(item => {
      resStr += item.toString();
    });

    return resStr;
  };
}
// 栈类的实例化
let myStack = new Stack();

/*
显式原型与隐式原型的实验
console.log(Stack.prototype);
console.log(myStack.__proto__);
console.log(Stack.prototype === myStack.__proto__);

// 指向 Object 对象
console.log(myStack.__proto__.__proto__)
// 指向原型链最终点 null
console.log(myStack.__proto__.__proto__.__proto__);
*/

// 栈的使用
[1, 2, 3, 4, 5, 6].forEach(item => {
  myStack.push(item);
});

console.log(myStack.toString());
console.log(myStack.peek());

// 栈的应用
// 1. 十进制转二进制
function dec2bin(decNumber) {
  // 1.1. 实例化栈对象
  let decStack = new Stack();

  // 1.2. 循环操作
  while (decNumber > 0) {
    decStack.push(decNumber % 2);
    decNumber = Math.floor(decNumber / 2);
  }
  return decStack.toString().split("").reverse().join("");
}

let binary = dec2bin(100);
console.log(binary);
console.log(dec2bin(10));
