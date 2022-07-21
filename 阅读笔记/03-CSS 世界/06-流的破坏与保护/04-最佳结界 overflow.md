# 最佳结界 overflow

要想彻底清除浮动的影响，最适合的属性不是 clear 而是 overflow。而且，overflow: hidden 声明不会影响元素原来的流体特性或者宽度表现。

## 目录

- [最佳结界 overflow](#最佳结界-overflow)
  - [目录](#目录)
  - [overflow 剪裁界线 border box](#overflow-剪裁界线-border-box)
    - [padding-bottom 的兼容问题](#padding-bottom-的兼容问题)
  - [了解 overflow-x 和 overflow-y](#了解-overflow-x-和-overflow-y)
    - [overflow-x 和 overflow-y 的问题](#overflow-x-和-overflow-y-的问题)
  - [overflow 与滚动条](#overflow-与滚动条)
    - [页面的滚动条设置](#页面的滚动条设置)
    - [滚动条占用容器的可用宽度或高度](#滚动条占用容器的可用宽度或高度)
    - [解决页面渲染时，由滚动栏产生的页面晃动](#解决页面渲染时由滚动栏产生的页面晃动)
    - [自定义滚动条样式](#自定义滚动条样式)
  - [依赖 overflow 的样式表现](#依赖-overflow-的样式表现)
  - [overflow 与锚点定位](#overflow-与锚点定位)
    - [锚点定位行为的触发条件](#锚点定位行为的触发条件)
    - [锚点定位的本质](#锚点定位的本质)
    - [锚点定位实现选项卡切换](#锚点定位实现选项卡切换)
      - [URL 地址锚链实现](#url-地址锚链实现)
      - [focus 锚点定位实现](#focus-锚点定位实现)
    - [利弊分析](#利弊分析)

## overflow 剪裁界线 border box

当容器元素的子元素超出容器宽度或高度限制时，**剪裁的边界是 border box 的内边缘**。

若想实现元素剪裁同时四周留有间隙的效果，可以使用透明边框，因为 padding 属性是被算在剪裁内的。

### padding-bottom 的兼容问题

Chrome 浏览器，如果容器元素声明垂直滚动，则 padding-bottom **会**被算在滚动尺寸之内。

Firefox 浏览器，如果容器元素声明垂直滚动，则 padding-bottom **不会**被算在滚动尺寸之内。

---

## 了解 overflow-x 和 overflow-y

overflow-x 和 overflow-y 分别表示单独控制水平或垂直方向上的剪裁规则。

支持的属性值和 overflow 属性一样

- visible - 默认值
- hidden - 剪裁
- scroll - 滚动条区域一直存在
- auto - 容器空间不足时滚动条出现

### overflow-x 和 overflow-y 的问题

如果 overflow-x 的属性值设置为 visible 而 overflow-y 属性值设置为除 visible 为的属性值，则 overflow-x 的样式表现如同 auto。反之亦然。

除非 overflow-x 和 overflow-y 的属性值都是 visible，否则 visible 会被当作 auto 处理。

永远不可能实现一个方向溢出剪裁或滚动，而另一个方向内容溢出显示的效果。

---

## overflow 与滚动条

HTML 中有两个元素**默认可以产生滚动条**，\<html>、\<textarea>。两个元素默认 overflow: auto。

### 页面的滚动条设置

故而若想要去除页面默认滚动条，需要进行如下设置：

```css
html {
  overflow: hidden;
}
```

上述操作只对 PC 端有效，对于移动端不一定适用。

在 PC 端，窗体滚动高度可以使用如下方法获取：

> document.documentElement.scrollTop

在移动端，可以使用如下方式获取窗体高度：

> document.body.scrollTop

### 滚动条占用容器的可用宽度或高度

在移动端不会存在该问题，因为移动端的屏幕尺寸本身有限，滚动条一般是悬浮模式。

在 PC 端，尤其 Window 操作系统下，几乎所有浏览器的滚动栏都会占据宽度，宽度均为 17px。

### 解决页面渲染时，由滚动栏产生的页面晃动

由于窗体默认没有滚动条，而 HTML 内容在自上而下的加载过程中，可能会产生一开始没有滚动条，后续突然出现滚动条的情况，此时页面的可用宽度发生变化，水平居中重新计算，导致页面发生晃动。

解决上述问题的简单方式是

```css
html {
  overflow: scroll; /* for IE8 */
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  overflow: hidden;
}
```

### 自定义滚动条样式

对于支持 -webkit- 前缀的浏览器，例如 Chrome 浏览器：

- 整体部分
  - ::-webkit-scrollbar;
- 两端按钮
  - ::-webkit-scrollbar-button;
- 外层轨道
  - ::-webkit-scrollbar-track;
- 内层轨道
  - ::-webkit-scrollbar-track-piece;
- 滚动滑块
  - ::-webkit-scrollbar-thumb;
- 边角
  - ::-webkit-scrollbar-corner;

经常使用的 3 个属性：

```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  /* 拖动条 */
  background-color: rgba(0, 0, 0, .3);
  border-radius: 6px;
}

::-webkit-scrollbar-track {
  /* 背景槽 */
  background-color: #ddd;
  border-radius: 6px;
}
```

---

## 依赖 overflow 的样式表现

单行文字溢出则显示 ... 效果的实现必需以下 3 个属性声明：

```css
.ell {
  /* 三者缺一不可 */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden; 
}
```

对于 -webkit- 私有前缀支持良好的浏览器可以实现多行文字溢出显示 ... 效果。

最多显示 2 行内容，溢出就显示 ... 效果的核心 CSS 代码如下：

```css
.ell-row-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
```

---

## overflow 与锚点定位

锚点，通俗解释为**可以让页面定位到某个位置的点**。常见在高度较高的页面中。

基于 URL 地址的锚链实现锚点跳转的方法有两种：

- \<a> 标签以及 name 属性
- 使用标签的 id 属性

```html
<!-- <a> 标签以及 name 属性实现锚链 -->
<a href="#1">发展历程</a>
<a name="1"></a>

<!-- 标签的 id 属性 -->
<a href="#1">发展历程</a>
<h2 id="1"></h2>
```

### 锚点定位行为的触发条件

以下两种情况可以触发锚点定位行为的发生：

1. URL 地址中的锚链与锚点元素对应，并有交互行为
2. 可 focus 的锚点元素处于 focus 状态

两者区别：

URL 地址锚链定位 使**元素定位在浏览器窗体的上边缘**。

focus 锚点定位 使**元素在浏览器窗体范围内显示即可，不一定是上边缘**。

情况 1 中，锚链值可以找到页面中对应的元素，且该元素非隐藏状态，否则不会有任何定位行为发生。

若锚链仅是 "#"，则定位行为发生时，页面定位到顶部，所以实现**返回顶部效果**的实现为：

```html
<a href="#">返回顶部</a>
```

然后配合 JS 实现一些动效，以及避免处于页面顶部时，URL 地址出现 #。

不推荐下述做法，其稳定性不足，过度依赖 JS：

```html
<a href="javascript:">返回顶部</a>
```

情况 2 中，**focus 锚点定位**指的是类似链接或者按钮、输入框等可以被 focus 的元素在被 focus 时发生的页面重定位现象。

在 PC 端中，使用 Tab 键快速定位可 focus 元素时，若该元素在屏幕外，浏览器会自动重定位使其出现在屏幕中。类似执行:
> document.querySeletor('input').focus();

focus 锚点定位不依赖于 JavaScript，是浏览器内置的无障碍访问行为，所有浏览器皆如此。

### 锚点定位的本质

锚点定位行为的发生，本质上**是通过改变容器滚动高度或宽度实现的**，即改变 scrollTop 或 scrollLeft 值，等同于执行下述 JS 代码

```javascript
document.querySelector.("box").srcollTop = 200;
```

以垂直滚动示意，注意是**容器的滚动高度**，而不是浏览器的滚动高度。

锚点定位也可以发生在普通的容器元素上，而且定位行为的发生是由内而外的。

由内而外，指**普通元素和窗体同时可滚动时，会由内而外触发所有可滚动窗体的锚点定位行为**。

**容器元素声明 overflow: hidden，滚动行为仍存在，仅仅滚动条不存在**。即，overflow: hidden 与 overflow: auto/srcoll 的差别就在于是否有滚动条。

### 锚点定位实现选项卡切换

#### URL 地址锚链实现

[URL 地址锚链实现](https://demo.cssworld.cn/6/4-2.php)

[URL 地址锚链实现 - 备份](demo/03-URL%20锚链锚点定位和%20overflow%20实现选项卡.html)

缺点:

1. 容器高度需要固定。
2. “由内而外”的锚点定位会触发窗体的重定位（即，使当前锚点元素会处于窗体顶部），若页面可以滚动，点击选项卡按钮后页面会发生跳动

#### focus 锚点定位实现

上述 URL 锚链定位由于其特性（使**元素定位在浏览器窗体的上边缘**），会有页面跳动的弊端。

而 focus 锚点定位显然不会有该弊端

[focus 锚点定位实现](https://demo.cssworld.cn/6/4-3.php)

[focus 锚点定位实现 - 备份](demo/04-focus%20锚点定位和%20overflow%20实现选项卡.html)

当然，上述技术若想要在实际项目中使用，仍离不开 JS 的支持，需要支持选项卡按钮的选中效果，处理列表部分区域在浏览器外依然会跳动的问题。

### 利弊分析

传统实现：父容器设置 overflow: hidden，然后子元素使用 \<div> 元素包裹，设置绝对定位，通过改变 top 值或使用 transform 进行偏移。

作者推荐使用基于父容器自身的 scrollTop 值改变来实现自定义滚动条效果。

好处如下：

1. 实现简单，无需边界判断
   - 若父容器设置 scrollTop: -999，则浏览器按照 0 进行计算
   - 若父容器设置很大的 scrollTop 属性值，则直接滚动到容器底部
   - 列表滚动值即是 scrollTop 值，实时获取，天然存储，无需变量存储。
2. 天然与原生 scroll 事件集成，无缝对接
   - 滚动延迟加载图片效果可以直接应用
3. 无须改变子元素的结构
   - 传统实现为使定位方便，会给所有的列表元素包裹一层独立的 \<div> 元素，可能会导致某些选择器失效（诸如 .container > .list {} ）

不足如下：

1. 无法添加类似 Bounce 回弹动效
2. 渲染较一般的渲染慢，大多数场景下用于无感知。
