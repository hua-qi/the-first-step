# @font-face 规则

## 目录

- [@font-face 规则](#font-face-规则)
  - [目录](#目录)
  - [@font-face 的本质是变量](#font-face-的本质是变量)
    - [font-family](#font-family)
    - [src](#src)
      - [是否需要如此多字体格式](#是否需要如此多字体格式)
      - [#iefix 作用](#iefix-作用)
      - [为什么需要有两个 src 属性](#为什么需要有两个-src-属性)
      - [font-weight: normal 和 font-weight: normal 是否多余](#font-weight-normal-和-font-weight-normal-是否多余)
      - [format() 功能符作用，是否可以省略](#format-功能符作用是否可以省略)
      - [业界自定义字体格式优化](#业界自定义字体格式优化)
    - [font-style](#font-style)
    - [font-weight](#font-weight)
      - [响应式图标](#响应式图标)
    - [unicode-range](#unicode-range)
  - [@font-face 与字体图标技术](#font-face-与字体图标技术)
    - [字体图标技术带来的渲染现象](#字体图标技术带来的渲染现象)
    - [中介 SVG 图标要求](#中介-svg-图标要求)
    - [字体图标使用](#字体图标使用)

## @font-face 的本质是变量

**CSS3 出现真正意义上的变量 var**。

CSS 中已经出现本质上就是变量的东西，@font-face 规则就是其中之一。

@font-face 本质上就是**一个定义字体或字体集的变量**，可以自定义字体、字体重命名、默认字体样式设置。

@font-face 规则支持的 CSS 属性：

```css
@font-face {
    font-family: "example";
    src: url(example.ttf);
    font-style: normal;
    font-weight: normal;
    unicode-range: U+0025-00FF;
    font-variant: small-caps;
    font-stretch: expanded;
    font-feature-settings: "ligal" on;
}
```

常用的 @font-face 规则属性：

```css
@font-face {
    font-family: "example";
    src: url(example.ttf);
    font-style: normal;
    font-weight: normal;
    unicode-range: U+0025-00FF;
}
```

### font-family

@font-face 中的属性 **font-family 可以看作是一个字体变量**，名称随意。使用稀奇古怪的字符或者空格时，一定要加引号。

```css
@font-face {
    font-family: "$";
    src: url(exmple.ttf);
}
```

**对于操作系统原本就有的字体名称不能随意设置变量名**。

```css
/* 将微软雅黑字体与 example.ttf 进行对应*/ 
@font-face {
    font-family: "Microsoft Yahei";
    src: url(example.ttf);
}
```

### src

src 表示**引入的字体资源**，字体资源包括**系统字体**和**外链字体**。

使用 local() 功能符引入系统安装字体。

使用 url() 功能符引入外链字体。

业界自定义字体格式：

```css
@font-face {
    font-family: ICON;
    src: url("icon.eot") format("eot");
    src: url("icon.eot?#iefix") format("embedded-opentype"),
        url("icon.woff2") format("woff2"),
        url("icon.woff") format("woff"),
        url("icon.ttf") format("typetrue"),
        url("icon.svg#icon") format("svg");
    font-weight: normal;
    font-style: normal;
}
```

上述格式代码问题：

- 为什么需要有两个 src 属性？
- #iefix 的作用？
- format() 功能符作用，是否可以省略？
- 是否需要如此多字体格式？（.eot/.woff2/.woff/.ttf/.svg）
- font-weight: normal 和 font-weight: normal 是否多余？

#### 是否需要如此多字体格式

字体格式作用：

- svg
  - 兼容 iOS 4.1 及其之前的版本。
  - 考虑到现在的 iOS 版本，该字体格式可以舍弃
- eot
  - IE 私有
  - 所有版本的 IE 浏览器均支持 eot 格式
- woff
  - web open font format
  - 专门为 Web 开发而设计的字体格式，优先使用
  - 字体尺寸更小，加载更快
- woff2
  - 比 woff 尺寸更小
  - Web 开发第一首选字体
- ttf
  - 通常作为系统安装字体，Web 开发也可以使用
  - 尺寸稍大
  - 支持老版本 Android

综上，可以得出以下结论：

- svg 格式果断舍弃
- 若无须兼容 IE8 浏览器，eot 格式果断舍弃
- 若无须兼容 Android 4.3 之前版本收集，ttf 格式果断舍弃

上述提到 woff2 字体格式是 Web 开发第一首选字体，所以可以在代码层面提高其权重：

```css
@font-face {
    font-family: ICON;
    src: url("icon.eot") format("eot");
    src: local("😊"),
        url("icon.woff2") format("woff2"),
        url("icon.woff") format("woff"),
        url("icon.ttf") format("typetrue");
}
```

由于 IE6~IE8 不认识 local() 功能符，因此第二个 src 会被其忽略。而对于 IE9 浏览器，显然不可能在本地寻找到名为 😊 的字体格式，因此首选使用 woff2 字体格式。

#### #iefix 作用

\#iefix 可以使请求地址稍短，**请求地址不包括锚点标志 # 及其后面的内容**。所以字符串 iefix 完全多余。

对于 \#iefix 前的 ? 符号，在 IE9 之前的版本解析有一个严重的问题，当 src 属性包含多个 url() 时，会将所有字体当作一个地址解析导致请求 404。因此将 eot 格式放在第一位，然后再字体文件 url 地址后添加 ?，这样 IE9 版本之前的浏览器会将 ? 之后的内容当作 url 的参数。

#### 为什么需要有两个 src 属性

兼容模式的 IE7 和 IE8 不识别 ?，导致第二个 src 无法识别，因此添加第一行 src 以兼容 IE7、IE8。

#### font-weight: normal 和 font-weight: normal 是否多余

若没有同字体名的多字体设置，则是多余的。

#### format() 功能符作用，是否可以省略

最好不要省略。

format() 功能符的作用：**使浏览器提前知道字体的格式，以决定是否需要记载该字体**。

#### 业界自定义字体格式优化

```css
@font-face {
    font-family: ICON;
    src: url("icon.eot") format("eot");
    src: local("😊"),
        url("icon.woff2") format("woff2"),
        url("icon.woff") format("woff"),
        url("icon.ttf");
}
```

### font-style

@font-face 规则中的 font-style 和 font-weight 功能类似，用于设置**对应字体样式或自重下应该使用什么字体**。

因为有些字体会有专门设计的斜体字体，并不是简单的字体倾斜。

当 CSS 代码中声明 font-style: italic 时，会调用该字体对应的斜体字体。

```css
@font-face {
    font-family: "I";
    font-style: normal;
    src: local("FZYaoti");
}

@font-face {
    font-family: "I";
    font-style: italic;
    src: local("FZShuti");
}
```

上述使用方正姚体和方正斜体代表同一字体的正体和斜体设计。

### font-weight

font-weight **定义不同字重、使用不同字体**。

代表性示例：版权字体“汉仪旗黑”字重非常丰富，但该字体不像“思源黑体”（天然可以可以根据 font-weight 属性值加载对应的字体文件），因此使用时，可以使用 @font-family 对字体格式进行重定义。

```css
@font-face {
    font-family: "QH";
    font-weight: 400;
    src: local("HYQihei 40S");
}

@font-face {
    font-family: "QH";
    font-weight: 500;
    src: local("HYQihei 50S");
}

@font-face {
    font-family: "QH";
    font-weight: 600;
    src: local("HYQihei 60S");
}
```

#### 响应式图标

由于 font-wight 支持 100-900 九个值，可以用以实现**响应式图标**。

所谓响应式图标：字号较大时图标字体细节更加丰富，字号较小时图标字体更简洁的响应式处理。

```css
@font-face {
    font-family: ICON;
    src: url(icon-large.eot);
    src: local("😊"),
        url(icon-large.woff);
    font-weight: 700;
}

@font-face {
    font-family: ICON;
    src: url(icon-medium.eot);
    src: local("😊"),
        url(icon-medium.woff);
    font-weight: 400;
}

@font-face {
    font-family: ICON;
    src: url(icon-small.eot);
    src: local("😊"),
        url(icon-small.woff);
    font-weight: 100;
}
```

```html
<style>
    .icon {
        font-family: ICON;
    }

    .icon-large {
        font-weight: 700;
        font-size: 128px;
    }

    .icon-medium {
        font-weight: 400;
        font-size: 64px;
    }

    .icon-small {
        font-weight: 100;
        font-size: 16px;
    }
</style>

<i class="icon icon-small">&#x1f3a4;</i>
<i class="icon icon-medium">&#x1f3a4;</i>
<i class="icon icon-large">&#x1f3a4;</i>
```

代码渲染结果：

![响应式图标效果](images/06-响应式图标效果.png)

### unicode-range

unicode-range 可以让特定的字符或者特定范围的字符使用指定的字体。

```css
@font-face {
    font-family: quote;
    src: local("SimSun");
    unicode-range: U+201c, U+201d;
}

.font {
    font-family: quote, "Microsoft Yahei";
}
```

---

## @font-face 与字体图标技术

从面向未来的角度讲，字体图标技术的使用会越来越边缘化，因为和 SVG 图标技术相比，**其唯一的优势就是兼容一些老的 IE 浏览器**。

**SVG 图标同样是矢量的，同样颜色可控，但资源占用更少，加载体验更好，呈现效果更佳，更加符合语义**。

iconfont 在线字体图标生成工具生成代码：

```css
@font-face {
    font-family: ICON;
    src: url(icon.eot);
    src: url(icon.eot?#iefix) format("embedded-opentype"),
        url(icon.eot.woff2) format("woff2"),
        url(icon.eot.woff) format("woff")
}

.icon {
    font-family: ICON;
}

.icon-microphone::before {
    content: "\1f3a4";
}
```

**字体和字符就是字体图标技术的本质所在**。

所谓字体，本质上是字符集和图形的一种映射关系。

字体图标将通常的字符映射称为另外的图标形状，比如将5BB6 和 图形“家” 的映射更改为 5BB6 和 图形🏠。

所以，字体图标本质仍然是字体。

### 字体图标技术带来的渲染现象

由于原始字符和最终的字体图标的图形表现相差很大，当字体文件加载缓慢时，可以明显看到字符边图标的过程。字体内联在 CSS 文件中可以有效避免这一问题，但往往字体文件体积都比较大，这样处理得不偿失。

原始字符 x-height 和最终的图标的 x-height 往往不一样，会影响内联元素的垂直对齐，因此很容易出现页面高度闪动的问题。

原始字符的 ch 宽度和最终的图标也往往不一样，因此很容易出现内联元素水平方向晃动的问题。

由于字体图标本质也是字符，因此也能使用字符相关的属性，诸如 font-size、color、text-shadow。

### 中介 SVG 图标要求

当使用工具生成图标字体时，中间媒介都是 SVG 图标，但并不是所有 SVG 图标都满足要求。最好满足以下 3 点：

1. 纯路径，纯矢量，不适用 base64 内联图形
2. 适用填充而非描边，尽量避免一些高级的路径填充覆盖技巧
3. 宽高尺寸最好都大于 200，因为字体生成时，坐标值会四舍五入，SVG 尺寸过小会导致坐标取值偏差较大，使最终的图标不够精致。

### 字体图标使用

是否可以将映射字符直接书写在页面代码中，而不是放在 ::before 伪元素中？

不建议将映射字符直接书写在页面代码中，一是**不好维护**，二是**从语义角度考虑**，图标字符往往不包含任何意义，无须让搜索引擎和辅助设备读取，如果内联在 HTML 中，反而会形成干扰。伪元素恰好没有此种问题。
