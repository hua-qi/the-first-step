const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const path = require("path");

// 1. 创建文件夹
const dirname = "../../test";
// 首先需要判断是否已存在同名文件夹
if (!fs.existsSync(dirname)) {
  fs.mkdir(dirname, err => console.log(err));
}

// 2. 读取文件夹中的所有文件
/* fs.readdir("../01-fs", (err, files) => {
  console.log(files);
}); */

// 递归读取
/* function getFiles(dirname) {
  // withFileType 作用
  fs.readdir(dirname, { withFileTypes: true }, (err, files) => {
    for (let file of files) {
      //   console.log(file);
      if (file.isDirectory()) {
        const dirPath = path.resolve(dirname, file.name);
        getFiles(dirPath);
      } else {
        console.log(file.name);
      }
    }
  });
}

getFiles(dirname); */

// Promise 改写上述
const getFilesPro = (dirname, filesName = []) => {
  return new Promise((resolve, rejects) => {
    const dirsArr = [dirname];

    while (dirsArr.length > 0) {
      const dir = dirsArr.shift();
      const files = fs.readdirSync(dir, { withFileTypes: true });
      for (let file of files) {
        if (file.isDirectory()) {
          const dirPath = path.resolve(dir, file.name);
          dirsArr.push(dirPath);
        } else {
          filesName.push(file.name);
        }
      }
    }

    if (!dirsArr.length) resolve(filesName);
  });
};

getFilesPro(dirname)
  .then(res => console.log(res))
  .catch(err => console.log(err));

// 3. 文件夹的重命名
