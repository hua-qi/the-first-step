const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// 静态文件夹路径
const folderPath = path.resolve(__dirname, "../images");

const server = http.createServer((req, res) => {
  // expected http://127.0.0.1:3000/NodeJS-RunTime.png?adb=16&name=huaqi
  const urlInfo = url.parse(req.url);

  // images/NodeJs-RunTime
  const filepath = path.resolve(folderPath, "./" + urlInfo.path);

  console.log("filepath: ", filepath);
  // stream api ...
  /* 
  stream 风格 API 与 readfile() 相比，可减少更多的内存占用
 */
  const fileStream = fs.createReadStream(filepath);
  fileStream.pipe(res);

  // 先忽略 Content-Type 设置
});

const port = 3000;

server.listen(port, () => {
  console.log("listening on: ", port);
});
