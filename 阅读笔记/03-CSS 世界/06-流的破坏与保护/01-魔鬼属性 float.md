# 魔鬼属性 float

## 目录

- [魔鬼属性 float](#魔鬼属性-float)
  - [目录](#目录)
  - [float 的本质与特性](#float-的本质与特性)
    - [包裹性](#包裹性)
    - [块状化并格式化上下文](#块状化并格式化上下文)
  - [float 的作用机制](#float-的作用机制)

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

## float 的作用机制

float 的特性之使父元素高度塌陷