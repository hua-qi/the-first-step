const http = require("http");

const body = JSON.stringify({
  msg: "Hello from my own client",
});

// 发送请求
const ret = new Promise((resolve, reject) => {
  const req = http.request(
    "http://127.0.0.1:3000",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
    res => resolve(res)
  );
  // 携带信息
  req.end(body);
});

// 处理响应
ret.then(res => {
  // 处理响应
  const bufs = [];

  res.on("data", buf => {
    bufs.push(buf);
  });

  res.on("end", () => {
    const buf = Buffer.concat(bufs);
    const json = JSON.parse(buf);

    console.log(`json.msg is "${json.msg}"`);
  });
});
