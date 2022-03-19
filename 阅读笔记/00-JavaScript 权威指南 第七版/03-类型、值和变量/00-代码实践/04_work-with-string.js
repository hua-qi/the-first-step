// 1. 字符串配合 + 运算符使用

let msg = "Hello, " + "world"; // Produces the string "Hello, world"
let name = 9;
let greeting = "Welcome to my blog," + " " + name; // 隐式类型转换

console.log(msg);
console.log(greeting);

// 2. 字符串配合 === !== > < >= <= 使用
console.log("huaqi" === "hu");
console.log("huaqi" !== "hu");
console.log("huaqi" >= "hu");
console.log("huaqi" > "hu");
console.log("huaqi" <= "hu");
console.log("huaqi" < "hu");

// 3. 模板字面量
let filename = "huaqi";
let linenumber = 10;
let exception = {
  message: "Hello World",
  stack: [1, 2, 3, 4, 5],
};
let errorMessage = `\
\u2718 Test failure at ${filename}:${linenumber}:
${exception.message}
Stack trace:
${exception.stack}
`;
console.log(errorMessage);

// 4.1. 使用模板字符串进行数组转字符串
let arr = [1, 2, 3, 4, 5];
console.log(arr.toString());
console.log(arr.toLocaleString());
console.log(arr.join(""));
console.log(`${arr}`);
