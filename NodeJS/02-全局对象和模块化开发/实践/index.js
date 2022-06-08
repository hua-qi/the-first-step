// node 程序传递参数
// console.log(process.argv[0]);
// for (let item of process.argv) {
// console.log(item);
// }

console.log("module");
console.log(module);
console.log("+++++++++++++++++++++++++++");
console.log("module.__proto__");
console.log(module.__proto__);
console.log("+++++++++++++++++++++++++++");
console.log("module.__proto__.constructor");
console.log(module.__proto__.constructor);
console.log("+++++++++++++++++++++++++++");
console.log("global");
console.log(global);
console.log("+++++++++++++++++++++++++++");
console.log(module.__proto__.__proto__);
