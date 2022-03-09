const path = require("path");

module.exports = {
  // 定义当前项目入口文件
  entry: "./src/index.js",
  mode: "development",
  // devtools 关于 sourcemap 配置 拥有20多种value
  devtool: false,
  // 定义当前项目出口文件
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
  },
};
