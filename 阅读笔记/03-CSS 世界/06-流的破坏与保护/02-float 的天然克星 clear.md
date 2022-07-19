# float 的天然克星 clear

## 目录

- [float 的天然克星 clear](#float-的天然克星-clear)
  - [目录](#目录)
  - [什么是 clear 属性](#什么是-clear-属性)
  - [成事不足败事有余的 clear](#成事不足败事有余的-clear)

## 什么是 clear 属性

clear 属性可专门用于处理 float 属性带来的高度塌陷问题

> clear: none | left | right | both

clear 属性的官方解释，元素盒子的边不能和**前面的浮动元素**相邻。

clear 对于元素盒子后面的浮动元素无能为力。

---

## 成事不足败事有余的 clear

**只有块级元素设置 clear 才有效**。

平常借助伪元素清除浮动影响时，由于 ::after 等伪元素默认为内联元素，需要设置 display 属性值 table、block、list-item。

由于 clear: both 的作用本质是让自己不和 float 元素在一行显示，并不是真正意义上的清除浮动，因此 float 元素一些特性仍然生效：

若元素声明 clear: both 且其前面的元素就是 float 元素，则 margin-top 负值无效。

元素声明 clear: both 其后面的元素依旧可能发生文字环绕的现象。