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
