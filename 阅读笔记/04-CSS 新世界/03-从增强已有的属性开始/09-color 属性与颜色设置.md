# color 属性与颜色设置

## 目录

- [color 属性与颜色设置](#color-属性与颜色设置)
  - [目录](#目录)
  - [148 个颜色关键字](#148-个颜色关键字)
  - [transparent 关键字](#transparent-关键字)
    - [对于 transparent 关键字 CSS 和 SVG、Canvas 不同的渐变表现](#对于-transparent-关键字-css-和-svgcanvas-不同的渐变表现)
  - [currentColor 关键字](#currentcolor-关键字)
  - [RGB 颜色和 HSL 颜色的新语法](#rgb-颜色和-hsl-颜色的新语法)
    - [HSL 颜色](#hsl-颜色)
    - [RGBA 颜色和 HSLA 颜色](#rgba-颜色和-hsla-颜色)
    - [#RRGGBBAA 颜色](#rrggbbaa-颜色)
    - [极致自由的新语法](#极致自由的新语法)
    - [RGB 颜色和 HSL 颜色新语法](#rgb-颜色和-hsl-颜色新语法)

## 148 个颜色关键字

目前 color 属性已经累计支持 148 个颜色关键字，[详情](https://demo.cssworld.cn/new/3/9-1.php)

相关知识：

- HTML 中 color 属性算法和 CSS 中的 color 属性算法不一样。
  - 对于一个无法识别的颜色关键字
    - HTML 会渲染为另一个颜色
    - CSS 会直接忽略这个颜色关键字
- 颜色关键字设置的颜色都是实色，不带透明度
  - 目前没有 CSS 语法可以直接让颜色关键字渲染带有透明度
  - 唯一可行方式是借助 animation-delay 负值实现
- 颜色关键字不区分大小写
- 一些颜色关键字互相等同
  - aqua/cyan
  - fuchsia/magenta
  - darkgray/darkgrey
  - darkslategray/darkslategrey
  - dimgray/dimgrey
  - lightgray/lightgrey
  - lightslategray/lightslategrey
  - gray/grey
  - slategray/slategrey
- 所有颜色关键字在中，只有两个颜色关键字以“deep”开头
  - 深天蓝色 - deepskyblue
  - 深粉色 - deeppink
- 暗灰色 darkgray 的颜色要比灰色 gray 更浅
  - 并不是有“dark”前缀的颜色关键字控制的颜色就更深

---

## transparent 关键字

在 CSS 规范文档中 transparent 关键字其实是 rgba(0, 0, 0, 0) 的另外一种快捷书写方式，所有浏览器都遵循该规范。

background-color 初始值就是 transparent。

```javascript
console.log(window.getComputedStyle(document.body).bockgroundColor);
// rgba(0, 0, 0, 0)
```

### 对于 transparent 关键字 CSS 和 SVG、Canvas 不同的渐变表现

CSS 使用 transparent 实现颜色渐变效果代码以及图示：

```css
.gradient {
    width: 300px;
    height: 150px;
    background: linear-gradient(transparent, red);
}
```

![CSS transparent 到 red 的渐变效果示意](images/31-CSS%20transparent%20到%20red%20的渐变效果示意.png)

Web 视觉表现领域的三个语言 CSS、SVG 和 Canvas，仅 CSS 表现出如上图所示的渐变渲染效果。

对于 SVG、Canvas 它们对色值进行纯数学上的计算，上述从透明到红色的渐变效果会渲染为 透明 -> 灰红色 -> 红色。

SVG 渐变代码与其效果示意：

```html
<svg style="border: 1px dotted;">
    <defs>
        <linearGradient id="myGradient">
            <stop offset="0%" stop-color="transparent" />
            <stop offset="100%" stop-color="red" />
        </linearGradient>
    </defs>
    <circle cx="150" cy="75" r="70" fill="url(#myGradient)"></circle>
</svg>
```

![SVG transparent 到 red 的渐变效果示意](images/32-SVG%20transparent%20到%20red%20的渐变效果示意.png)

CSS 和 SVG、Canvas 渐变渲染的不一致性有时候会影响实际开发。

Web 中的截图功能是通过将 Web 内容转换成 SVG 图像或 Canvas 图像实现的。若截图内容有 CSS 实现的透明渐变，则最终的截图会有一团莫名其妙的灰黑色，原因就是 SVG 和 Canvas 中的透明渐变算法与 CSS 的渐变算法不一致。

---

## currentColor 关键字

currentColor 关键字非常实用，且无可替代，表示当前元素（包括伪元素）所使用的 color 属性的计算值。

在 SVG Sprites 图标使用场景中，表示图标的填充颜色使用的是当前 color 属性的计算值，即可以使用 color 属性直接设置图标的颜色。

**注**：CSS 中很多属性的默认颜色就是 color 属性值，没有必要专门声明 currentColor 关键字，包括 border-color、outline-color、caret-color、text-shadow、box-shadow 等 CSS 属性。

currentColor 关键字主要用在**背景颜色和背景渐变颜色中**。例如实现一个背景颜色由 color 属性控制的按钮效果，可以设置 background-color 属性值为 currentColor。

```css
.button {
    background-color: currentColor;
}

.button:first-line {
    color: white;
}

/* 或者 */
.button {
    -webkit-text-fill-color: white;
    background-color: currentColor;
}
```

---

## RGB 颜色和 HSL 颜色的新语法

### HSL 颜色

HSL 颜色是由色调（Hue）、饱和度（Saturation）、亮度（Lightness）三个元素组成。

色调值的大小是任意的，因为 CSS 世界中与色调相关的数值都是角度值，单位是 deg，无论设置什么值，最终都会在 0~360deg 范围中解析。

- red - 0deg
- green - 120deg
- blue - 240deg

饱和度和亮度的值是任意的，最终解析的数值范围均在 0%~100%，百分号符号不能忽略，否则整个语句无效。

若项目不需要兼容 IE8 浏览器，可以尝试使用 HSL 颜色，适用于颜色变化的场合。

场景：按钮的默认态与活动态的变化

```css
.button {
    background-color: hsl(213.3, 82.8%, 54.3%);
}

/* 只修改亮度值 */
.button:active {
    background-color: hsl(213.3, 82.8%, 54%)
}
```

与 RGB 颜色不同，控制 HSL 颜色的值可以是小数。

### RGBA 颜色和 HSLA 颜色

RGBA 和 HSLA 中的字母 A 指的是 Alpha 透明通道，透明度值取值范围任意，但是渲染范围是 0~1，即小于 0 的透明度值会被当作 0 渲染，大于 1 的透明度值会被当作 1 渲染。

### #RRGGBBAA 颜色

目前现代浏览器已全面支持 #RRGGBBAA 颜色，其中 R、G、B 还是原来的十六进制表示的 RGB 色值，范围 00~FF，AA 表示透明度，范围也是 00~FF。

\#RRGGBBAA 颜色的透明度转换没有 RGB 色值方便，需要进行转换，如下：

```javascript
// Alpha 范围 0~1
AA = (Alpha * 255).toString(16);
```

透明度 50% 等于 (0.5 * 255).toString(16)，结果是 7f.8，约等于 80。因此 #FF000080 表示透明度约为 50% 的红色。

透明度百分比和十六进制值之间对应关系的数据表

| 透明度 | 十六进制 | 透明度 | 十六进制 |
| :----- | :------- | :----- | :------- |
| 0%     | 00       | 55%    | 8c       |
| 5%     | 0D       | 60%    | 99       |
| 10%    | 1A       | 65%    | A6       |
| 15%    | 26       | 70%    | B3       |
| 20%    | 33       | 75%    | BF       |
| 25%    | 40       | 80%    | CC       |
| 30%    | 4D       | 85%    | D9       |
| 35%    | 59       | 90%    | E6       |
| 40%    | 66       | 95%    | F2       |
| 45%    | 73       | 100%   | FF       |
| 50%    | 80       |

### 极致自由的新语法

除却 IE 浏览器，下述语法均被其余浏览器支持。

- rgba() 和 rgb() 函数语法互通
- hsl() 和 hsla() 函数语法互通
- rgb() 函数中的数值可以是小数
- 透明度可以使用百分比值表示
- hsl() 函数的色调可以使用任意角度单位
- rgb() 和 hsl() 函数语法中的逗号可以忽略

### RGB 颜色和 HSL 颜色新语法

现代浏览器支持全新的空格加斜杠语法。例如：

```css
rgb(255 0 153 / 1)
rgb(255 0 153 / 100%)
rgb(51 170 51 / 0.4)
rgb(51 170 51 / 40%)
hsl(270 60% 50% / .15)
hsl(270 60% 50% / 15%)
```
