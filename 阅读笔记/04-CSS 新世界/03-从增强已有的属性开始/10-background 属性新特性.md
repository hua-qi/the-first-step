# background 属性新特性

## 目录

- [background 属性新特性](#background-属性新特性)
  - [目录](#目录)
  - [最实用的 background-size 属性](#最实用的-background-size-属性)
    - [cover 和 contain](#cover-和-contain)
    - [理解 auto 关键字的尺寸渲染规则](#理解-auto-关键字的尺寸渲染规则)
    - [数值或百分比值](#数值或百分比值)
    - [background-size 作为缩写](#background-size-作为缩写)
  - [background 属性值最成功的设计 -- 多背景](#background-属性值最成功的设计----多背景)
  - [background-clip 属性与背景显式区域限制](#background-clip-属性与背景显式区域限制)
  - [background-clip: text 声明与渐变文字效果](#background-clip-text-声明与渐变文字效果)
  - [background-origin](#background-origin)
  - [space 和 round 平铺模式](#space-和-round-平铺模式)
    - [space](#space)
    - [round](#round)
  - [指定 background-position 的起始方位](#指定-background-position-的起始方位)
    - [单值语法](#单值语法)
    - [双值语法](#双值语法)
    - [三值或四值语法](#三值或四值语法)

## 最实用的 background-size 属性

因为现在的电子设备的屏幕密度普遍很高，为了避免因为图像的像素点不够而造成渲染模糊，开发会使用 2 倍图甚至 3 倍图作为背景图。

将一张大图限制在一个小区域中就需要用到 background-size 属性。

场景：删除按钮的尺寸是 20px \* 20px，按钮元素使用 2000px * 2000px SVG 图标作为背景。

有多种语法可以将尺寸巨大的 SVG 图标限制在按钮元素范围内。

```css
background-size: cover;
background-size: contain;
background-size: 100%;
background-size: 20px;
background-size: auto 100%;
background-size: auto 20px;
background-size: 100% 100%;
background-size: 20px 20px;
```

### cover 和 contain

conver 和 contain 两者都**不会改变背景图的原始比例**，非常适合背景图像高宽不确定的场景。

- cover - 覆盖
  - 背景图尽可能把当前元素完全覆盖，不留任何空白
- contain - 包含
  - 背景图尽可能包含在当前元素区域内，同时没有任何剪裁

具体渲染区别：

```css
.bg-cover,
.bg-contain {
  width: 128px;
  height: 128px;
  border: solid deepskyblue;
  background: url(./1.jpg) no-repeat center;
}

.bg-cover {
  background-size: cover;
}

.bg-contain {
  background-size: contain;
}
```

![cover 和 contain 对应效果示意](images/33-cover%20和%20contain%20对应效果示意.png)

若显示区域的比例和原始图像的比例不一致，cover 属性值最终的表现效果为一部分图像被剪裁掉，contain 属性值的表现效果为显示区域有一部分的区域会留白。

### 理解 auto 关键字的尺寸渲染规则

先了解常见图像的内在尺寸和内在比例

- 位图
  - JPG 或 PNG 图片都属于位图
  - 拥有内在尺寸（原始图像大小）
  - 拥有内在比例（原始图像比例）
- 矢量图
  - SVG 图像属于矢量图
  - 若水平尺寸和垂直尺寸都设置了，就具有内在的比例
  - 若没有设置尺寸，是否有比例由 SVG 内部代码决定
- 渐变图像
  - 使用 CSS 渐变语法绘制的图像
  - 没有内在尺寸和内在比例
- 元素图像
  - 使用 element() 函数将 DOM 元素作为背景图
  - 图片的内在尺寸就是 DOM 元素的尺寸

默认 background-size: auto auto。

在默认情况以及 background-size: auto 情况下：

- 若图像水平和垂直方向同时具有内在尺寸
  - 按照图像原始大小进行渲染
- 若图像没有内在尺寸和内在比例
  - 按照背景定位区域的大小进行渲染，等同于声明 background-size: 100%
- 若图像没有内在尺寸，但具有内在比例
  - 渲染效果等同于声明 background-size: contain
- 若图像只有一个方向有内在尺寸，但又具有内在比例
  - 图像会拉伸到该内在尺寸的大小，同时宽高比符合内在比例
  - 在 Edge 浏览器中，只有一个方向设置尺寸的 SVG 图像按照 background-size: contain 进行渲染
- 若图像只有一个方向有内在尺寸，但没有内在比例
  - 图像有内在尺寸的一侧会拉伸到该内在尺寸大小，没有设置内在尺寸的一侧会拉伸到背景定位区域尺寸大小

若 background-size 的属性值一个是 auto 另外一个值不是 auto，有如下两种情况：

- 若图像有内在比例
  - 图像会拉伸到指定的尺寸，宽高依然保持原始比例
- 若图像没有内在比例
  - 图像会拉伸到指定的尺寸
  - 若图像有内在尺寸
    - 则 auto 的计算值就是图像的内在尺寸
  - 若图像没有内在尺寸
    - 则 auto 的计算值就是背景定位区域的尺寸

### 数值或百分比值

background-size 属性值无论是数值还是百分比值，**都不能是负值**。

百分比值相对于元素的背景定位区域计算。

而背景定位区域由 background-origin 属性决定，默认为 background-origin: padding-box。

### background-size 作为缩写

background-size 可以作为缩写直接在 background 属性中设置，但必须声明在 background-position 属性值之后，并且使用斜杠进行分隔，其他写法无效。

```css
/* 有效声明 */
background: url(1.jpg) no-repeat center / 100%;
background: 0 / 100% url(1.jpg);
background: linear-gradient(red, blue) round 100%/100% scroll;
```

---

## background 属性值最成功的设计 -- 多背景

background 多背景指一个 background 属性可以同时定位多个独立的背景图像。

```css
.multiple-backgrounds {
  background: url(1.jpg) no-repeat top, url(2.jpg) no-repeat bottom
}
```

多背景原本的设计初衷是方便 PNG 背景图的定位，现在可以使用多背景拼接图形。

CSS 渐变本质上也是一种图像，可以作为 background-image 的属性值。

- CSS 渐变可以实现纯色效果，渐变起止颜色一致即可
- background-size 属性也支持多背景，且可以任意控制尺寸

借助上述特性，可以实现任意图形效果。

但由于性能无法满足、实现的效果本质上还是位图，并不是矢量图，无法缩放自如，所以日常开发中不会使用拼接像素点的方法绘制图形。

---

## background-clip 属性与背景显式区域限制

合法属性值：

```css
background-clip: border-box;
background-clip: padding-box;
background-clip: content-box;
background-clip: text;
```

background-clip 属性最实用的应用场景之一就是控制背景颜色的显示范围。

在实现具有深色背景的按钮时，可以借助透明边框和 backgound-clip 属性在保证点击区域足够的同时符合设计稿的要求。

---

## background-clip: text 声明与渐变文字效果

background-clip：text 可以让**背景图像按照字符形状进行剪裁**，此时只需隐藏文字，就可以看到字符形状的背景效果。

上述特性，常见于实现文字纹理效果和文字渐变效果。

若使用 background-clip: text 实现渐变文字效果，那么原本彩色的 emoji 字符的颜色会丢失。

---

## background-origin

合法属性值：

```css
background-origin: padding-box; /* 默认值 */
background-origin: content-box;
background-origin: border-box;
```

该属性设定了的背景图像定位的位置。

---

## space 和 round 平铺模式

backgound-repeat 属性新增属性值 space、round

### space

让背景图像尽可能地重复，而不进行剪裁，每个重复单元的尺寸不会变化。

其中第一张和最后一张图像固定在元素的两边，然后通过拉伸空白区域让剩余的图像均匀分布。

```css
.space {
    background: url(1.jpg) center / auto 100%;
    background-repeat: space;
    outline: 1px dotted;
}
```

**space 属性值主要用于平铺小尺寸图像**。

若背景图像的尺寸比背景定位区域的尺寸还要大：

原本无效的 background-position 属性此时生效，即北京显示区域只能显示一张图像的情况下，可以使用 background-position 属性来控制这张图像的定位。

须注意浏览器差异

### round

背景图像会被拉伸，保证不留间隙。

随着定位区域空间的增加，若剩余空间大于图像宽度的一半，则添加另外一张图像。在添加下一张图像时，当前的所有图像都会压缩以留出空间放下这个新添加的图像。

space 和 round 亦可以改变 background-repeat 属性的语法，可以分别指定水平和垂直方向上的图像平铺方式。

指定水平方向为 round 平铺，垂直方向为 space 平铺；

```css
background-repeat: round space;
```

---

## 指定 background-position 的起始方位

让背景图像在距离右下方 20px 的位置进行渲染：

```css
.example {
    width: 300px;
    height: 200px;
    border: solid deepskyblue;
    background: url(1.jpg) no-repeat right 20px bottom 20px;
}
```

### 单值语法

若 background-position 属性只有一个值，则无论是具体的数值、百分比值，还是关键字属性值，另外一个属性值一定是 center

background-position 单值对应的双值语法表

|单值|等同的双值|
|:--|:--|
|20px|20px center|
|20%|20% center|
|top|top center|
|right|right center|
|bottom|bottom center|
|left|left center|
|center|center center|

### 双值语法

分三种情况：

1. 2 个值都是关键字属性值
   1. left 和 right 关键字表示水平方向
   2. top 和 bottom 关键字表示垂直方向
   3. 不能同时设置对立的方向关键字，top bottom 非法
   4. top right 和 right top 效果一样
2. 1 个值是关键字属性值，另外一个值数值或百分比值
   1. 此时第一个关键字属性值表示水平方向，第二个关键字属性值表示垂直方向
   2. 20px left 非法
3. 2 个值都是数值或百分比值
   1. 第一个值表示水平方向，第二个值表示垂直方向

### 三值或四值语法

此时，数值或百分比值表示**偏移量**，第一个值一定要是关键字属性值，表示偏移从哪个方向开始。