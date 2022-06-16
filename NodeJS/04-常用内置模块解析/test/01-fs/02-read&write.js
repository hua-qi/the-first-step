const fs = require("fs");

const content = "Everyday is fun!";

// 1. 文件写入
fs.writeFile("./demo.txt", content, { flag: "a" }, err => console.log(err));

// 2. 文件读取
fs.readFile("./demo.txt", { encoding: "utf8" }, (err, data) => {
  // 若不指定编码格式，data 默认是 buffer 格式
  console.log(data);
});
