const englishStr =
  "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWxYZ";
const chinaStr = "你好呀！";
// 1. 创建 buffer (被弃用)
/* const strBuffer = new Buffer(message);

console.log(strBuffer); */

// 2. 创建 buffer (推荐)
// 默认使用 utf-8 编码
const englishStrBuffer = Buffer.from(englishStr);
console.log(englishStrBuffer);
const chinaStrBuffer = Buffer.from(chinaStr);
console.log(chinaStrBuffer);

// 3. 不同编码格式尝试
const chinaStrBuffer01 = Buffer.from(chinaStr, "utf16le");
console.log(chinaStrBuffer01);

// 4. 编码与解码格式不同的尝试
// buffer.toString() 默认使用 utf-8 格式解码
console.log(chinaStrBuffer.toString()); // 你好呀！
console.log(chinaStrBuffer01.toString()); // 乱码 `O}Y@T�
console.log(chinaStrBuffer01.toString("utf16le")); // 你好呀！
