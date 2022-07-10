# 激进的 margin 属性

margin 比较激进，负责外间距。

## 目录

- [激进的 margin 属性](#激进的-margin-属性)
  - [目录](#目录)
  - [margin 与元素尺寸以及相关布局](#margin-与元素尺寸以及相关布局)
    - [元素尺寸的相关概念](#元素尺寸的相关概念)
    - [margin 与元素的内部尺寸](#margin-与元素的内部尺寸)
    - [margin 与元素的外部尺寸](#margin-与元素的外部尺寸)
  - [margin 的百分比值](#margin-的百分比值)
  - [正确看待 CSS 世界中的 margin 合并](#正确看待-css-世界中的-margin-合并)
    - [什么是 margin 合并](#什么是-margin-合并)
    - [margin 合并的 3 种场景](#margin-合并的-3-种场景)
      - [相邻兄弟元素 margin 合并](#相邻兄弟元素-margin-合并)
      - [父级和第一个/最后一个子元素合并](#父级和第一个最后一个子元素合并)
      - [空块级元素的 margin 合并](#空块级元素的-margin-合并)
    - [margin 合并的计算规则](#margin-合并的计算规则)
      - [正正最大值](#正正最大值)
      - [正负值相加](#正负值相加)
      - [负负最负值](#负负最负值)
    - [margin 合并的意义](#margin-合并的意义)
      - [前置知识](#前置知识)
      - [兄弟元素的 margin 合并的意义](#兄弟元素的-margin-合并的意义)
      - [父子元素的 margin 合并的意义](#父子元素的-margin-合并的意义)
      - [空元素的自身 margin 合并的意义](#空元素的自身-margin-合并的意义)
  - [深入理解 CSS 中的 margin: auto](#深入理解-css-中的-margin-auto)
    - [为何在父元素定高时 margin: auto 无法实现垂直居中](#为何在父元素定高时-margin-auto-无法实现垂直居中)
      - [如何使用 margin: atuo 实现居中](#如何使用-margin-atuo-实现居中)
  - [margin 无效情形解析](#margin-无效情形解析)

## margin 与元素尺寸以及相关布局

### 元素尺寸的相关概念

- 元素尺寸
  - 包括 padding、border 即元素的 border box 的尺寸
  - 原生 DOM API
    - offsetWidth
    - offsetHeight
  - 有时也称为**元素偏移尺寸**
- 元素内部尺寸
  - 包括 padding、但不包括 border 即元素的 padding box 的尺寸
  - 原生 DOM API
    - clientWidth
    - clientHeight
  - 有时也称为**元素可视尺寸**
- 元素外部尺寸
  - 元素的 margin box 的尺寸
  - 没有对应的原生 DOM API

元素外部尺寸有一个特性：尺寸值可以是**负数**。可以将外部尺寸理解为元素占据的空间尺寸，将概念从尺寸转换到空间，方便理解。

### margin 与元素的内部尺寸

margin 同样可以改变元素的内部尺寸，但是和 **padding 几乎是互补态势**。

- 若元素设定了 width 或者保持“包裹性”
  - 此时设置 padding，会**改变元素可视尺寸**
  - 此时设置 margin，对**元素可视尺寸没有影响**
- 若元素处于“充分利用空间”状态时
  - 此时设置 margin 才可以改变元素的可视尺寸

```html
<style>
    /* 
    此时元素宽度仍是 300px
    只要元素设定宽度，margin 就无法改变元素尺寸
     */
    .father {
        width: 300px;
        margin: 0 -20px;
    }
</style>

<!-- ======================================== -->

<style>
    .father {
        width: 300px
    }

    /* 
    此时 .son 元素的宽度是 340px
    因为该元素此时的宽度表现为“充分利用可用空间”
     */
    .son {
        margin: 0 -20px;
    }
</style>

<div class="father">
    <div class="son"></div>
</div>
```

只要元素的尺寸表现符合“充分利用可用空间”，无论是垂直方向还是水平方向，都可以通过 margin 改变尺寸。

CSS 世界默认的流方向是水平方向，因此，对于普通流体元素，margin 只能改变元素水平方向尺寸。但是对于具有拉伸特性的绝对定位元素，margin 可以改变水平、垂直方向尺寸，因为此时元素的尺寸表现符合“充分利用可用空间”

margin 可以很方便地实现很多流体布局效果

[margin 实现一栏定宽的两栏自适应布局](https://demo.cssworld.cn/4/3-1.php)

[margin 实现一栏定宽的两栏自适应布局 - 备份](demo/12-margin%20实现一栏定宽的两栏自适应布局.html)

### margin 与元素的外部尺寸

对于普通块状元素，在默认的水平流下，margin 只能改变左右方向的内部尺寸，垂直方向则无法改变。

如果设置 writing-mode: vertical-rl; 改变流向为垂直流，则水平方向内部尺寸无法改变，垂直方向可以改变。

上述特性都由 margin: auto 的计算规则决定。

但是对于元素的外部尺寸，只要元素具有块状特性，无论元素是否设置 width/height，无论是水平方向还是垂直方向，即使发生了 margin 合并，margin 都会影响外部尺寸。

使用 margin 可以解决下述**未定义行为**

如果容器可以滚动，Firefox 浏览器会忽略 padding-bottom 值，Chrome 浏览器则不会。

- Chrome 浏览器，子元素超过 content box 尺寸触发滚动条显示
- Firefox 浏览器，子元素超过 padding box 尺寸触发滚动条

若要实现滚动留白，为实现兼容性，可以放弃父元素设置 padding 留白，转而借助子元素设置 margin 的外部尺寸特性。

利用 margin 外部尺寸实现等高布局的经典案例

[margin 负值与等高布局实例](https://demo.cssworld.cn/4/3-2.php)

[margin 负值与等高布局实例 - 备份](demo/13-margin%20负值与等高布局实例.html)

上述案例中的核心代码

```css
.column-box {
    overflow: hidden;
}
.column-left,
.column-right {
    margin-bottom: -9999px;
    padding-bottom: 9999px;
}
```

原理：margin 无法改变元素的内部尺寸，但却能改变外部尺寸，当设置 margin-bottom: -999px，意味着元素的外部尺寸在垂直方向向上移动 999px。默认情况下，垂直方向块级元素上下距离是 0。然后通过 padding-bottom: 999px 增加元素，正负抵消，对布局无影响，但在视觉层多了 999px 高度的可使用背景色。再配合 overflow: hidden 将多出的色块背景隐藏，实现视觉上的等高布局效果。

经笔者实践，flex 布局可以轻松实现该需求。

---

## margin 的百分比值

margin 的水平方向和垂直方向的百分比值都相对宽度计算。

---

## 正确看待 CSS 世界中的 margin 合并

### 什么是 margin 合并

块级元素的上外边距（margin-top）和下外边距（margin-bottom）有时会合并为单个外边距，这种现象称为**margin 合并**。

限制条件：

- 块级元素，但不包括浮动和绝对定位元素
- 只发生在和当前文档流方向的垂直方向上
  - 由于默认文档流方向是水平流，因为默认 margin 合并发生在垂直方向

### margin 合并的 3 种场景

#### 相邻兄弟元素 margin 合并

```html
<style>
    p {
        margin: 1em 0;
    }
</style>
<p>第一行</p>
<p>第二行</p>
```

第一行和第二行之间的间距仍是 1em，因为第一行的 margin-bottom 和第二行的 margin-top 合并在一起。

#### 父级和第一个/最后一个子元素合并

默认状态下，下述 3 种设置是等效的

```html
<div class="father">
    <div class="son" style="margin-top: 80px;"></div>
</div>

<div class="father" style="margin-top: 80px;">
    <div class="son"></div>
</div>

<div class="father" style="margin-top: 80px;">
    <div class="son" style="margin-top: 80px;"></div>
</div>
```

如何阻止这里的 margin 合并的发生？

对于 margin-top 合并，可以进行如下操作（满足其一即可）

- 父元素设置为块状格式化上下文元素
- 父元素设置为 border-top 值
- 父元素设置为 padding-top 值
- 父元素和第一个子元素之间添加内联元素进行分隔

对于 margin-bottom 合并，可以进行如下操作（满足其一即可）

- 父元素设置为块状格式化上下文元素
- 父元素设置 border-bottom 值
- 父元素设置 padding-bottom 值
- 父元素和最后一个子元素之间添加内联元素进行分隔
- 父元素设置 height/min-height/max-height

#### 空块级元素的 margin 合并

```html
<style>
    .father {
        overflow: hidden;
    }

    .son {
        margin: 1em 0;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

此时 .father 元素高度为 1em。因为 .son 元素是空元素，其 margin-top 和 margin-bottom 合并在一起了。

**空块级元素自身没有设置 margin 也会发生合并**。

```html
<style>
    p {
        margin: 1em 0;
    }
</style>
<p>第一行</p>
<div></div>
<p>第二行</p>
```

此时第一行和第二行之间的距离仍是 1em。

原理分析：上述代码渲染时，发生了 3 次 margin 合并，\<div> 和第一行 \<p> 的 margin-bottom 合并，然后和第二行 \<p> 的margin-top 合并，这两次合并是相邻兄弟合并。由于自身是空 \<div>，于是前两次合并的 margin-bottom 和 margin-top 再次合并，这次合并是空块级元素合并，于是最终间距还是 1em。

若不希望空块级元素发生 margin 合并，可以进行如下操作：

- 设置垂直方向的 border
- 设置垂直方向的 padding
- 空元素里添加内联元素
- 设置 height 或者 min-height

### margin 合并的计算规则

margin 合并的计算规则总结为“**正正取大值，正负值相加，负负最负值**”。

#### 正正最大值

```html
<!-- 相邻兄弟合并 -->
<style>
    .a {
        margin-bottom: 50px;
    }

    .b {
        margin-top: 20px;
    }
</style>

<!-- 此时上下两个元素间距为 50px -->
<div class="a"></div>
<div class="b"></div>

<!-- =============================== -->

<!-- 父子合并 -->
<style>
    .father {
        margin-top: 20px;
    }

    .son {
        margin-top: 50px;
    }
</style>

<!-- 此时 .father 元素等同于设置了 margin-top: 50px -->
<div class="father">
    <div class="son"></div>
</div>

<!-- =============================== -->

<!-- 自身合并 -->
<style>
    .a {
        margin-top: 20px;
        margin-bottom: 50px;
    }
</style>
<!-- 此时 .a 元素的外部尺寸是 50px -->
<div class="a"></div>
```

#### 正负值相加

```html
<!-- 相邻兄弟合并 -->
<style>
    .a {
        margin-bottom: 50px;
    }

    .b {
        margin-top: -20px;
    }
</style>

<!-- 此时上下两个元素间距为 30px。-20px + 50px -->
<div class="a"></div>
<div class="b"></div>

<!-- =============================== -->

<!-- 父子合并 -->
<style>
    .father {
        margin-top: -20px;
    }

    .son {
        margin-top: 50px;
    }
</style>

<!-- 此时 .father 元素等同于设置了 margin-top: 30px。-20px + 50px -->
<div class="father">
    <div class="son"></div>
</div>

<!-- =============================== -->

<!-- 自身合并 -->
<style>
    .a {
        margin-top: 20px;
        margin-bottom: 50px;
    }
</style>
<!-- 此时 .a 元素的外部尺寸是 30px。-20px + 50px -->
<div class="a"></div>
```

#### 负负最负值

```html
<!-- 相邻兄弟合并 -->
<style>
    .a {
        margin-bottom: -50px;
    }

    .b {
        margin-top: -20px;
    }
</style>

<!-- 此时上下两个元素间距为 -50px -->
<div class="a"></div>
<div class="b"></div>

<!-- =============================== -->

<!-- 父子合并 -->
<style>
    .father {
        margin-top: -20px;
    }

    .son {
        margin-top: -50px;
    }
</style>

<!-- 此时 .father 元素等同于设置了 margin-top: -50px -->
<div class="father">
    <div class="son"></div>
</div>

<!-- =============================== -->

<!-- 自身合并 -->
<style>
    .a {
        margin-top: -20px;
        margin-bottom: -50px;
    }
</style>
<!-- 此时 .a 元素的外部尺寸是 -50px -->
<div class="a"></div>
```

### margin 合并的意义

#### 前置知识

HTML 和 CSS 是为了更好的展示图文信息而设计的，对于 HTML 元素\<h2>、\<p>、\<ul> 都默认具有垂直方向的 margin 值，而且单位全部都是 em。

为何默认具有 margin 值？

CSS 世界的设计本意就是图文信息展示，具有默认 margin，图文就不会挤在一起。

为何使用 em 作为单位？

浏览的默认字体大小可以自定义，em 作为相对字体单位，则可以让图文无论多大的字体都可以排版良好。

#### 兄弟元素的 margin 合并的意义

兄弟元素的 margin 合并的作用和 em 类似，都是让图文信息的排版更加舒服自然。

#### 父子元素的 margin 合并的意义

其意义在于：在页面中任何地方嵌套块级元素，都不会影响原来的块状布局

#### 空元素的自身 margin 合并的意义

其意义在于：可以避免遗落或者生成的空标签影响排版和布局

---

## 深入理解 CSS 中的 margin: auto

触发 margin: auto 计算有一个前提条件：当元素的 width/height 属性值为 auto 时，该元素具有对应方向的自动填充特性。

margin: auto 的填充规则如下：

- 如果子元素一侧定值，一侧 auto，则 auto 为父元素剩余空间大小
- 如果子元素两则均是 auto，则平分父元素剩余空间

```css
.father {
    width: 300px;
}

.son {
    width: 200px;
    margin-right: 80px;
    margin-left: auto;
}
```

由第一条填充规则，此时.son 的左右边距计算值为 左边距 20px（100px - 80px），右边距为 80px。

由于 margin 的初始值大小是 0，再加之 margin 的自动填充，因此实例 margin 可以轻松实现块级元素的右对齐效果

```css
.son {
    width: 200px;
    margin-left: auto;
}
```

![margin-left: auto 实现自动填充](images/02-margin_auto%20实现自动填充.png)

由上述实践得出以下结论：

- 块级元素实现左中右对齐
  - 使用 margin 的 auto 属性
- 内联元素实现左中右对齐
  - 使用 taxt-align 进行控制

### 为何在父元素定高时 margin: auto 无法实现垂直居中

```css
.father {
    height: 200px;
}

.son {
    height: 100px;
    margin: auto;
}
```

触发 margin: auto 计算有一个前提条件：当元素的 width/height 属性值为 auto 时，该元素具有对应方向的自动填充特性。

对于当前情况，.son 元素若未设置 height，其高度不会自动填充，因而也不会触发 margin: auto 计算。

#### 如何使用 margin: atuo 实现居中

**使用 writing-mode 改变文档流的方向**。

```css
.father {
    height: 200px;
    writing-mode: vertical-lr;
}
.son {
    height: 100px;
    margin: auto;
}
```

此时，.son 元素垂直居中，但是无法设置水平方向 auto 居中。

第二种方式，**绝对定位元素设置 margin: auto 居中**。

```css
.father {
    width: 300px;
    height: 150px;
    position: relative;
}

.son {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
```

此时，.son 元素的尺寸表现为“格式化宽度” 和 “格式化高度”，属于外部尺寸，会自动填充父级元素的可用尺寸。然后再为 .son 元素设置宽高以及 margin: auto，该元素会在 .father 元素中水平垂直居中。

[margin: auto 与绝对定位元素实现水平垂直居中](https://demo.cssworld.cn/4/3-5.php)

[margin: auto 与绝对定位元素实现水平垂直居中 - 备份](demo/14-margin_auto%20与绝对定位元素.html)

**对于替换元素，如果设置 display: block，则 margin: auto 的计算规则同样适用**。

---

## margin 无效情形解析

1. 非替换元素设置 display: inline，然后设置垂直 margin 无效
   - 对于内联替换元素，垂直 margin 有效，并且没有 margin 合并的问题
2. margin 合并时，更改 margin 值可能没有效果
   - 以**整整最大值**情况为例，若更改的 margin 值小于当前取值，此时无效。
3. 绝对定位元素非定位方位的 margin 值“无效”
   - 若绝对定位元素设置 left、top 方向值，此时设置 margin-right/bottom 值将无效
   - margin 并非没起作用。绝对定位元素任意方位的 margin 值无论什么场景下都一直有效
   - 由于**绝对定位元素的渲染是独立的**，margin 元素无法影响其定位，所以看上去“无效”
4. 定高容器的子元素 margin-bottom 或定宽的子元素的 margin-right 的定位“失效” 。
   - 若想使用 margin 属性改变自身的位置，必须要设置与当前元素定位方向一样的 margin 属性才可以
   - 默认流下，普通元素的定位方向是左侧以及上方，所以设置 margin-bottom、margin-right 无效
5. 内联特性导致 margin 无效
