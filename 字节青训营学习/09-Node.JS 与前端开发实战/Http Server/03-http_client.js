const http = require("http");

const body = JSON.stringify({
  msg: "Hello from my own client",
});

const req = http.request(
  "http://127.0.0.1:3000",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  },
  res => {
    const bufs = [];

    res.on("data", buf => {
      bufs.push(buf);
    });

    res.on("end", () => {
      const buf = Buffer.concat(bufs);
      const json = JSON.parse(buf);

      console.log(`json.msg is "${json.msg}"`);
    });
  }
);

req.end(body);
