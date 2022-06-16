const fs = require("fs");

// 读取文件信息三种方式
const filePath = "./demo.txt";

// 1. 同步读取
const infoSync = fs.statSync(filePath);
console.log("后续执行标识符");
console.log(infoSync);

console.log("=====================");

// 2. 异步读取
fs.stat(filePath, (err, info) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("callback");
  console.log(info);
});
console.log("后续执行标识符");

console.log("=====================");

// 3. promise 读取
fs.promises
  .stat(filePath)
  .then(info => {
    console.log("promise");
    console.log(info);
  })
  .catch(err => console.log(err));
console.log("后续执行标识符");
