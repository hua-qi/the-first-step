# relative 相关

## 目录

- [relative 相关](#relative-相关)
  - [目录](#目录)
  - [relative 对 absolute 的限制](#relative-对-absolute-的限制)
  - [relative 与 定位](#relative-与-定位)
    - [relative 与 margin 对比](#relative-与-margin-对比)
    - [relative 的对立方向定位](#relative-的对立方向定位)
  - [relative 的最小化影响原则](#relative-的最小化影响原则)
    - [relative 最小化](#relative-最小化)

## relative 对 absolute 的限制

relative/absolute/fixed 都可以对 absolute 的**包裹性**以及**定位**产生限制，但只有 **relative 可以使元素依然保持在正常的文档流中**。

---

## relative 与 定位

relative 定位两大特性：相对自身；无侵入。

无侵入指，元素声明 relative 进行定位偏移时，一般情况下不会影响周围元素的布局。

### relative 与 margin 对比

属性值取固定数值时，均相对于原文档流中的元素位置进行偏移。

margin 会影响其后续元素的定位，由于其脱离当前文档流，后续元素会占据其原位置。

relative 不会影响其后续元素的定位，其原文档流中的元素位置仍然存在。

属性值取百分比值时，均相对于包含块计算。

margin 水平、垂直方向均相对于包含块宽度计算。

relative 水平方向相对于包含块宽度计算，垂直方向相对于包含块高度计算。这点于 absolute/fixed 定位相同。

top 和 bottom 垂直方向的百分比值计算规则与 height 的百分比值一样，都为**相对高度计算**，若包含块声明 height: auto，则它们的计算值为 0。

### relative 的对立方向定位

absolute 声明对立方向表现为尺寸拉伸、流体特性。

relative 声明对立方向的渲染表现与文档流方向有光。

默认文档流方向为自上而下、从左往右，因此 top 和 bottom 同时存在时，取 top 属性值；left 和 right 同时声明时，使用 left。

```css
.example {
    position: relative;
    top: 10px;
    bottom: 10px; /* 无效 */
    left: 10px;
    right: 10px; /* 无效 */
}
```

---

## relative 的最小化影响原则

relative 最小化影响原则是作者总结的一套布局实践原则，主要分为两部分：

1. 尽量不使用 relative，若想定位某些元素，先尝试**无依赖绝对定位**。
2. 若该场景必须使用 relative，则该 relative 务必最小化。

### relative 最小化

需求：在某个模块的右上角定位一个图标

```html
<!-- 初始 HTML 结构 -->
<div>
    <img src="icon.png">
    <p>内容1</p>
    <p>内容2</p>
    <p>内容3</p>
</div>

<!-- 未考虑 relative 最小化 -->
<div style="position: relative;">
    <img src="icon.png" style="position: absolute; top: 0; right: 0;">">
    <p>内容1</p>
    <p>内容2</p>
    <p>内容3</p>
</div>

<!-- relative 最小化 -->
<div>
    <div style="position: relative;">
        <img src="icon.png" style="position: absolute; top: 0; right: 0;">
    </div>
    <p>内容1</p>
    <p>内容2</p>
    <p>内容3</p>
</div>
```

是否考虑 relative 最小化的代码区别在于 **relative 是否只影响图标**。

未考虑 relative 最小化的代码，致使其他不需要定位的普通元素变为相对定位元素，使元素的层叠顺序提高，会引起其他元素设置 z-index 无效。

而且考虑 relative 最小化的代码维护性较高，在不需要图标时，直接删去对应代码即可，不必考虑影响其他元素的定位（很少会有相对图标定位的元素）。
