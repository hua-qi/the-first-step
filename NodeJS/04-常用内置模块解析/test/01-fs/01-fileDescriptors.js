const fs = require("fs");

fs.open("./demo.txt", (err, fd) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(fd);

  // 通过与 demo.txt 相映射的文件描述符以获取文件信息
  fs.fstat(fd, (err, info) => {
    console.log(info);
  });
});
