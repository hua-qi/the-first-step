# 深入了解 CSS 逻辑属性

CSS 2.1 中，基于方向的属性定位，并不符合 CSS 世界基于“流”的底层设计理念。

## 目录

- [深入了解 CSS 逻辑属性](#深入了解-css-逻辑属性)
  - [目录](#目录)
  - [基于方向的属性定位](#基于方向的属性定位)
  - [CSS 逻辑属性有限的使用场景](#css-逻辑属性有限的使用场景)
    - [对称布局 - 适合使用 CSS 逻辑属性的场景](#对称布局---适合使用-css-逻辑属性的场景)
  - [inline/block 与 start/end 元素](#inlineblock-与-startend-元素)
  - [width/height 属性与 inline-size/block-size 逻辑属性](#widthheight-属性与-inline-sizeblock-size-逻辑属性)
  - [由 margin/padding/border 演变而来的逻辑属性](#由-marginpaddingborder-演变而来的逻辑属性)
  - [text-align 属性支持的逻辑属性值](#text-align-属性支持的逻辑属性值)
  - [最有用的 CSS 逻辑属性 inset](#最有用的-css-逻辑属性-inset)

## 基于方向的属性定位

```html
<style>
    button {
        /* margin-right 基于方向的 CSS 属性 */
        margin-right: 10px;
        
        /* direction: rtl; 若改变流的方向，并不是我们期待的渲染效果 */

        /* 基于流概念的逻辑属性 */
        margin-inline-end: 10px;
    }
</style>

<p>
    <button>确定</button>
    <button>取消</button>
</p>
```

![基于方向的属性定位](images/04-基于方向的属性定位.png)

![基于流的逻辑属性定位](images/05-基于流的逻辑属性定位.png)

margin-inline-end 表示**内联元素文档流结束的方向**。

当文档流的方向是从左往右的时候，margin-inline-end 属性的渲染表现就等同于 margin-right 属性。

当文档流的方向是从右往左的时候，margin-inline-end 属性的渲染表现就等同于 margin-left 属性。

---

## CSS 逻辑属性有限的使用场景

CSS 逻辑属性需要配合 writing-mode 属性、direction 属性或者 text-orientation 属性使用才有意义。

其他属性值也可以改变 DOM 元素的呈现方向，如 flex-direction 属性中的属性值 row-reverse 和 column-reverse，**但这些属性值和 CSS 逻辑属性之间没有任何关系**。

writing-mode、direction 和 text-orientation 属性都不是常用的 CSS 属性，这也就导致 CSS 逻辑属性的使用场景非常有限。

考虑到兼容性和理解成本，更多时候仍是使用 margin-right 属性。

### 对称布局 - 适合使用 CSS 逻辑属性的场景

微信对话的效果就是典型的对称布局。

使用 CSS 逻辑属性实现对称布局会有较好的体验，只需要使用 CSS 逻辑属性实现一侧的布局效果，然后另外一侧的布局效果只需要使用一句 direction: rtl 就完成了。

关键代码：

```html
<style>
    [data-self] {
        direction: rtl;
    }
</style>

<section>
    <!-- 其他 HTML，略...... -->
</section>
<section data-self>
    <!-- 自己对话内容，略...... -->
</section>
```

[逻辑属性与对称布局](https://demo.cssworld.cn/new/3/2-3.php)

[逻辑属性与对称布局 - 备份](demo/02-逻辑属性与对称布局.html)

---

## inline/block 与 start/end 元素

**所有 CSS 逻辑属性均围绕 inline/block 和 start/end 展开**。

以 margin 属性为例，在中文或英文网页环境下，默认情况下，margin 方位属性和逻辑属性相互的映射关系如下：

| 方位属性      | 逻辑属性            |
| :------------ | :------------------ |
| margin-left   | margin-inline-start |
| margin-right  | margin-inline-end   |
| margin-top    | margin-block-start  |
| margin-bottom | margin-block-end    |

其中，inline/block 表示方向，start/end 表示起止方位。

在声明 writing-mode: vertical-rl 环境下：

| 方位属性      | 逻辑属性            |
| :------------ | :------------------ |
| margin-left   | margin-block-end    |
| margin-right  | margin-block-start  |
| margin-top    | margin-inline-start |
| margin-bottom | margin-inline-end   |

---

## width/height 属性与 inline-size/block-size 逻辑属性

在中文或英文网页环境中，默认情况下，width 属性对应 CSS 逻辑属性 inline-size，height 属性对应 block-size。

width 属性新支持的几个关键字属性值也可以作为 inline-size 属性值。

```css
/* 浏览器支持 */
inline-size: fit-content;
inline-size: min-content;
inline-size: max-content;
```

min-width、max-width、min-height、max-height 亦有对应的逻辑属性：

| 尺寸相关属性 | 逻辑属性        |
| :----------- | :-------------- |
| width        | inline-size     |
| min-width    | min-inline-size |
| max-width    | max-inline-size |
| height       | block-size      |
| min-height   | min-block-size  |
| max-height   | max-block-size  |

---

## 由 margin/padding/border 演变而来的逻辑属性

- margin
  - margin-inline-start
  - margin-inline-end
  - margin-block-start
  - margin-block-end
- padding
  - padding-inine-start
  - padding-inline-end
  - padding-block-start
  - padding-block-end
- border
  - border-inline-start
  - border-inline-end
  - border-block-start
  - border-block-end
- border-color
  - border-inline-start-color
  - border-inline-end-color
  - border-block-start-color
  - border-block-end-color
- boder-style
  - border-inline-start-style
  - border-inline-end-style
  - border-block-start-style
  - border-block-end-style
- boder-width
  - border-inline-start-width
  - border-inline-end-width
  - border-block-start-width
  - border-block-end-width

上述 CSS 逻辑属性的缩写语法

| 缩写语法            | 对应语法                                           |
| :------------------ | :------------------------------------------------- |
| margin-inline       | margin-inline-start、margin-inline-end             |
| margin-block        | margin-block-start、margin-block-end               |
| padding-inline      | padding-inline-start、padding-inline-end           |
| padding-block       | padding-block-start、padding-block-end             |
| border-inline-color | border-inline-start-color、border-inline-end-color |
| border-inline-style | border-inline-start-style、border-inline-end-style |
| border-inline-width | border-inline-start-width、border-inline-end-width |

---

## text-align 属性支持的逻辑属性值

对于 text-align 属性，只有**属性值**进行了演变。

- text-align: start
- text-align: end

---

## 最有用的 CSS 逻辑属性 inset

定位时常用的 left、right、top、bottom 等属性，同样有对应的逻辑属性，全部都是以 inset 开头。

在中文或英文网页环境下，对应关系如下：

| 定位布局属性 | 逻辑属性           |
| :----------- | :----------------- |
| left         | inset-inline-start |
| right        | inset-inline-end   |
| top          | inset-block-start  |
| bottom       | inset-block-end    |

| 缩写属性     | 对应属性                             |
| :----------- | :----------------------------------- |
| inset-inline | inset-inline-start、inset-inline-end |
| inset-block  | inset-block-start、inset-block-end   |
| inset        | 所有方位属性                         |

**inset 不同数量属性值对应的方位和 margin、padding 等属性一致**。
