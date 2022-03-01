const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 设置开发环境
  mode: "development",
  // 打包入口文件
  entry: {
    index: "./src/main.js",
  },
  // 打包输出文件
  // 使用 contenthash 模式，更大限度的利用浏览器的缓存机制
  /* 
  webpack 提供的 hash 配置：
  [hash]：整个项目共用同一个 hash 值，只要项目里有文件更改，整个项目构建的 hash 值都会更改。
  [chunkhash]：同一个模块共用一个 hash 值，就算将 JS 和 CSS 分离，其 hash 值也是相同的，修改一处，JS 和 CSS 的 hash 值都会变。
  [contenthash]：单个文件单独的 hash 值，只要文件内容不一样，产生的 hash 值就不一样。
   */
  output: {
    filename: "bundle_[contenthash:8].js",
  },
  // 创建本地服务
  devServer: {
    static: {
      directory: "./",
    },
    port: 8080,
  },
  // webpack 模块处理
  module: {
    rules: [
      {
        test: /.css$/, // 正则表达式，匹配 .css 后缀文件
        // css-loader：解析 JS 中的 CSS
        // style-loader: 将 CSS 代码以 <style> 形式添加到 HTML 头部
        // 针对 css 文件使用的loader。注意有先后顺序，索引越靠后越先执行
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  // webpack 插件
  plugins: [
    new HtmlWebpackPlugin({
      // 输出的文件名，默认为 index.html
      // 覆盖 webpack 的文件名 hash 配置
      filename: "index.html",
      // 需处理的文件路径
      template: "./index.html",
    }),
  ],
};
