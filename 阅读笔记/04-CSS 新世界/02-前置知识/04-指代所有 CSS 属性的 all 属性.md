# 指代所有 CSS 属性的 all 属性

all 属性可以重置 unicode-bidi、direction 以及 CSS 自定义属性以外的所有 CSS 属性。

all 属性的语法：

> all: initial | inherit | unset | revert

all: unset 可以让任意一个元素样式表现和 \<span> 元素一样。

all: revert 可以让元素恢复成浏览器默认的样式。

## 为什么 unicode-bidi 和 direction 不受 all 属性影响

由于 direction 属性初始值为 ltr，而不是 auto。现在为照顾从右往左阅读的场景，direction 属性被设计为不受 all 属性影响。

unicode-bidi 属性配合 direction 属性可以**精确控制每一个文字的呈现方向**，单独使用 unicode-bidi 没有作用。
