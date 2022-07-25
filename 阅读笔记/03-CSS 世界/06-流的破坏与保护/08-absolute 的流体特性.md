# absolute 的流体特性

## 目录

- [absolute 的流体特性](#absolute-的流体特性)
  - [目录](#目录)
  - [absolute 与 left/top/right/bottom 属性](#absolute-与-lefttoprightbottom-属性)
    - [单方向绝对定位元素](#单方向绝对定位元素)
  - [流体特性](#流体特性)
  - [absolute 的 margin: auto 居中](#absolute-的-margin-auto-居中)
    - [绝对定位元素的 margin: auto 的填充规则](#绝对定位元素的-margin-auto-的填充规则)
  - [常用绝对定位元素水平居中方式](#常用绝对定位元素水平居中方式)

## absolute 与 left/top/right/bottom 属性

**元素同时声明 position: absolute 与 left/top/right/bottom 属性时，该元素为绝对定位元素**。

```css
.box {
    position: absolute;
    left: 0;
    top: 0;
}
```

上述代码表示相对于绝对定位元素包含块的左上角对齐，并且原本的相对特性丢失。

### 单方向绝对定位元素

```css
.box {
    position: absolute;
    left: 0;
}
```

此时该元素水平方向绝对定位，垂直方向的定位保持相对特性。

---

## 流体特性

绝对定位元素**同时声明对立方向属性值时**，表现出与普通块级元素类似的流体特性。

left/top/right/bottom 是具有定位特性元素专用的 CSS 属性值，其中 left 和 right 属于水平对立定位方向，top 和 bottom 属于垂直对立定位方向。

```html
<style>
    .box {
        position: absolute;
        left: 0;
        right: 0;
    }
</style>

<div class="box"></div>
```

.box 元素若仅设置 left 或 right 属性，由于包裹性，其宽度为 0。

但是在本例中，由于 .box 元素同时声明 left 和 right 属性，其表现为“格式化宽度”，宽度自适应为其包含块的 padding box。

假设 .box 元素的包含块为根元素，则下述代码可以让 .box 元素恰好完全覆盖浏览器的可视窗口，并且随浏览器窗口的变化而变化。

```css
.box {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
```

**普通元素的流体特性只有一个方向，默认为水平方向；绝对定位元素可以使垂直和水平方向同时保持流动性**。

---

## absolute 的 margin: auto 居中

当绝对定位元素处于流体状态时，其各个盒模型相关属性的解析规则和普通流体元素一样，比如元素声明负值 margin 可以使其尺寸增大、可以使用 margin: auto 使绝对定位元素保持居中。

### 绝对定位元素的 margin: auto 的填充规则

- 若一侧定值，一侧 auto，auto 为剩余空间大小
- 两侧均是 auto，则平分剩余空间

---

## 常用绝对定位元素水平居中方式

不考虑 IE7 浏览器可以淘汰的方式

```css
.element {
    width: 300px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -150px; /* 宽度的一半 */
    margin-top: -100px; /* 高度的一半 */
}
```

若绝对元素的尺寸已知，亦不推荐使用百分比 transform 方式，因为其在某些场景下会使 iOS 微信闪退

```css
.element {
    width: 300px;
    height: 200px;
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%); /* 50% 为自身尺寸的一半 */
}
```

特别推荐使用绝对定位元素的流体特性和 margin: auto 的自动分配特性实现居中

```css
.element {
    width: 300px;
    height: 200px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
```
