# 温和的 padding 属性

padding 指**盒子的内补间**。

所谓“温和”指使用 padding 进行页面开发的时候很少会出现意向不到的情况。

## 目录

- [温和的 padding 属性](#温和的-padding-属性)
  - [目录](#目录)
  - [padding 与元素的尺寸](#padding-与元素的尺寸)
    - [box-sizing: border-box 误区](#box-sizing-border-box-误区)
    - [内联元素的 padding 使用误区](#内联元素的-padding-使用误区)
    - [CSS 层叠属性探究](#css-层叠属性探究)
  - [padding 的百分比值](#padding-的百分比值)
    - [内联元素应用 padding 百分比值](#内联元素应用-padding-百分比值)
    - [空白内联元素应用 padding 百分比值](#空白内联元素应用-padding-百分比值)
  - [标签元素内置的 padding](#标签元素内置的-padding)
    - [ol/ul 列表元素内置 padding-left](#olul-列表元素内置-padding-left)
    - [很多表单元素都内置 padding](#很多表单元素都内置-padding)
    - [最难控制的 \<button> 的padding](#最难控制的-button-的padding)
  - [padding 与图形控制](#padding-与图形控制)

## padding 与元素的尺寸

CSS 默认 box-sizing: content-box，所以设置 padding 会增加元素的整体尺寸。

```css
.box {
    width: 80px;
    padding: 20px;
}
```

如果不考虑其他 CSS 干扰，此时 .box 元素所占据的宽度应该是 120px（80px + 120px x 2）。这并不符合现实世界的认知，为此很多人会设置 box-sizing: border-box;

作者并不推荐 *{ box-sizing: border-box; }，原因见 3.2.4 节。可以局部使用，尽量采用无宽度以及宽度分离准则实现才是好的解决之道。

### box-sizing: border-box 误区

很多人认为，如果设置 box-sizing: border-box; 那么 padding 就不会影响元素的尺寸，当然大多数情况下确实如此，但是，如果 padding 值足够大，那就另当别论了。

```css
.box {
    width: 80px;
    padding: 20px 60px;
    box-sizing: border-box;
}
```

此时 .box 元素的最终宽度为 120px（60px × 2），而元素内容则表现为**首选最小宽度**。

上述尺寸表现仅对于具有块状特性的元素有效，对于内联元素（不包括图片等替换元素）表现则有些许不同。

### 内联元素的 padding 使用误区

很多人有一个错误的认识：内联元素的 padding 只会影响水平方向，不会影响垂直方向。

这种认知是不准确的，内联元素的 padding 在垂直方向同样会影响布局，影响视觉表现。只是因为内联元素没有可视宽度和可视高度的说法（clientHeight 和 clientWidth 永远是0），垂直方向的行为表现完全受 line-height 和 vertical-align 的影响，视觉上并没有改变和上一行下一行内容的间距，因此，给人的感觉就会是垂直 padding 没有起作用。

若给内联元素添加背景色或边框，同时设置 padding，可以看到其尺寸空间确实受 padding 影响。

```css
a {
    padding: 50px;
    background-color: #cd0000;
}
```

[padding 对内联元素高度的影响](https://demo.cssworld.cn/4/2-1.php)

[padding 对内联元素高度的影响 - 备份](/demo/06-padding%20对内联元素高度的影响.html)

明显可以看到，尺寸虽有效，但是对上下元素的原本布局没有任何影响，仅仅是垂直方向发生了层叠。

### CSS 层叠属性探究

CSS 中还有很多其他场景会出现：**不影响其他元素布局而是出现层叠效果的现象**。但是这些层叠现象是有区别的。

- 纯视觉层叠，不影响外部尺寸
  - box-shadow
  - outline
- 影响外部尺寸
  - inline 元素的设置 padding 造成层叠
  - relative 元素的定位

区分两者的方式很简单，如果父容器声明 overflow: auto，当层叠区域超出父容器的时候，没有滚动条出现者，则属于纯视觉一类；反之，则属于影响外部尺寸者。

**对于非替换元素的内联元素，padding、margin、border 都不会加入行盒高度的计算，但实际上在内联盒周围进行了渲染。**

## padding 的百分比值

**padding 属性不支持负值**。

padding 所有方向的百分比值都是**相对于宽度计算**的。

利用该特性可以实现自适应的等比例矩形效果。

[百分比padding实现等比例头图](https://demo.cssworld.cn/4/2-3.php)

[百分比padding实现等比例头图 - 备份](demo/08-百分比padding实现等比例头图.html)

上述是块状特性元素应用 padding 百分比值产生的效果。

### 内联元素应用 padding 百分比值

- 同样相对于宽度计算
- 默认的高度和宽度细节有差异
- padding 会断行

[内联元素应用 padding 百分比](demo/09-内联元素应用%20padding%20百分比.html)

由上述链接中，可以看到现象的诡异之处，而造成该现象的原因：对于内联元素，其 padding 是会断的，即 padding 区域跟随内联盒模型的行框盒子。

上述例子中，由于文字比较多，一行容纳不下，于是换行渲染，原本的 padding 区域也随着行框盒子换行，由于层叠，遮挡了一部分字。

### 空白内联元素应用 padding 百分比值

下述例子中，当仅为内联元素 span 设置 padding: 50% 时，其渲染结果并不是正方形，而是一个高度大于宽度的长方形。

究其原因是内联元素的垂直 padding 高度会将 strut（即幽灵空白节点）的高度计算再内。

而 strut 元素的高度即为该内联元素的 font-size 大小，因此只要将 font-size 设置为 0 即可。

[空白内联元素应用 padding 百分比值](/demo/10-空内联元素的%20padding%20百分比设置.html)

## 标签元素内置的 padding

### ol/ul 列表元素内置 padding-left

ol/ul 列表元素内置 padding-left，但是其单位为 em。

### 很多表单元素都内置 padding

- 所有浏览器中 \<input>、\<textarea> 输入框内置 padding
- 所有浏览器中 \<button> 按钮内置 padding
- 部分浏览器中 \<select> 下拉元素内置 padding
- 所有浏览器中 \<radio>、\<checkbox> **单复选框无内置** padidng

### 最难控制的 \<button> 的padding

由于 \<button> 元素在不同浏览器中表现的 padding 取值各不相同，故而很难做到兼容性。

可以使用 \<a> 元素模拟点击按钮，不推荐使用 \<button>。但是无法适应表单的交互。

作者推荐做法，使用 \<label> 元素代替 \<button> 元素，语义良好，行为保留。

```html
<style>
    button {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }

    label {
        display: inline-block;
        line-height: 20px;
        padding: 10px;
    }
</style>

<button id="btn"></button>
<label for="btn">按钮</label>
```

## padding 与图形控制

padding 属性和 background-clip 属性配置，可以在有限的元素下实现一些 CSS 图形绘制效果。

background-color: 默认渲染空间为 padding-box。

background-clip: content-box/padding-box/border-box/text（背景被裁剪为文字的前景色）
