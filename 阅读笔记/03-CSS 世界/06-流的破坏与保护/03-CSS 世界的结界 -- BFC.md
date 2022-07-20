# CSS 世界的结界 -- BFC

BFC（block formatting context）块级格式上下文。

## 目录

- [CSS 世界的结界 -- BFC](#css-世界的结界----bfc)
  - [目录](#目录)
  - [触发 BFC](#触发-bfc)
  - [BFC 与流体布局](#bfc-与流体布局)
    - [BFC 与流体布局的最佳方案](#bfc-与流体布局的最佳方案)
    - [两套 IE7 以上版本浏览器适配的自适应解决方案](#两套-ie7-以上版本浏览器适配的自适应解决方案)
      - [借助 overflow 属性](#借助-overflow-属性)
      - [融合 display: table-cell 和 display: inline-block](#融合-display-table-cell-和-display-inline-block)

## 触发 BFC

- \<html> 根元素
- overflow 的值为 auto、scroll、hidden
- display 的值为 table-cell、table-caption、inline-block
- float 的值不为 none
- position 的值不为 relative 和 static

元素的 CSS 属性声明若满足上述任一条件，即可触发 BFC，无须使用 clear-both 属性去清除浮动的影响。

---

## BFC 与流体布局

BFC 的结界特性最重要的用途不是去 margin 重叠或者清除 float 影响，而是**实现更健壮、更智能的自适应布局**。

**BFC 的表现原则**：具有 BFC 特性的元素的子元素不会受外部元素影响，也不会影响外部元素。

### BFC 与流体布局的最佳方案

- overflow: auto/hidden
  - 适用于 IE7 及以上版本的浏览器
- display: inline-block
  - 适用于 IE6 和 IE7
- display: table-cell
  - 适用于 IE8 及以上版本的浏览器

### 两套 IE7 以上版本浏览器适配的自适应解决方案

**均支持无线嵌套**。

#### 借助 overflow 属性

```css
.lbf-content {
    overflow: hidden;
    }
```

缺点：子元素定位到父元素外面，可能会被隐藏。

#### 融合 display: table-cell 和 display: inline-block

```css
.lbf-content {
    display: table-cell;
    width: 9999px;
    /* 若不需要兼容 IE7，下面样式可省略 */
    display: inline-block;
    width: auto;
}

/* 解决 display: table-cell 元素内连续英文字符无法换行的问题 */
.word-break {
    display: table;
    width: 100%;
    table-layout: fixed;
    word-break: break-all;
}
```
