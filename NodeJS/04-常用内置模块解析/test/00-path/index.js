const path = require("path");

// 1. 获取路径信息

/* const filepath = "/user/huaqi/qi.txt";

console.log(path.dirname(filepath)); // 文件路径 /user/huaqi
console.log(path.basename(filepath)); // 文件名称 qi.txt
console.log(path.extname(filepath)); // 文件后缀 .txt */

// ==============================================

// 2. join 路径拼接

/* const basepath = "/user/huaqi";
const filename = "qi.txt";
const filePath = path.join(basepath, filename);
console.log(filePath); // \user\huaqi\qi.txt */

// ==============================================

// 3. resolve 路径拼接

/* const basepath = "/user/huaqi";
const filename = "qi.txt";
const filePath = path.resolve(basepath, filename);
console.log(filePath); // E:\user\huaqi\qi.txt */

// ==============================================

// 4. join() 和 resolve() 区别

// resolve() 会判断拼接的路径字符串中，是否有以 / 、./ 、../ 开头的路径

/* const basepath = "../user/huaqi"; // 修改 user 前不同的符号如 /、./、../ 观察打印结果的不同
const filename = "/qi.txt"; // resolve 亦会根据此处 qi 前是否有符号而得出不同的结果

const filePath_join = path.join(basepath, filename);
const filePath_resolve = path.resolve(basepath, filename);

console.log(filePath_join);
console.log(filePath_resolve); */

// ==============================================
