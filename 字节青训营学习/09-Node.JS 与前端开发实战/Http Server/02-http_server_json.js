const http = require("http");

// 创建服务
const server = http.createServer((req, res) => {
  const bufs = [];
  // 接收请求数据
  req.on("data", buf => {
    bufs.push(buf);
  });

  req.on("end", () => {
    // buf
    const buf = Buffer.concat(bufs).toString("utf-8");
    let msg = "hello";
    try {
      const ret = JSON.parse(buf);
      msg = ret.msg;
    } catch (err) {
      res.end("invalid json");
    }

    const responseJson = {
      msg: `receive: ${msg}`,
    };

    // 配置响应 header
    // 设置 Content-Type
    res.setHeader("Content-Type", "application/json");
    // 序列化
    res.end(JSON.stringify(responseJson));
  });
});

const port = 3000;

// 监听端口
server.listen(port, () => {
  console.log("listening on: ", port);
});
