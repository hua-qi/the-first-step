# Node.JS 与前端开发实战

## 目录

- [Node.JS 与前端开发实战](#nodejs-与前端开发实战)
  - [目录](#目录)
  - [Node.js 的应用场景（why）](#nodejs-的应用场景why)
    - [前端工程化](#前端工程化)
    - [Web 服务端应用](#web-服务端应用)
    - [Electron 跨端桌面应用](#electron-跨端桌面应用)
    - [Node.js 在字节](#nodejs-在字节)
  - [Node.js 运行时结构](#nodejs-运行时结构)
    - [deps 作用](#deps-作用)
    - [deps 作用 重点](#deps-作用-重点)
    - [举例：使用 node-fetch 发起请求时](#举例使用-node-fetch-发起请求时)
    - [特点](#特点)
      - [异步 I/O](#异步-io)
      - [单线程](#单线程)
      - [跨平台](#跨平台)
  - [编写 Http Server](#编写-http-server)
    - [安装 Node.js](#安装-nodejs)
    - [与高性能、可靠的服务相比，还差什么？](#与高性能可靠的服务相比还差什么)
    - [外部服务](#外部服务)
    - [React SSR](#react-ssr)
      - [SSR（Server Side Rendering）服务端渲染 特点](#ssrserver-side-rendering服务端渲染-特点)
      - [SSR 难点](#ssr-难点)
    - [Debug](#debug)
    - [部署](#部署)
  - [延申话题](#延申话题)
    - [Node.js 贡献代码](#nodejs-贡献代码)
    - [编译 Node.js](#编译-nodejs)
    - [诊断 / 追踪](#诊断--追踪)
    - [WASM, NAPI](#wasm-napi)
  - [课后答疑](#课后答疑)
    - [Node.js 作为后端与 JAVA、Go 性能差比](#nodejs-作为后端与-javago-性能差比)
    - [作为前端实习生怎么对待 Node.js](#作为前端实习生怎么对待-nodejs)
    - [SPA 与 SSR 应用的范围](#spa-与-ssr-应用的范围)
    - [接口测试工具](#接口测试工具)
  - [Q & A](#q--a)
    - [第一题：下面关于 Node.js 的描述正确的哪一项，请给出你的分析（不考虑使用 worker_threads 的情况）](#第一题下面关于-nodejs-的描述正确的哪一项请给出你的分析不考虑使用-worker_threads-的情况)
    - [下面关于 Node.js 的描述，正确的是那一项，请给出你的分析（只考虑 Node.js V12 版本）](#下面关于-nodejs-的描述正确的是那一项请给出你的分析只考虑-nodejs-v12-版本)

---

## Node.js 的应用场景（why）

- 前端工程化
- Web 服务端应用
- Electron 跨端桌面应用

### 前端工程化

- Bundle
  - webpack
  - vite
  - esbuild
  - parcel
- Uglify
  - uglifyjs
- Transpile
  - babeljs
  - typescript
- 其他语言加入竞争
  - esbuild - GO
  - parcel - Rust
  - prisma
- 现状：Node.js 难以替代

### Web 服务端应用

node.js 优势：

- 学习曲线平缓，开发效率高
- 运行效率接近常见的编译语言（node.js 不需要编译）
- 社区生态丰富及工具链成熟（npm、V8 inspector）
  - V8 inspector：Debugging over the V8 Inspector Protocol
- **与前端结合的场景**会有优势（SSR）
  - SSR：Server-Side Rendering（服务端渲染）
- 现状
  - 竞争激烈，Node.js 有自己独特的优势

### Electron 跨端桌面应用

- 商业应用
  - VSCode
  - slack
  - discord
  - zoom
- 大型公司内的效率工具
- 现状
  - 大部分场景在选型时，都值得考虑

### Node.js 在字节

- BFF 应用、SSR 应用
  - Modern.js
    - BFF 应用的思想：谁需要接口，谁就去开发，（合并接口、裁剪数据），减少前后端开发者联系
- 服务端应用（最上层）
  - 头条搜索
  - 西瓜视频
  - 懂车帝
- Electron 应用
  - 飞连
  - 飞书
- 每年新增 1000+ Node.js 应用

---

## Node.js 运行时结构

![Node.js 运行时结构](images/NodeJs%20运行时结构.png)

### deps 作用

- acron
- node-inspect
  - 调试工具
- npm
  - node 包管理工具
- V8
  - JavaScript Runtime
- libuv
  - 封装了各种操作系统的 API
  - 提供了 Node.js 核心的 Event Loop
- nghttp2
  - http2 相关模块
- zlib
  - 常见的压缩与解压缩算法
- c-ares
  - DNS 查询库
- llhttp
  - http 协议解析
- OpenSSL
  - 常用在网络层面的加密/解密

### deps 作用 重点

- V8
  - JavaScript Runtime
  - 诊断调试工具（inspector）
- libuv
  - eventloop（事件循环）
  - syscall（系统调用）

### 举例：使用 node-fetch 发起请求时

1. node-fetch 模块属于**用户代码**部分
2. node-fetch 调用 Node.js Core (JavaSript) 模块
3. Node.js Core (JavaSript) 模块 调用 Node.js (C++) 的 API
4. Node.js (C++) 的 API 调用 llhttp
   - llhttp 做 http 协议的序列化与反序列化
5. llhttp 得到数据后，通过 libuv 创建 TCP 连接，将数据发送给远端

### 特点

- 异步 I/O
- 单线程
  - Node.js V12，可以使用 worker_thread 起 JavaScript 独立线程，但每个线程的模型没有太大变化
- 跨平台

#### 异步 I/O

```javascript
setTimeout(() => {
    console.log('B')
});

console.log('A');

/*
result:
A
B
*/
```

当 Node.js 执行 I/O 操作时，会在**响应返回**后恢复操作，而不是阻塞线程并占用额外内存等待。

![异步 I/O，redafile() 过程图示](images/异步%20IO%20-%20readFile%20过程图示.png)

#### 单线程

斐波那契数列计算

```javascript
function fibonacci(num) {
    if (num === 1 || num === 2) {
        return 1；
    }
    return fibonacci(num - 1) + fionacci(num - 2)
}

fibonacci(42);
fibonacci(43);
```

单线程（JavaScript 主线程为单线程）：

- 实际
  - JS 线程
  - uv 线程池（默认为4个线程）
  - V8 任务线程池
  - V8 Inspector 线程
- 优点
  - 不用考虑多线程状态问题，也就不需要锁（需要考虑异步问题）
  - 可以比较高效地利用系统资源
- 缺点
  - 阻塞会产生更多负面影响
  - 解决办法
    - 多进程或多线程

#### 跨平台

根据操作系统的不同，进行不同的处理

```javascript
const net = require('net');

const socket = new net.Socket('/tmp/socket.sock');
```

跨平台（大部分功能、API）

Node.js 跨平台 + JS 无需编译环境（ + Web 跨平台 + 诊断工具跨平台） === 开发成本低（大部分场景无需担心跨平台问题），整体学习成本低

---

## 编写 Http Server

### 安装 Node.js

- 多版本管理
  - Mac、Linux 推荐使用 nvm。多版本管理
  - Winndows 推荐 nvm4w 或是官方安装包
- 设置安装源
  - 安装慢、安装失败的情况，设置安装源

### 与高性能、可靠的服务相比，还差什么？

- CDN
  - 缓存
  - 加速
- 分布式存储
  - 容灾

### 外部服务

- cloudflare
- 七牛云
- 阿里云
- 火山云

### React SSR

#### SSR（Server Side Rendering）服务端渲染 特点

- 相比传统 HTML 模板引擎
  - 避免重复编写代码
    - 诸如，art-template 模板引擎，须事先写好 HTML 结构
- 相比 SPA（Signle Page Application）
  - 首屏渲染更快
  - SEO 友好
    - SPA 应用须事先运行 JS 才可以生成 HTML 文件
    - 而没有 HTML 文件对 SEO 不友好（当然可以写辅助信息，但这又是重复劳动）
- 缺点
  - 通常 qps 较低
  - 前端代码编写时需要考虑服务端渲染情况

#### SSR 难点

- 需要处理打包代码

```javascript
require('./static/style.css');
```

- 需要思考前端代码在服务端运行时的逻辑

```javascript
async componentDidMount() {
  // 将请求副作用放置在此，避免服务端渲染时进行请求
  const res = await fetch('http://my.server.domin')
}
```

- 移除对服务端无意义的副作用，或重置环境

### Debug

- V8 Inspector
  - 开箱即用
  - 特性丰富强大
  - 与前端开发一致
  - 跨平台
- 打开 debug 模式
  - node --inspect
  - 如何使用
    - open <http://localhost:9229/json>
- 应用场景
  - 查看 console.log 内容
  - breakpoint
  - 高 CPU、死循环：cpuprofile
  - 高内存占用：heapsnapshot
  - 性能分析

### 部署

- 部署要解决的问题
  - 守护进程
    - 当进程退出时，重新拉起
  - 多进程
    - cluster 便捷地利用多进程
  - 记录进程状态，用于诊断

- 容器环境
  - 通过健康检查的手段，只需考虑多核 CPU 利用率即可

---

## 延申话题

### Node.js 贡献代码

- 快速了解 Node.js 代码
  - Node.js Core 贡献入门
- 好处
  - 从使用者的角色逐步理解底层细节，可以解决更复杂的问题
  - 自我证明，有助于职业发展
  - 解决社区问题，促进社区发展
- 难点
  - 花时间

### 编译 Node.js

- 为什么学习编译 Node.js
  - 认知：黑盒到白盒，发生问题时能有迹可循
  - 贡献代码的第一步
- 如何编译
  - 参考：Maintaining the build files
  - ./configure && make install
  - 演示：给 net 模块添加自定义属性

### 诊断 / 追踪

- 诊断是一个低频、重要同时也相当有挑战的方向。是企业衡量自己能否依赖一门语言的重要参考
- 技术咨询行业中的热门角色
- 难点
  - 需要了解 Node.js 底层
  - 需要了解操作系统以及各种工具
  - 需要经验

### WASM, NAPI

- Node.js（因为 V8）是执行 WASM 代码的天然容器，和浏览器 WASM 是同一运行时，同时 Node.js 支持 WASI。
- NAPI 执行 C 接口的代码（C/C++/Rust...），同时能保留原生代码的性能。
- 不同编程语言间通信的一种方案。

---

## 课后答疑

### Node.js 作为后端与 JAVA、Go 性能差比

根据业务情况不同，指标不同，不太好比较

Node.js 大概是 Go 性能的 1/10 至 1/2

### 作为前端实习生怎么对待 Node.js

根据方向不同，要求不同。

如果是纯前端方向，了解即可。

### SPA 与 SSR 应用的范围

根据业务情况。

SPA 相对简单。

SSR 在团队强大时，会提高很多效率。

### 接口测试工具

考虑到 GUI,推荐 Postman

## Q & A

### 第一题：下面关于 Node.js 的描述正确的哪一项，请给出你的分析（不考虑使用 worker_threads 的情况）

A. Node.js 进程是单线程

B. Node.js 进程是多线程的，js 线程是单线程

C. Node.js 进程是多线程的，js 线程是多线程的

**正确项**: B。Node.js 进程中除了 js 线程外，会有 uv 线程池、inpector 线程等多个线程。

### 下面关于 Node.js 的描述，正确的是那一项，请给出你的分析（只考虑 Node.js V12 版本）

A. libuv 用户执行 js 代码

B. V8 封装了操作系统的函数调用

C. Node.js 主要使用 js 编写的

D. Node.js 中的 fs 模块中，使用的系统调用是同步的

**正确项**：D。V8 执行 js 代码；libuv 封装了操作系统中的函数调用；Node.js 内部有大量 C++ 代码。

---
