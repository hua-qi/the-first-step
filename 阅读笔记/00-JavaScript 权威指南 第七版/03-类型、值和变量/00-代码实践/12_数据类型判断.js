// typeof

console.log(typeof undefined); // undefined
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof Symbol("foo")); // symbol
console.log(typeof 2172141653n); // bigint
console.log(typeof function () {}); // function
// 不能判别
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof null); // object

// instanceof
console.log("huaqi" instanceof String); // false
console.log(1 instanceof Number); // false
console.log(false instanceof Boolean); // false

console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(String instanceof Object); // true
console.log(Number instanceof Object); // true
console.log(Boolean instanceof Object); // true
console.log(Symbol instanceof Object); // true
console.log(BigInt instanceof Object); // true
console.log(Function instanceof Object); // true
console.log(Object instanceof Function); // true

class Person {
  constructor(name) {
    this.name = name;
  }
}
class Coder extends Person {
  constructor(name, direction) {
    super(name);
    this.direction = direction;
  }
}
let coderLZM = new Coder("huaqi", "front-end");
console.log(coderLZM instanceof Coder); // true
console.log(coderLZM instanceof Person); // true

// Object.prototype.toString.call()
let sym = Symbol(10);
let big = BigInt(10);
let obj1 = Object.prototype.toString.call(2); // "[object Number]"
let obj2 = Object.prototype.toString.call(""); // "[object String]"
let obj3 = Object.prototype.toString.call(true); // "[object Boolean]"
let obj4 = Object.prototype.toString.call(undefined); // "[object Undefined]"
let obj5 = Object.prototype.toString.call(null); // "[object Null]"
let obj6 = Object.prototype.toString.call(sym); // "[object Symbol]"
let obj7 = Object.prototype.toString.call(big); // "[object BigInt]"
let obj8 = Object.prototype.toString.call(Math); // "[object Math]"
let obj9 = Object.prototype.toString.call({}); // "[object Object]"
let obj10 = Object.prototype.toString.call([]); // "[object Array]"
let obj11 = Object.prototype.toString.call(function () {}); // "[object Function]"

console.log(obj1);
console.log(obj2);
console.log(obj3);
console.log(obj4);
console.log(obj5);
console.log(obj6);
console.log(obj7);
console.log(obj8);
console.log(obj9);
console.log(obj10);
console.log(obj11);

// 判断数据类型是否为数组
let arr = [1, 2, 3, 4, 5];

let arr1 = Array.isArray(arr); // true
let arr2 = arr.__proto__ === Array.prototype; // true
let arr3 = arr instanceof Array; // true
let arr4 = Object.prototype.toString.call(arr); // [object Array]

console.log(arr1);
console.log(arr2);
console.log(arr3);
console.log(arr4);
