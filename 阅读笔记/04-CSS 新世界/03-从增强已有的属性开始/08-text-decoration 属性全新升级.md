# text-decoration 属性全新升级

## 目录

- [text-decoration 属性全新升级](#text-decoration-属性全新升级)
  - [目录](#目录)
  - [text-decoration 属性现在是一种缩写](#text-decoration-属性现在是一种缩写)
  - [text-decoration 属性的累加特性](#text-decoration-属性的累加特性)
  - [实用的 wavy 波浪线](#实用的-wavy-波浪线)
  - [text-underline-position: under 声明](#text-underline-position-under-声明)
  - [text-underline-offset 属性](#text-underline-offset-属性)

## text-decoration 属性现在是一种缩写

现在，text-decoration 属性是一个 CSS 缩写属性，完整的 CSS 属性包括 text-decoration-line、text-decoration-style、text-decoration-color 和 text-decoration-thickness

text-decoration-line 表示装饰线的类型

语法：

```css
/* 没有装饰线 */
text-decoration-line: none;
/* 下划线装饰 */
text-decoration-line: underline;
/* 上划线装饰 */
text-decoration-line: overline;
/* 贯穿线装饰 */
text-decoration-line: line-through;
```

text-decoration-line 属性支持多个值同时使用：

```css
text-decoration-line: underline overline;
```

text-decoration-style 表示装饰线的样式风格

语法：

```css
text-decoration-style: solid;
text-decoration-style: double;
text-decoration-style: dotted;
text-decoration-style: dashed;
text-decoration-style: wavy;
```

![不同的 text-decoration-style 属性值效果](images/29-不同的%20text-decoration-style%20属性值效果.png)

text-decoration-color: 表示装饰线的颜色

text-decoration-thickness: 表示装饰线的粗细

text-decoration 缩写的正式语法：

> text-decoration: <'text-decoration-line'> || <'text-decoration-style'> ||  <'text-decoration-color'> || <'text-decoration-thickness'>

即，**四个子属性值声明位置随机、组合随机**。

---

## text-decoration 属性的累加特性

几乎所有的 CSS 属性都遵循一个规律：子元素的属性值会覆盖父元素相同的属性。

text-decoration 属性并不遵循上述规律，父子元素同时声明 text-decoration 属性时，**文字装饰线效果会累加**。

```html
<style>
  section {
    text-decoration: dashed underline;
  }

  p {
    text-decoration: wavy overline;
  }
</style>

<section>
  <p>父元素声明 text-decoration: dashed underline;</p>
  <p>子元素声明 text-decoration: wavy overline;</p>
</section>
```

上述代码的渲染效果：

![text-decoration 属性值效果叠加](images/30-text-decoration%20属性值效果叠加.png)

---

## 实用的 wavy 波浪线

项目开发中，若要实现实线、双实线、点线或虚线，通常实用 border 属性，其对线条的颜色和粗细控制能力很强，配合 padding 属性还可以灵活控制装饰线和文字之间的距离，在行内元素情况下也可以实现多行下划线效果。

新属性 text-undeline-offset 属性亦可以控制文字和下划线之间的距离，但其兼容性不理想。

但是，text-decoration 属性可以轻松实现波浪线装饰线效果，这点 border 属性无法实现。

若要绘制宽度 100% 的波浪线效果，可以自定义 wavy 元素，然后应用如下代码：

```html
<style>
  wavy {
    display: block;
    height: .5em;
    white-space: nowrap;
    letter-spacing: 100vw;
    padding-top: .5em;
    overflow: hidden;
  }

  wavy::before {
    content: "\2000\2000";
    text-decoration: overline wavy;
  }
</style>

<wavy></wavy>
```

使用伪元素生成两个空格，声明 letter-spacing: 100vw 控制两个空格间距占据整个屏幕宽度，最终实现宽度 100% 自适应的波浪线效果。

与使用图片实现的波浪线相比，这里借助 text-decoration 属性实现的波浪线更加灵活，颜色可以通过 color 属性控制，大小可以通过 font-size 属性控制。

尽管 CSS 渐变亦能实现波浪线效果，但是其理解成本较高。

综上，波浪线效果的最佳实现方式就是使用 text-decoration 属性。

---

## text-underline-position: under 声明

tex-underline-position 属性可以设置下划线的位置。

默认情况下，属性 text-decoration: underline 的下划线会渲染在基线位置附近，会与 g q 等字母下方发生重叠，亦会与中文字体，尤其字重偏下的中文字体的下边缘发生重叠。

text-unline-position: under 声明专门用于解决上述问题。

```html
<style>
  p {
    text-decoration: underline;
  }

  .under {
    text-underline-position: under;
  }
</style>

<p class="under">下划线在基线下方位置渲染</p>
```

text-underline-position 属性支持的属性值

- left/right
  - 配合 writing-mode 属性让文字垂直排版，控制划线左右位置
- from-font
  - 表示优先使用字体文件中设置的下划线
  - 若字体没有设置下划线对齐信息，就使用 auto 效果

---

## text-underline-offset 属性

text-underline-offset 属性可以用来设置下划线的位置，其偏移量**属性值支持数值和百分比值**。

```html
<style>
  p {
    text-decoration: underline;
  }

  /* 设置下划线从原先位置向下偏移 1em */
  .offset {
    text-underline-offset: 1em;
  }
</style>

<p class="offset">注意下划线的位置</p>
```

百分比值相对于 1em。text-underline-offset: 100% 效果等同于 text-underline-offset: 1em。

text-underline-offset 支持负值，会使下划线从原先位置向上偏移。

text-underline-offset **属性只对本元素下划线类型的装饰线有效，对删除线和上划线都无效**。
