const http = require("http");

const server = http.createServer((req, res) => {
  res.end("hello huaqi_");
});

const port = 3000;

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
