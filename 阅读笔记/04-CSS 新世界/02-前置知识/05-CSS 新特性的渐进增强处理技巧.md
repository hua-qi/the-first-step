# CSS 新特性的渐进增强处理技巧

## 目录

- [CSS 新特性的渐进增强处理技巧](#css-新特性的渐进增强处理技巧)
  - [目录](#目录)
  - [直接使用 CSS 新特性](#直接使用-css-新特性)
  - [利用属性值的语法差异实现兼容](#利用属性值的语法差异实现兼容)
  - [借助伪类或伪元素区分浏览器的技巧](#借助伪类或伪元素区分浏览器的技巧)
    - [区分 IE9+ 浏览器](#区分-ie9-浏览器)
    - [区分 IE10+ 浏览器](#区分-ie10-浏览器)
    - [区分 IE11+ 浏览器](#区分-ie11-浏览器)
    - [浏览器类型的区分](#浏览器类型的区分)
      - [只让 Firefox 浏览器识别](#只让-firefox-浏览器识别)
      - [只让 webkit 浏览器识别](#只让-webkit-浏览器识别)
      - [只让 Chromium Edge 浏览器识别](#只让-chromium-edge-浏览器识别)
  - [@supports 规则下的渐进增强处理](#supports-规则下的渐进增强处理)
    - [@supports 规则的常用语法](#supports-规则的常用语法)
    - [复杂逻辑中使用操作符](#复杂逻辑中使用操作符)
    - [@supports 规则完整语法和细节](#supports-规则完整语法和细节)

## 直接使用 CSS 新特性

有很多 CSS 新特性是对现有 Web 特性的体验升级，可以直接使用这些 CSS 新特性，不必担心兼容性问题。

- 与视觉表现相关的 CSS 属性
  - border-radius
  - box-shadow
  - text-shadow
  - filter
- 交互体验增强的 CSS 属性
  - srcoll-behavior
  - overscroll-behavior
- 性能增强的 CSS 属性
  - will-change

**注**：做Web开发是没有必要让所有浏览器都显示得一模一样的，好的浏览器有更好的显示，糟糕的浏览器就只有普通的显示，这才是对用户更负责任的做法。

---

## 利用属性值的语法差异实现兼容

借助全新的属性值语法可以有效区分新旧浏览器。

CSS 动画属性 animation 示例：

需求：使用很小的 PNG 图片，借助旋转动画，实现加载效果。

IE9 及其以下版本浏览器使用传统的 GIF 动图作为背景。

IE10+ 浏览器使用传统的 PNG 背景图外加 animation 属性实现加载效果。

如何区分 IE9 和 IE10 浏览器？**利用属性值的语法差异实现渐进增强效果。**

```css
.icon-loading {
    display: inline-block;
    width: 30px;
    height: 30px;
    /* 所有浏览器识别 */
    background: url(./loading.gif);
    /* IE9 浏览器无法识别 linear-gradient()，此行代码失效 */
    background: url(./loading.gif), linear-gradient(transparent, transparent);
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(360deg);
    }

    to {
        transform: rotate(0deg);
    }
}
```

下拉浮层效果通过在 IE9+ 浏览器中使用 box-shadow 盒阴影、在 IE8 等浏览器使用 border 边框实现。

```css
.panel-x {
    /* 所有浏览器识别 */
    border: 1px solid #ddd;
    /* rgba() IE9+ 识别，覆盖上一层 border 声明 */
    border: 1px solid rgba(0, 0, 0, 0);
    box-shadow: 2px 2px;
}
```

---

## 借助伪类或伪元素区分浏览器的技巧

借助伪类或伪元素区分浏览器，优点：**可以一次性区分多个 CSS 属性，同时不会影响选择器的优先级**。

### 区分 IE9+ 浏览器

若要区分 IE9+ 浏览器，可以使用 IE9 浏览器才开始支持的伪类或伪元素。

```css
/* IE9+ 浏览器识别 */
_::before, .some-class {}
/* 或者 */
_::after, .some-class {}
/* 或者 */
_::selection, .some-class {}

_:checked, .some-class {}
/* 或者 */
_:disabled, .some-class {}

/*
    _ 下划线作为标签选择器用于占位，本身不会产生任何匹配 
*/
```

之所以上面的写法可以有效区分不同版本的浏览器，因为 CSS 选择器语句如果存在浏览器无法识别的伪类或伪元素，**整个 CSS 规则集都会被忽略**。

### 区分 IE10+ 浏览器

要想区分 IE10+ 浏览器，可以使用 IE10 才开始支持与表单验证相关的伪类，:required、:optional、:valid、:invalid。

animation 属性亦是 IE10 浏览器开始支持。

```css
.icon-loading {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(./loading.gif);
}

/* IE10+ 浏览器识别 */
_:valid, .icon-loading {
    background: url(./loading.png);
    animation: spin 1s linear infinite;
}

@ketframes spin {
    from {
        transform: rotate(360deg);
    }

    to {
        transform: rotate(0deg);
    }
}
```

### 区分 IE11+ 浏览器

::backdrop 是 IE11 开始支持的伪元素，可以控制全屏元素或者元素全屏时候的背景层的样式。

在 IE11 浏览器中使用该属性时，需要加 -ms- 私有前缀，在 Edge 等其他浏览器中使用则不需要添加私有前缀。

```css
/* 最终的 CSS 代码会有冗余，
    .some-class 下的 CSS 样式需要写两遍 
*/

/* IE11+ 浏览器识别 */
_::ms-backdrop, .some-class {}

/* @supports 区分 Egde12+ 浏览器 */
@supports (display: none) {
    .some-class {}
}
```

### 浏览器类型的区分

#### 只让 Firefox 浏览器识别

使用带有 -moz- 私有前缀的伪类或伪元素

```css
/* Firefox only */
_::-moz-progress-bar, .some-class {}
```

#### 只让 webkit 浏览器识别

只能使用带有 -webkit- 前缀的伪类，不能使用带有 -webkit- 前缀的伪元素

```css
/* webkit 浏览器 */
:-webkit-ant(_), .some-class {}
```

#### 只让 Chromium Edge 浏览器识别

```css
/* Chromium Edge only */
_::-ms-any, .some-class {}
```

---

## @supports 规则下的渐进增强处理

@supports 是 CSS 中常见的 @ 规则，可以用来**检测当前浏览器是否支持某个 CSS 新特性**，这是最规范、最正统的 CSS 渐进增强处理方法，尤其适合多个 CSS 属性同时处理的场景。

### @supports 规则的常用语法

语法示例：

```css
@supports (display: flex) {
    .item {
        flex: 1;
    }
}
```

上述代码逻辑：如果浏览器支持 display: flex，则匹配 .item 类名的元素就声明 flex: 1。

@supports 规则支持使用**操作符进行判断**，以实现简单的逻辑判断。

- not - 否定
- and - 并且
- or - 或者

```css
/* 支持弹性布局 */
@supports (display: flex) {}
/* 不支持弹性布局 */
@supports (display: flex) {}
/* 同时支持弹性布局和网格布局 */
@supports (display: flex) and (display: grid) {}
/* 支持弹性布局或支持网格布局 */
@supports (display: flex) or (display: grid) {}

/* 连续判断 3 个以上的 CSS 声明也没有问题 */
@supports (display: flex) and (display: grid) and (gap: 0) {}
@supports (display: flex) or (display: grid) or (gap: 0) {}
```

### 复杂逻辑中使用操作符

\<supports-condition> 语法：

> \<supports-condition> = ( \<var> ) | not ( \<var> ) | \<var> [and ( \<var> )]+ ( \<var> ) [ or (\<var>) ]+

\<var> 语法：

> \<var> = \<declaration> | \<supports-condition>

综上 \<supports-conditon> 规则的属性值可以嵌套。

场景：判断当前浏览器支持弹性布局，但不支持网格布局

```css
@supports (display: flex) and (not (display: grid)) {}
```

### @supports 规则完整语法和细节

@supports 规则的正式语法

```css
@supports \<supports-condition> {
    /* CSS 规则集 */
}
```

@supports 规则支持 **CSS 自定义属性的检测和 CSS 选择器语法的检测**。

```css
/* CSS 自定义属性的检测没有任何实用价值 */
@supports (--var: blue) {}
/* 
CSS 选择器语法的检测属于 CSS Conditional 
Rules Modules Level 4 规范中的内容。
暂时没有实用价值
 */
@supports selector(:default) {}
```

浏览器提供了 **CSS.supports()** 接口，可以在 JavaScript 代码中检测当前浏览器是否支持某个 CSS 特性。语法如下：

```javascript
CSS.supports(propertyName, value);
CSS.supports(supportsCondition);
```

**@supports 规则的花括号中可以包含其他任意 @ 规则**：

```css
@supports (display: flex) {
    /* 支持内嵌媒体查询方法 */
    @media screen and (max-width: 9999px) {
        .supports-match {
            color: #fff;
        }
    }

    /* 支持内嵌 @supports 语法 */
    @supports (animation: none) {
        .supports-match {
            animation: colorful 1s linear alternate infinite;
        }
    }

    /* 支持内嵌 @keyframes 语法 */
    @keyframes colorful {
        from { background-color: deepskyblue; }
        to { background-color: deeppink; }
    }
}
```
