# CSS 全局关键字属性值

## 目录

- [CSS 全局关键字属性值](#css-全局关键字属性值)
  - [目录](#目录)
  - [继承关键字 inherit](#继承关键字-inherit)
  - [初始值关键字 initial](#初始值关键字-initial)
  - [不固定值关键字 unset](#不固定值关键字-unset)
  - [恢复关键字 revert](#恢复关键字-revert)

## 继承关键字 inherit

inherit 是一个实用性和兼容性俱佳的 CSS 属性值。

使用 inherit 关键字重置输入框的内置字体。

子元素设置 height: inherit 实现高度继承

子元素设置 background-image: inherit 实现背景图像继承。

使用 inherit 关键字，可以有效降低开发和维护成本。

---

## 初始值关键字 initial

initial 是初始值关键字，可以将**当前的 CSS 属性的计算值还原为 CSS 语法中规定的初始值**。

initial 关键字非常适合用在需要重置某些 CSS 样式，但又不记得初始值的场景。

initial 关键字还可以帮助了解 CSS 属性的初始值。

---

## 不固定值关键字 unset

unset 是**不固定值关键字**。

特性为：

如果当前使用的 CSS 属性具有继承性，则等同于使用 inherit 关键字。

如果当前使用的 CSS 属性没有继承性，则等同于使用 initial。

unset 关键字只有配合 all 属性值使用采用意义。

---

## 恢复关键字 revert

revert 关键可以让当前元素的样式还原为**浏览器内置的样式**。

**注**：没有任何理由对 \<li> 元素进行任何样式重置。所有浏览器的 \<li> 元素默认都没有 margin 外间距、padding 内间距，list-style-type 继承 \<ul> 或 \<ol> 元素，所以完全没有必要对 \<li> 元素进行任何样式重置。
