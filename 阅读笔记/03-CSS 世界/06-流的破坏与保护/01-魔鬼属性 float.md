# 魔鬼属性 float

## 目录

- [魔鬼属性 float](#魔鬼属性-float)
  - [目录](#目录)
  - [float 的本质与特性](#float-的本质与特性)
    - [包裹性](#包裹性)
    - [块状化并格式化上下文](#块状化并格式化上下文)
  - [float 实现文字环绕的原理](#float-实现文字环绕的原理)
  - [float 更深入的作用机制](#float-更深入的作用机制)
  - [float 与流体布局](#float-与流体布局)

## float 的本质与特性

**浮动的本质是为实现文字环绕效果**。文字环绕主要指文字环绕显式效果。

纯浮动布局容错性差，容易出现比较严重的布局问题。

float 特性

- 包裹性
- 块状化并格式化上下文
- 破坏文档流
- 没有任何 margin 合并

### 包裹性

包裹性由**包裹**和**自适应性**两部分组成

```html
<style>
    .father {
        width: 200px;
    }

    .float {
        float: left;
    }

    .float img {
        width: 128px;
    }
</style>

<!-- 包裹示例 -->
<div class="father">
    <div class="float">
        <img src="1.jpg">
    </div>
</div>

<!-- 自适应性示例 -->
<div class="father">
    <div class="float">
        <img src="1.jpg">包裹性由包裹和自适应组成
    </div>
</div>
```

包裹示例的代码渲染结果为 .father 宽度为 128px，即图片宽度。此时浮动元素宽度表现为“包裹”。

自适应性示例的代码渲染结果为 .father 宽度 200px，即其元素声明宽度。此时浮动元素宽度表现为自适应父元素宽度。前提是**浮动元素的首选最小宽度小于父元素的宽度**。

### 块状化并格式化上下文

若元素的 float 属性值不为 none，则其 display 计算值就是 block 或者 table。

float 属性值和 display 属性值转换关系表

| float 设定值       | display 转换值 |
| :----------------- | :------------- |
| inline             | block          |
| inline-block       | block          |
| inline-table       | table          |
| table-row          | block          |
| table-row-group    | block          |
| table-column       | block          |
| table-column-group | block          |
| table-cell         | block          |
| table-caption      | block          |
| table-header-group | block          |
| table-footer-group | block          |

---

## float 实现文字环绕的原理

float 的特性之使父元素高度塌陷是一种标准而不是 bug。

float 被设计之处的原因便是实现文字环绕效果。

为实现真正的**文字环绕效果**，需要注意**行框盒子和浮动元素的不可重叠性**，即行框盒子如果和浮动元素的垂直高度有重叠，则行框盒子在正常定位状态只会跟随浮动元素，而不会发生重叠。

由上，文字环绕效果是由**父级高度塌陷**和**行框盒子区域限制**共同作用的结果。

---

## float 更深入的作用机制

浮动锚点（float anchor）是 float 元素所在“流”中的一个点，这个点本身并不浮动，就表现而言，更像一个没有 margin、border、padding 的空内联元素。

浮动参考（flaot reference）指浮动元素对齐参考的实体。在 CSS 世界中，**float 元素的浮动参考是行框盒子**，即 float 元素在当前“行框盒子”内定位。

若浮动元素前后全是块元素，自然也就没有行框盒子。此时 float 元素的浮动参考是浮动锚点，浮动锚点表现如空内联元素，自然就有行框盒子。

---

## float 与流体布局

使用 float 可以轻松实现自适应两栏布局和自适应三栏布局。
