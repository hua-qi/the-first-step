# 写好 JS 的一些原则

## 文章目录

- [写好 JS 的一些原则](#写好-js-的一些原则)
  - [文章目录](#文章目录)
  - [各司其职](#各司其职)
    - [代码示例](#代码示例)
      - [代码实现方案一](#代码实现方案一)
      - [代码实现方案二](#代码实现方案二)
      - [代码实现方案三](#代码实现方案三)
    - [结论](#结论)
  - [组件封装](#组件封装)
    - [什么是组件](#什么是组件)
    - [代码示例](#代码示例-1)
    - [总结](#总结)

## 各司其职

表1-1 三者职责
|  |  |
|--|--|
| JavaScript | Behavioral |
| CSS | Presentational |
| HTML | Structural |

HTML、CSS、JavaScript 三者各司其职，描述的是其各自在页面中承担的责任（如表1-1所述），并不是描述代码文件层面的分离（HTML、CSS、JS 分处三个文件）。

### 代码示例

**点击按钮，切换页面的浏览模式（浅色或深色）。**

![页面的浏览模式切换示例](https://img-blog.csdnimg.cn/984a73c8f0eb4347bab3312247b9652b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaHVhcWktLQ==,size_11,color_FFFFFF,t_70,g_se,x_16)

#### 代码实现方案一

```html
<body>
    <button id="modeBtn">🌞</button>
    <h1>huaqi</h1>

    <script>
      const btn = document.getElementById("modeBtn");
      btn.addEventListener("click", e => {
        const body = document.body;
        if (e.target.innerHTML === "🌞") {
          body.style.backgroundColor = "black";
          body.style.color = "white";
          e.target.innerHTML = "🌜";
        } else {
          body.style.backgroundColor = "white";
          body.style.color = "black";
          e.target.innerHTML = "🌞";
        }
      });
    </script>
  </body>
  ```
  
**注**: 此方案中，JS 做了 CSS 应该做的事
  
#### 代码实现方案二

```html
<style>
      #modeBtn {
        font-size: 2rem;
        border: none;
        outline: none;
        cursor: pointer;
        background: inherit;
      }

      body.night {
        background-color: black;
        color: white;
        transition: all 1s;
      }

      #modeBtn::after {
        content: "🌞";
      }

      body.night #modeBtn::after {
        content: "🌜";
      }
    </style>
  </head>
  <body>
    <button id="modeBtn"></button>
    <h1>huaqi</h1>

    <script>
      const btn = document.getElementById("modeBtn");
      btn.addEventListener("click", e => {
        const body = document.body;
        if (body.className !== "night") {
          body.className = "night";
        } else {
          body.className = "";
        }
      });
    </script>
  </body>
  ```

  在代码的二、三版本中，该版本适应性更强。
  
**注**：纯展现类交互，可以仅通过 CSS 完成

#### 代码实现方案三

```html
<style>
      body,
      html {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }

      body {
        box-sizing: border-box;
      }

      .content {
        height: 100%;
        padding: 10px;
        transition: background-color 1s;
      }

      #modeCheckBox {
        display: none;
      }

      #modeCheckBox:checked + .content {
        background-color: black;
        color: white;
      }

      #modeBtn {
        font-size: 2rem;
        border: none;
        outline: none;
        cursor: pointer;
        background: inherit;
      }

      #modeBtn::after {
        content: "🌞";
      }

      body.night #modeBtn::after {
        content: "🌜";
      }
    </style>
  </head>
  <body>
    <input id="modeCheckBox" type="checkbox" />
    <div class="content">
      <!-- 操作 label 本质上为操作 input -->
      <label id="modeBtn" for="modeCheckBox"></label>
      <h1>huaqi</h1>
    </div>
  </body>

```

 在代码的二、三版本中，该版本适应性较低。
尽量减少 JS 代码的书写，降低 bug 出现的概率。

**注**：纯展现类交互，可仅使用 CSS + HTML 完成

### 结论

- HTML、CSS、JS 各司其职
- 避免不必要的由 JS 直接操作样式
- 可以用 class 来表示状态
- 纯展示类交互寻求零 JS 方案

## 组件封装

### 什么是组件

组件是由 Web 页面抽离出来的一个个单元，该单元包含模板（HTML）、功能（JS）和样式（CSS）。
好的组件应具备封装性、正确性、扩展性、复用性。

### 代码示例

使用原生 JS 怎么实现组件化轮播图？

- [版本一    JS Bin](https://jsbin.com/tonimin/5/edit?output) 不具备复用性、数据抽象
  - 结构设计
  - 展现效果
  - 行为设计
    - API（功能）
    - Event（控制流）
- [插件化    JS Bin](https://jsbin.com/lazuden/1/edit?output)  不具备数据抽象
  - 将控制元素抽取为插件
  - 插件与组件之间通过**依赖注入**方式建立联系
- [模板化  JS Bin](https://jsbin.com/gajegoz/3/edit?output)
  - 将 HTML 模板化，更易于扩展
- [抽象化  JS Bin](https://jsbin.com/hofiba/edit?output)
  - 将通用的组件模型抽象出来

待优化：CSS 模板化、插件组件化；

### 总结

- 组件设计的原则：封装性、正确性、扩展性、复用性
- 实现组件的步骤：结构设计、展现效果、行为设计
- 三次重构
  - 插件化
  - 模板化
  - 抽象化（组件框架）

[文章相关源码 github/hua-qi](https://github.com/hua-qi/the-first-step/tree/main/%E5%AD%97%E8%8A%82%E9%9D%92%E8%AE%AD%E8%90%A5%E5%AD%A6%E4%B9%A0/03-%E5%A6%82%E4%BD%95%E5%86%99%E5%A5%BDJS)
