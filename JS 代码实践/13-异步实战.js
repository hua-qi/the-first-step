// 以 查找指定目录下的最大文件 为例
// 感受 回调函数 -> Promise -> Generator -> Async
// 异步处理方式的改变

/* 
API 介绍
1. fs.readdir 读取目录，返回一个包含文件和目录的数组
2. fs.stat    参数是一个文件或目录，产生一个对象，该对象包含了该文件或目录的具体信息。
3. 上述对象拥有 isFile() 方法，用于判断正在处理的对象是一个文件还是目录
 */

/* 
实现思路
1. 使用 fs.readdir 获取指定目录的内容信息
2. 循环遍历内容信息，使用 fs.stat 获取该文件或目录的具体信息
3. 将具体信息存储起来
4. 当全部遍历完毕后，在存储信息中筛选是文件的对象
5. 遍历比较，找出最大文件
6. 获取并返回最大文件
 */

// =============================================
// 代码实现
// 1. 回调函数
let fs = require("fs");
let path = require("path");

function findLargestByCB(dir, cb) {
  // 读取目录下的所有文件
  fs.readdir(dir, function (err, files) {
    if (err) return cb(err);

    let errored = false;
    let counter = files.length;
    let stats = [];

    files.forEach(function (file) {
      // 读取文件信息
      fs.stat(path.join(dir, file), function (err, stat) {
        // 读取失败
        if (errored) return;

        if (err) {
          errored = true;
          return cb(err);
        }

        // 也许你就要问了，为什么这里使用 index 而不是用 push，好像没差别？
        // stats[index] = stat;

        stats.push(stat);

        if (--counter === 0) {
          /* 
        我是这么写的，面向过程式，好像有些许的不优雅
        let largestFile;
        let flag = true;
          for (let item of stats) {
            if (item.isFile()) {
              if (flag) {
                largestFile = item;
                flag = false;
              }

              if (item.size > largestFile.size) {
                largestFile = item;
              }
            }
          } */

          /*  
         原作者是这样写的，但是相当于遍历两遍数组
         不过性能应该没差，哈哈哈哈哈 都是 O(n)
         */
          let largestFile = data.stats
            .filter(function (stat) {
              return stat.isFile();
            })
            .reduce((prev, next) => {
              if (prev.size > next.size) return prev;
              return next;
            });

          cb(null, files[stats.indexOf(largestFile)]);
        }
      });
    });
  });
}

/* findLargestByCB("./", function (err, filename) {
  if (err) return console.error(err);

  console.log("larget file was: ", filename);
}); */

// 2. Promise 实现
let readDir = function (dir) {
  return new Promise(function (resolve, reject) {
    fs.readdir(dir, function (err, files) {
      if (err) reject(err);

      resolve(files);
    });
  });
};

let stat = function (path) {
  return new Promise(function (resolve, reject) {
    fs.stat(path, function (err, stat) {
      if (err) reject(err);

      resolve(stat);
    });
  });
};

function findLargestByPromise(dir) {
  return readDir(dir)
    .then(function (files) {
      let statPromises = files.map(file => stat(path.join(dir, file)));

      return Promise.all(statPromises).then(function (stats) {
        return {
          stats,
          files,
        };
      });
    })
    .then(function (data) {
      let largestFile = data.stats
        .filter(function (stat) {
          return stat.isFile();
        })
        .reduce((prev, next) => {
          if (prev.size > next.size) return prev;

          return next;
        });

      return data.files[data.stats.indexOf(largestFile)];
    });
}

/* findLargestByPromise("./")
  .then(function (filename) {
    console.log(`largest file was: ${filename}`);
  })
  .catch(function (err) {
    console.log(err);
  }); */

// 3. Generator 实现
// let co = require("co");

function* findLargestByGenerator(dir) {
  let files = yield readDir(dir);
  let stats = yield files.map(function (file) {
    return stat(path.join(dir, file));
  });

  let largestFile = stats
    .filter(function (stat) {
      return stat.isFile();
    })
    .reduce((prev, next) => {
      if (prev.size > next.size) return prev;

      return next;
    });

  return files[stats.indexOf(largestFile)];
}

// 需要以前安装 co 模块
// co(findLargestByGenerator, "./")
//   .then(function (filename) {
//     console.log(`largest file was: ${filename}`);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// 4. Async 方式
async function findLargestByAsync(dir) {
  let files = await readDir(dir);

  let statPromises = files.map(file => stat(path.join(dir, file)));
  let stats = await Promise.all(statPromises);

  let largestFile = stats
    .filter(function (stat) {
      return stat.isFile();
    })
    .reduce((prev, next) => {
      if (prev.size > next.size) return prev;

      return next;
    });

  return files[stats.indexOf(largestFile)];
}

findLargestByAsync("./")
  .then(function (filename) {
    console.log("largest file was:", filename);
  })
  .catch(function () {
    console.log(error);
  });
