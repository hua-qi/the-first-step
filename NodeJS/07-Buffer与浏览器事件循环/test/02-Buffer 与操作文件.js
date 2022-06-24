const fs = require("fs");

const sharp = require("sharp");
// 1. 读取文本文件

// 使用默认格式解码
const txtDataUtf = fs.readFileSync("./test.txt", { encoding: "utf-8" });
console.log(txtDataUtf);

// 不解码
const txtDataBuf = fs.readFileSync("./test.txt");
console.log(txtDataBuf); // Buffer 二进制数据

// 手动解码

const txtDataToStr = txtDataBuf.toString();
console.log(txtDataToStr);

// 不同格式解码
const txtDataU16 = fs.readFileSync("./test.txt", { encoding: "utf16le" });
console.log(txtDataU16); // 乱码

console.log("========================================");

// 2. 读取图片文件

const imgDataU = fs.readFileSync("../images/高坂丽奈.png");
console.log(imgDataU);

// 复制图片操作
// fs.writeFileSync("../images/Kirino.png", imgDataU);

// 对图片进行处理
/* sharp("../images/高坂丽奈.png")
  .resize(200, 200)
  .toFile("../images/Kirino200x200.png"); */
