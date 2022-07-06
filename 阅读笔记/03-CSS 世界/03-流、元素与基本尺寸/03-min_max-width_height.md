# CSS min/max-width/height

min-width/max-width 和 min-height/max-height 拥有很多共性，比方说，它们都与尺寸相关，盒尺寸机制和一些值的渲染规则一样。因此，这部分内容不再赘述。

这里只阐述 min/max-width/height 和 width/height 不同的地方。

## 目录

- [CSS min/max-width/height](#css-minmax-widthheight)
  - [目录](#目录)
  - [为流体而生的 min-width/max-width](#为流体而生的-min-widthmax-width)
  - [与众不同的初始值](#与众不同的初始值)
  - [超越 !important，超越最大](#超越-important超越最大)
    - [超越 !important](#超越-important)
    - [超越最大](#超越最大)
  - [任意高度元素的展开收起动画技术](#任意高度元素的展开收起动画技术)

## 为流体而生的 min-width/max-width

在 CSS 世界中， min-width/max-width 出现的场景一定是在**自适应布局或流体布局**中。

为实现一种方案可以兼容大分辨率桌面显示器和笔记本，为此可以使用 min-width/max-width 实现**特定区间内的自适应布局**方案，网页宽度在 1200-1400px 自适应。

```css
.container {
    /* 无须设置 width */
    min-width: 1200px;
    max-width: 1400px;
}
```

在移动端中，为避免图片展示过大而影响用户体验，可以使用 max-width 进行限制。

```css
img {
    max-width: 100%;
    height: auto!important;
}
```

上述代码中，必须设置 height: auto!important; 可以确保图片宽度不超出的同时确保其保持原比例， 否则，若原始图片有设定 height，当 max-width 生效时，图片就会被水平压缩。

上述方式会有体验上的问题：在加载图片时其占据高度会从 0 变成计算高度，图文会有明显的瀑布式下落。

## 与众不同的初始值

由前文得知，width/height 的默认值为 auto。

min-width/max-width 和 min-height/max-height 的初始值就要复杂些，具体分为 max-\* 和 min-\* 两个系列。

- max-width 和 max-height 的初始值为 none
- min-width 和 min-height 的初始值为 auto

## 超越 !important，超越最大

CSS 世界中，min-width/max-width 和 min-height/max-height 属性间，以及 width 和 height 之间有一套相互覆盖的规则。这套规则可以概括为：超越 !important，超越最大。

### 超越 !important

超越 !important 指的是 max-width 会覆盖 width，且是超级覆盖。

众所周知，CSS 世界中的 !important 的权重相当高，比直接在元素的 style 属性中设置 CSS 声明还要高，一般用在 CSS 覆盖 JS 设置上。但是 max-width 会覆盖 !important。

[max-width 覆盖 width 实例页面](https://demo.cssworld.cn/3/3-1.php)

[max-width 覆盖 width 实例页面 - 备份](./demo/05-max-width%20覆盖%20width%20实例.html)

```html
<style>
      img {
        max-width: 256px;
      }
    </style>
  </head>
  <body>
    <img
      src="../images/00-水的特性.png"
      alt="水的示意图片"
      style="width: 480px !important"
    />
  </body>
```

上述代码中，最终结果的图片的宽度为 256px。

### 超越最大

超越最大指的是 min-width 会覆盖 max-width，此规则会在 min-width 和 max-width 冲突时生效。

```css
.container {
    min-width: 1400px;
    max-width: 1200px;
}
```

由上述代码，最小宽度大于最大宽度，遵循“超越最大”规则（注意不是“后来居上”规则），最终 max-width 被忽略，.container 元素表现为至少宽 1400px。

## 任意高度元素的展开收起动画技术

“展开收起”效果是网页中比较常见的一种交互形式，通常的做法是控制 display 属性值在 none 和其他值之间切换，但此方式的效果略显生硬，所以会有以下的需求：

希望元素展开收起时能有明显的高度滑动效果。

传统实现可以使用 jQuery 的 slideUp() / slideDown() 方法，但是在移动端，因为 CSS3 动画支持良好，其 JS 框架没有动画模块。此时，使用 CSS 实现动画就成了最佳的技术选型。

可以使用 height + overflow: hidden 实现，但是，很多时候，元素的高度都是不固定的。而且 height 默认值为 auto，由于 auto 为一个关键字，从 0px 到 auto 是无法计算的，因此无法形成过渡或动画效果。

```css
.element {
    height: 0;
    overflow: hidden;
    transition: height .25s;
}

.element.active {
    height: auto; /* 没有 transition 效果，只是生硬的展开 */
}

/* ================================= */

.element {
    max-height: 0;
    overflow: hidden;
    transition: max-height .25s;
}

.element.active {
    max-height: 666px; /* 一个足够大的最大高度值 */
}
```

对于展开后的 max-height 值，需要确保比实际展开内容的高度值大，因为 max-height 值比 height 计算值大的时候，元素的高度就是其 height 属性的计算值。

[max-height 与任意高度元素滑动展开收起效果实例](https://demo.cssworld.cn/3/3-2.php)

[max-height 与任意高度元素滑动展开收起效果实例 - 备份](./demo/06-max-height%20与任意高度元素滑动.html)

**tips**：虽然对于上述的方法来说，max-height 值越大适用的场景越多，但是如果 max-height 值太大，在收起的时候可能会有“效果延迟”的问题。

在收起时，若已展开的元素的高度值是 100px，而 max-height 是 1000px，动画时间为 250ms, 假设动画函数是线性的，则前 225ms 中是看不到收起效果的，因为 max-height 从 1000px -> 100px 变化的这段时间，元素不会有区域被隐藏，会给人动画延迟 225ms 的感觉。
