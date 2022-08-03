# CSS 数据类型

CSS 数据类型定义的是 **CSS 属性中具有代表性的值**，在规范的语法格式中，使用关键字外加一对尖括号表示（“<”、“>”）。

数值类型：\<number>

色值类型：\<color>

## 目录

- [CSS 数据类型](#css-数据类型)
  - [目录](#目录)
  - [为什么要关注 CSS 数据类型](#为什么要关注-css-数据类型)
  - [常见数据类型](#常见数据类型)
    - [shape-outside 属性值介绍](#shape-outside-属性值介绍)
    - [color 属性值介绍](#color-属性值介绍)

## 为什么要关注 CSS 数据类型

任何 CSS 属性值一定包含一个或多个数据类型。

通过记忆 CSS 属性值支持的数据类型，可以降低学习成本。

示例：

background-image 属性的语法结构：

> background-image: none | \<image>

上述语法中出现的 \<image> 就是一种数据类型，包含下述类型和函数：

- \<url>
- \<gradient>
- element()
- image()
- image-set()
- cross-fade()
- paint()

mask-image 属性的语法结构：

> mask-image: none | \<image> | \<mask-source>

上述语法中出现的 \<image> 与 background-image 中的 \<image> 一样。

---

## 常见数据类型

CSS 数据类型非常多，这里介绍几个常见的其值得一提的数据类型。

### shape-outside 属性值介绍

CSS Shapes 布局中 shape-outside 属性的语法结构：

> shape-outside: none | \<shape-box> | \<basic-shape> | \<image>

数据类型说明如下所示：

- \<shape-box>
  - \<box>
    - content-box
    - padding-box
    - border-box
  - margin-box
- \<basic-shape>
  - inset()
  - circle()
  - ellipse()
  - polygon()
  - path()
- \<image>
  - \<url>
  - \<gradient>
  - element()
  - image()
  - image-set()
  - cross-fade()
  - paint()

background-origin、background-clip 等属性，属性值属于 \<box> 数据类型。

clip-path、offset-path 等属性，属性值属于 \<basic-shape> 数据类型。

background-image、mask-image 等属性，属性值属于 \<image> 数据类型。

\<url> 数据类型，表示使用 url() 函数调用的图像资源。

\<gradient> 数据类型，表示渐变图像。

### color 属性值介绍

color 属性的语法结构：

- \<rgb()>
- \<rgba()>
- \<hsl()>
- \<hsla()>
- \<hex-color>
- \<named-color>
- cureentColor
- \<deprecated-system-color>

deprecated-system-color 指废弃的系统颜色。
