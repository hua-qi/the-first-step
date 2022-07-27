# font-size

line-height 的数值属性值和百分比值属性值都相对于 font-size 计算。

## 目录

- [font-size](#font-size)
  - [目录](#目录)
  - [font-size 和 vertical-align](#font-size-和-vertical-align)
  - [font-size 与 ex、em 和 rem 的关系](#font-size-与-exem-和-rem-的关系)
  - [font-size 的关键字属性值](#font-size-的关键字属性值)
    - [font-size 使用建议](#font-size-使用建议)
  - [font-size: 0 与文本的隐藏](#font-size-0-与文本的隐藏)

## font-size 和 vertical-align

line-height 的部分类别属性相对于 font-size 计算。

vertical-align 百分比属性值相对于 line-height。

于是 vertical-align 就这样和 font-size 产生了联系。

```css
p {
    font-size: 16px;
    line-height: 1.5;
}

p > img {
    /* 最终计算值：16px * 1.5 * -25% = -6px */
    vertical-align: -25%; 
}

/* 上述代码等同于 */

p > img {
    vertical-align: -6px;
}
```

---

## font-size 与 ex、em 和 rem 的关系

ex 是字符 x 的高度，故而与 font-size 成正相关。

em 为传统排版中一个字模的高度，一般由 **M** 的宽度决定（因为宽高相同）。可以将 em 理解为汉字**中**的高度。

在 CSS 中，**1em 的计算值等同于当前元素的 font-size 计算值**。当前元素设置 font-size: 1em 则该 em 取父元素 font-size 计算值。

rem 的计算值等同于根元素的 font-size 计算值。

---

## font-size 的关键字属性值

- 相对尺寸关键字 - 相对当前元素 font-size 计算
  - larger - \<big> 元素默认的 font-size 属性值
  - smaller - \<small> 元素默认的 font-size 属性值
- 绝对尺寸关键字 - 仅受浏览器设置的字号影响（区别于根元素）
  - xx-large - 和 \<h1> 元素 font-size 计算值一样
  - x-large - 和 \<h2> 元素 font-size 计算值一样
  - large - 和 \<h3> 元素 font-size 计算值**近似**
  - medium
    - font-size 初始值（会被继承的 font-size 覆盖）
    - 和 \<h4> 元素 font-size 计算值一样
  - small - 和 \<h5> 元素 font-size 计算值一样
  - x-small - 和 \<h6> 元素 font-size 计算值一样
  - xx-small - 无对应的 HTML 元素

### font-size 使用建议

在图文内容为主的重要局部区域使用可缩放的 font-size 处理，摒弃 px 单位，采用以下策略

- 容器元素声明 font-size: medium
  - 此时，该容器内的字号跟随浏览器设置
  - 默认计算值是 16px
- 容器内的文字字号全部使用相对单位
  - 百分比值或 em 都可以
  - 基于 16px 进行转换
  - 使用自适应流体布局，间距等使用相对单位

---

## font-size: 0 与文本的隐藏

**桌面 Chrome 浏览器有 12px 的字号限制**，文字的 font-size 计算值不能小于 12px。

而如果元素声明 font-size: 0，其字号表现为 0，文字直接被隐藏。只有声明 font-size: 0 才会使文字隐藏，声明 font-size: 0.00001px 仍会被 Chrome 浏览器当作 12px 进行处理。
