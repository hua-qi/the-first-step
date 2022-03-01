# scripts

```shell
npm run build
```

打包项目文件命令, 输出为 dist 文件夹。

```shell
npm run dev
```

运行 development 模式下的项目。

项目配置

- webpack - 打包工具
- webpack-cli - webpack 命令行界面
- webpack-dev-server -  Serves a webpack app. Updates the browser on changes
- css-loader - 解析 JS 中的 CSS
- style-loader - 将 CSS 以 \<style src=""> 标签的形式加载到 HTML 中
- html-webpack-plugin - 覆盖 webpack 的文件名 hash 配置
- Babel is a JavaScript compiler. 主要用于将采用 **ESMAScript 2015+** 语法编写的代码转化为**向后兼容**的 JavaScript 代码,以便项目能够运行在旧版本的浏览器或其他环境中
  - @babel/core - Babel compiler core 
  - @babel/cli - Babel command line interface
  - @babel/preset-env - a Babel preset for each environment
- babel-loader - This package allows transpiling JavaScript files using Babel and webpack.