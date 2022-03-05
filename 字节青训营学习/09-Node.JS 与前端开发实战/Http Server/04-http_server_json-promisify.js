const http = require("http");

// 创建服务
/* 
1. Promise() 只适合会被单次调用的回调函数
2. 而 http.createServer() 会在监听期间多次调用
3. 故而只是做 async 操作
 */
const server = http.createServer(async (req, res) => {
  // promisify 改写
  // 1. receive body from client
  const ret = await new Promise((reslove, reject) => {
    const bufs = [];
    // 接收请求数据
    req.on("data", buf => {
      bufs.push(buf);
    });

    // 监听 error 事件
    req.on("error", err => {
      reject(err);
    });

    // 监听  end 事件
    req.on("end", () => {
      // buf
      const buf = Buffer.concat(bufs).toString("utf-8");
      let msg = "hello";
      try {
        const ret = JSON.parse(buf);
        msg = ret.msg;

        reslove(msg);
      } catch (err) {
        reject(err);
        // res.end("invalid json");
      }
    });
  });

  // 2. response
  const responseJson = {
    msg: `receive: ${ret}`,
  };

  // 配置响应 header
  // 设置 Content-Type
  res.setHeader("Content-Type", "application/json");
  // 序列化
  res.end(JSON.stringify(responseJson));
});

const port = 3000;

// 监听端口
server.listen(port, () => {
  console.log("listening on: ", port);
});
