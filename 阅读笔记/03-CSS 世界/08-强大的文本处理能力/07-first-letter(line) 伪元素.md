# ::first-letter/::first-line 伪元素

## 目录

- [::first-letter/::first-line 伪元素](#first-letterfirst-line-伪元素)
  - [目录](#目录)
  - [深入 ::first-letter 伪元素及其实例](#深入-first-letter-伪元素及其实例)
    - [::first-letter 伪元素生效的前提](#first-letter-伪元素生效的前提)
    - [::first-letter 伪元素的辅助类](#first-letter-伪元素的辅助类)
  - [::first-letter 与 ::before 伪元素](#first-letter-与-before-伪元素)
    - [::first-letter 伪元素可以生效的 CSS 属性](#first-letter-伪元素可以生效的-css-属性)
  - [::first-line 伪元素](#first-line-伪元素)

## 深入 ::first-letter 伪元素及其实例

::first-letter 语义：**首字符作为元素的假想子元素**

### ::first-letter 伪元素生效的前提

1. 元素的 display 属性值的计算值必须为下述列表的属性值
   - block
   - inline-block
   - list-item
   - table-cell
   - table-caption
2. 首字符前不能有图片或者 inline-block/inline-table 之类的元素

### ::first-letter 伪元素的辅助类

常见的标题符号、各类括号和引号对于 ::first-letter 伪元素作为**辅助类**字符使用。

具体的辅助类字符包括 ·@#%&*()（）[]【】{}:："“”;；'‘’》《,，.。？?!！…*、/\

可以作为 ::first-letter 伪元素的字符只有**数字、英文字母、中文、$、一些运算符、空格**

## ::first-letter 与 ::before 伪元素

```html
<style>
p::before {
        content: "新闻：";
}

p::first-letter {
    color: silver;
}
</style>

<p>这是新闻的标题</p>
```

上述代码的最终效果为：::before 伪元素填充在 \<p> 元素的前的“新闻：”的 新 字被渲染为银色。

### ::first-letter 伪元素可以生效的 CSS 属性

如果字符被选作为 ::first-letter 伪元素，此时仅有部分 CSS 属性对此字符有效。

- 所有字体相关属性
  - font
  - font-style
  - font-variant
  - font-weight
  - font-size
  - line-height
  - font-family
- 所有背景相关属性
  - background-color
  - background-image
  - background-positon
  - background-repeat
  - background-size
  - background-attachment
- 所有 margin 相关属性
  - margin
  - margin-top/right/bottom/left
- 所有 padding 相关属性
  - padding
  - padding-top/right/bottom/left
- 所有 border 相关属性
  - border
  - border-style
  - border-color
  - border-width
- color 属性
- text-decoration、text-transform、letter-spacing、word-spacing、line-height、float、vertical-align

---

## ::first-line 伪元素

::first-line 能作用在块级元素上，即 display 属性值为 block、inline-block、list-item、table-cell、table-caption

仅支持部分 CSS 属性

- 所有字体相关属性
- color 属性
- 所有背景相关属性
- text-decoration、text-transform、letter-spacing、word-spacing、line-height、float、vertical-align
