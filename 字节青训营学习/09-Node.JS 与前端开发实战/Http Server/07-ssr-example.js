const http = require("http");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

// react component
function App(props) {
  // return <div>Hello</div>
  return React.createElement("div", {}, props.children || "Hello");
}

const server = http.createServer((req, res) => {
  // 使用模板字符串代替模板引擎
  res.end(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>My Application</title>
        </head>
        <body>
            ${ReactDOMServer.renderToString(
              React.createElement(App, {}, "my_content")
            )}
            <script>
                // init react application
            </script>
        </body>
    </html>
    `);
});

const port = 3000;

server.listen(port, () => {
  console.log("listening on: ", port);
});
