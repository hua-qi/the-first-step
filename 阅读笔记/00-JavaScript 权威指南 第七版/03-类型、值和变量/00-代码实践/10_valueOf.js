let str = String("string");
let num = Number(10);
let boo = Boolean("fasle");
let d = new Date(2010, 0, 1);
let func = function () {
  console.log("func");
};
let arr = Array(1, 2, 3, 4);

console.log(str.valueOf());
console.log(num.valueOf());
console.log(boo.valueOf());
console.log(d.valueOf());
console.log(func.valueOf());
console.log(arr.valueOf());

// 为什么空数组可以转换为数字 0
console.log(Number([]));
console.log(Number([99]));
