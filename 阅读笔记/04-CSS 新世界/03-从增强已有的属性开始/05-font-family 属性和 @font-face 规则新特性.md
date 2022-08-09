# font-family 属性和 @font-face 规则新特性

## 目录

- [font-family 属性和 @font-face 规则新特性](#font-family-属性和-font-face-规则新特性)
  - [目录](#目录)
  - [system-ui 等全新的通用字体族](#system-ui-等全新的通用字体族)
    - [system-ui 通用字体族](#system-ui-通用字体族)
    - [emoji 通用字体族](#emoji-通用字体族)
    - [math 通用字体族](#math-通用字体族)
    - [fangsong 通用字体族](#fangsong-通用字体族)
    - [其他系统关键字](#其他系统关键字)
  - [local() 函数与系统字体的调用](#local-函数与系统字体的调用)
    - [简化字体调用](#简化字体调用)
    - [在自定义字体场景下提高性能](#在自定义字体场景下提高性能)
  - [unicode-range 属性的详细介绍](#unicode-range-属性的详细介绍)
    - [属性值 U+4?? 解析](#属性值-u4-解析)
    - [unicode-range 属性常用的 Unicode 编码值](#unicode-range-属性常用的-unicode-编码值)
    - [获取具体字符的 Unicode 编码值](#获取具体字符的-unicode-编码值)
    - [unicode-range 小结](#unicode-range-小结)
  - [woff/woff2 字体](#woffwoff2-字体)
    - [woff 字体的 MIME type 值](#woff-字体的-mime-type-值)
  - [font-display 属性与自定义字体的加载渲染](#font-display-属性与自定义字体的加载渲染)
    - [font-display 属性与时间线](#font-display-属性与时间线)
    - [字体显示时间线](#字体显示时间线)
    - [font-display 语法](#font-display-语法)
  - [其他知识点](#其他知识点)

## system-ui 等全新的通用字体族

**字体族表示一个系列字体**，而非单指具体某一个字体。

字体族又分为普通字体族和通用字体族。

传统通用字体族：

- serif - 衬线字体
  - 笔画粗细不均，字体开始和结束带有装饰的字体
- sans-serif - 无衬线字体
  - 笔画粗细均匀，没有额外装饰的字体
- monospace - 等宽字体
  - 所有字形具有相同的固定宽度的字体
- cursive - 手写字体
  - 中文中的楷体属于手写字体
- fantasy - 奇幻字体
  - 主要用于装饰和表现效果，字体和原本字符可以没有关系
  - 自定义的小图标字体就属于奇幻字体

全新的通用字体族

- system-ui - 系统 UI 字体
- emoji - 适用于 emoji 字符的字体家族
- math - 适用于数学表达式的字体家族
- fangsong - 中文字体中的仿宋字体家族

system-ui 和 emoji 两种通用字体尤其实用。

### system-ui 通用字体族

system-ui 字体族的出现**很好地解决了使用系统字体的需求**。

为什么要使用系统字体？

**因为所有网站都会设置通用字体**。

过去流行在网站中指定具体的字体：

```css
body {
    font-family: Helvetica, Segoe UI, Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
}
```

指定具体字体的不足：

- 字体可能会相互冲突。
- 系统升级后可能有了更适合网页的字体，但是由于网页指定了字体，因此并不能使用更适合网页的字体。

综上所述，全局的字体设置应该随着系统字体变动，但是由于兼容性问题的存在，实际开发过程中还**需要使用其他字体族进行兜底**。

参考 GitHub 站点的字体设置：

```css
body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
}
```

上述字体设置的组成分析：

- apple-system
  - 只在 macOS 中有效
- BlinkMacSystemFont
  - 亦只在 macOS 中生效，考虑到目前 system-ui 字体族的兼容性，该字体可以删除
- Segoe UI、Helvetica、Arial
  - 为不支持系统字体的浏览器进行兜底
  - Segoe UI 是 Windows 操作系统从 Vista 版本开始默认的西文字体族，可以在 Windows 操作系统上以最佳的西文字体进行显示
  - Helvetica 是 macOS 和 iOS 中很常用的一款无衬线字体
  - Arial 是全平台都支持的一款无衬线字体，可以作为最后的兜底
  - Roboto（遗漏）为 Android 操作系统设计的一款无衬线字体，可以在 Android 操作系统上以最佳的西文字体显示
- Apple Color Emoji、Segoe UI Emoji 是 emoji 字体

综上，最佳系统字体设置代码（暂不考虑 emoji 字体）：

```css
body {
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
}
```

### emoji 通用字体族

目前主流的操作系统都已内置 emoji 字体，但是有些 emoji 字体并不会显示为彩色图形，需要专门指定 emoji 字体，代码如下：

```css
.emoji {
    font-family: Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}
```

- Apple Color Emoji - 用于 Apple 产品中
- Segoe UI Emoji - 用于 Windows 操作系统中
- Segoe UI Symbol - 用于 Windows7 操作系统
  - 一种 Unicode 编码字体，显示为单色图案
- Noto Color Emoji - 用于 Android 和 Linux 操作系统

以上四种 emoji 字体涵盖了所有主流的操作系统，不过每次使用 emoji 字体都要指定 4 个元素有些麻烦，加之 Noto Color Emoji 直接作为 font-family 属性值没有效果，因此可以专门定义一个新的 emoji 字体来优化代码：

```html
<style>
@font-face {
    font-face: Emoji;
    src: local("Apple Color Emoji"),
        local("Segoe UI Emoji"),
        local("Segoe UI Symbol"),
        local("Noto Color Emoji");
}

.emoji {
    font-family: Emoji;
}
</style>

 <p>笑脸☺: \263a、铅笔✏: \270f、警示⚠: \26a0</p>
 <p class="emoji">笑脸☺: \263a、铅笔✏: \270f、警示⚠: \26a0</p>
```

在 Windows 10 操作系统下的 Chrome 浏览器中渲染效果如下图所示：

![Windows 10 操作系统下的 Chrome 浏览器中渲染效果](images/23-Windows%2010%20操作系统下的%20Chrome%20浏览器中渲染效果.png)

在 Android 操作系统下的 Chrome 浏览器中渲染效果如下图所示：

![Android 操作系统下的 Chrome 浏览器中渲染效果](images/24-Android%20操作系统下的%20Chrome%20浏览器中渲染效果.png)

观察上述渲染结果，emoji 字体**对普通字体文本的渲染也产生了影响**。

因此，在实际开发中，emoji 字体应该声明在系统字体之后：

```css
@font-face {
    font-face: Emoji;
    src: local("Apple Color Emoji"),
        local("Segoe UI Emoji"),
        local("Segoe UI Symbol"),
        local("Noto Color Emoji");
}

body {
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Emoji;
}
```

上述代码中，由于声明在 Emoji 字体族之间的字体的 Unicode 范围涵盖了 emoji 字符 Unicode 范围，从而造成 emoji 图形还原成字符。

Helvetica 和 Arial 字体可以让 \263a 笑脸以字符图案呈现而不是 emoji 图形。

因此对上述代码进行最终的优化，将 Emoji 字体族放在 Helvetica 和 Arial 字体之前，同时通过 unicode-range 属性调整 emoji 字体生效的 Unicode 范围：

```css
@font-face {
    font-family: Emoji;
    src: local("Apple Color Emoji"),
        local("Segoe UI Emoji"),
        local("Segoe UI Symbol"),
        local("Noto Color Emoji");
    unicode-range: U+1F000-1F644, U+203C-3299;
}

.emoji {
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Emoji, Helvetica, Arial, sans-serif;
}
```

### math 通用字体族

math 通用字体族的作用是**方便在 Web 中展现数学公式**。

数学公式包含非常多的层次关系，需要特殊的字体进行支持。

一种名为 MathML 的 XML 语言专门用于呈现富有层级关系的数学公式。

数学标签（如 \<math>）背后使用的 font-family 就是 math 通用字体族。

在实际操作中，由于 Chrome 浏览器并不支持 MathML，为了进行兼容，需要对数学标签进行 CSS 重定义，此时需要用到 math 通用字体族：

```css
math {
    font-family: Cambria Math, Latin Modern Math;
}
```

Cambria Math 是 Windows 操作系统中的数学字体；

Latin Modern Math 是 macOS 中的数学字体。

### fangsong 通用字体族

一般非常正式的公告会用到 fangsong 字体族，平常开发项目中很少用到：

```css
article {
    font-family: fangsong;
}
```

### 其他系统关键字

- ui-serif
  - 表示使用和系统一样的衬线字体
- ui-sans-serif
  - 表示使用和系统一样的无衬线字体
- ui-monospace
  - 表示使用和系统一样的等宽字体
- ui-rounded
  - 表示使用和系统一样的圆形字体

---

## local() 函数与系统字体的调用

从 IE9 浏览器开始，@font-face 规则开始支持使用 local() 函数**调用系统安装的字体**。

使用 local() 函数的两大好处

### 简化字体调用

例如，若要在项目中使用等宽字体，但不同操作系统中的等宽字体不一样。为了提高兼容性，需要一长串不同的字体名称作为 font-family 属性值，使用 local 函数，可以避免这种情况。

```css
@font-face {
    font-family: Mono;
    /* 单个单词可以不用加引号 */
    src: local("Menlo"),
        local("Monaco"),
        local("Consolas"),
        local("Liberation Mono"),
        local("Courier New"),
        local("monospace");
}

.code {
    font-family: Mono;
}
```

### 在自定义字体场景下提高性能

若希望在各个平台都能使用 Roboto 字体，可以重新定义 Roboto 字体：

```css
@font-face {
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    src: local("Roboto"),
        local("Roboto-Regular"),
        url(./Roboto.woff2) format("woff2");
}
```

此时 local() 函数可以让已经安装了 Roboto 字体的用户无须发起额外的 Roboto 字体请求。

---

## unicode-range 属性的详细介绍

在使用 @font-face 规则自定义字体时，可以通过 unicode-range 属性决定自定义的字体作用在哪些字符上。

unicode-range 属性值的写法为 “U+” 加上目标字符的 Unicode 编码或者 Unicode 范围。初始值为 U+0-10FFFF，即所有字符集。

unicode-range 语法：

```css
/* 支持的值 */
unicode-range: U+26;  /* 单个字符编码 */
unicode-range: U+0-7F;
unicode-range: U+0025-00FF; /* 字符编码区间 */
unicode-range: U+4?; /* 通配符区间 */
unicode-range: U+0025-00FF, U+4??; /* 多个值 */
```

### 属性值 U+4?? 解析

? 可以理解为占位符，表示 0-F 的值。

因此，U+4?? 表示从 U+400 到 U+4FF。

在前端领域，使用 Unicode 编码显示字符在各种语言中都是可以的，不过前缀各有不同。

1. HTML
   - 字符输出可以使用 &#x 加上 Unicode 编码
2. JavaScript
   - 为避免中文乱码需要转义，应使用 \u 加上 Unicode 编码
3. CSS
   - 如 CSS 伪元素的 content 属性，可以直接使用 \ 加上独赢字符的 Unicode 编码值
4. unicode-range 属性则是使用 U+ 加上 Unicode 编码

### unicode-range 属性常用的 Unicode 编码值

对于中文用户，最常用的 Unicode 编码值：

- 基本二次汉字
  - [0x4e00, 0x9fa5](或十进制 [19968, 40869])
- 数字
  - [0x30, 0x39](或十进制 [48, 57])
- 小写字母
  - [0x61, 0x7a](或十进制 [97, 122])
- 大写字母
  - [0x41, 0x5a](或十进制 [65, 90])

### 获取具体字符的 Unicode 编码值

若要获取一个具体字符的 Unicode 编码值，比如笑脸字符☺。可以使用下述的 JavaScript 代码：

```javascript
// U 的值是 '263a'
U = "☺".codePointAt().toString(16);
```

### unicode-range 小结

若遇到中文排版问题，或需要对某些字符进行精修，一定要尝试 unicode-range 属性

---

## woff/woff2 字体

为方便在网页中高效使用自定义字体，woff 和 woff2 应运而生，两者专门用在 Web 中。发展到现在，机会已经称为字体图标使用的标准配置，目前浏览器对它的兼容性已经相当不错。

相较于 woff，woff2 字体最大的优点在于传输的体积小。

若项目无须兼容 IE8 浏览器，可以直接使用 woff2 和 woff 字体

```css
@font-size {
    font-family: MyFont;
    src: url(myfont.woff2) format("woff2"),
        url(myfont.woff) format("woff");
}
```

若字体文件不是很大，可以直接以 Base64 的形式将 woff 或 woff2 字体内嵌在 CSS 中，加载体验比外链字体时要好一些：

```css
@font-size {
    font-family: MyFont;
    src: url("data:font/woff2;base64,...") format("woff2"),
        url("data:font/woff;base64,...") format("woff");
}
```

woff 和 woff2 字体可以包含其他字体特征信息。

woff2 字体没有必要再开启 GZIP，因为这个字体文本本身已经过一次压缩。

### woff 字体的 MIME type 值

以 woff2 字体为例，Google 使用 font/woff2，而 W3C 则推荐使用 application/font-woff2

作者建议，在 Web 中使用时采用 font/woff2，在服务端进行 MIME type 配置时采用 application/font-woff2

---

## font-display 属性与自定义字体的加载渲染

假设定义一个名为 MyFont 的自定义字体，并采用 url() 函数外链的方式进行引入，代码如下：

```css
@font-face {
    font-family: MyFont;
    src: url(myfont.woff2) format("woff2");
}

body {
    font-family: MyFont;
}
```

这时浏览器的字体加载行为表现为，应用 MyFont 字体的文本会先被隐藏，直到字体加载结束才会显示，字体隐藏最多持续 3s，3s 后字体仍未加载结束则会使用其他字体代替。

若使用自定义字体的目的是实现图标字体功能，则这种加载行为比较合适。因为渲染出来的小图标和小图标原本 Unicode 代表的真正字符往往外形差异巨大。用户看不懂的字符需要被隐藏起来，以此提升视觉体验。

若使用自定义文本呈现普通文本内容，则这种加载行为并不合适。因为文字内容应该第一时间呈现给用户，而不应该出现长时间的空白，内容绝对比样式更重要。

### font-display 属性与时间线

由于英文字体体积小，最多几百 KB，因此使用自定义字体非常普遍。自定义字体加载时的空白问题由 font-display 属性解决。

font-display 属性可以**控制字体加载和文本渲染之间的时间线关系**。

### 字体显示时间线

字体显示时间线开始于浏览器尝试下载字体的那一刻，整个时间线可分为 3 个时段，浏览器会在这 3 个时段让元素表现出不同的字体渲染行为。

- 字体阻塞时段
  - 若未加载字体，任何试图使用它的元素都必须以**不可见**的方式渲染后备字体
  - 若在期间字体成功加载，则正常使用
- 字体交换时段
  - 若未加载字体，任何试图使用它的元素都必须以**可见**的方式渲染后备字体
  - 若在期间字体成功加载，则正常使用
- 字体失败时段
  - 若未加载字体，则浏览器将其视为加载失败，并使用正常字体进行回退渲染

### font-display 语法

> font-display: [ auto | block | swap | fallback | optional ]

- auto
  - 字体显示策略由浏览器决定
  - 大多数浏览器的字体显示策略类似 block
- block
  - 字体阻塞时段较短（推荐 3s）
  - 字体交换时段无限
  - 适合场景
    - 图标字体
- swap
  - 字体阻塞时段极短（不超过 100ms）
  - 字体交换时段无限
  - 适合场景
    - 小段文本，同时文本内容对页面非常重要
- fallback
  - 字体阻塞时段极短（不超过 100ms）
  - 字体阻塞时段较短（推荐 3s）
  - 适合场景
    - 用于大段文本，如文章正文
    - 大段文本同时对字体效果比较看重
      - 广告页面
      - 个人网站
- optional
  - 字体阻塞时段极短（不超过 100ms）
  - 没有字体交换阶段
  - 日常 Web 开发更推荐的属性值

---

## 其他知识点

FOIT（Flash of Invisible Text）、FOUT（Flash of Unstyled Text）和 FOFT（Flash of Faux Text）等概念 与 font-display 属性没有任何关系。

如果自定义字体的大小在 30 KB 以内，建议直接用 Base64 将其内联在页面中。不过只有 woff2 字体采取内联处理，woff 字体依旧采用 url() 函数外链体验最佳，因为此时现代浏览器中的字体都是瞬间渲染，根本无须使用 font-display 属性进行字体加载优化。

```css
@font-face {
    font-family: MyFont;
    src: url("data:font/woff2;base64,...") format("woff2"),
    url(myfont.woff) format("woff");
}
```

可以使用 \<link rel="preload"> 对字体进行预加载，从而提高字体的加载体验：

```html
<link rel="preload" href="myfont.woff2" as="font" type="font/woff2" crossorigin>
```

@font-face 定义的字体只有在使用时才会被加载。

font-display 属性只能用在 @font-face 规则中，在中文场景差使用的机会并不多，因为中文字体文件都很大，不会使用包含完整字符内容的字体，都是使用借助工具按需生成的。

font-display属于体验增强的CSS属性，无须考虑其兼容性，大胆使用即可。支持 fontdisplay 属性的浏览器体验更好，不支持的浏览器还是目前的体验，功能依旧。
