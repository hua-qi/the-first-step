# vertical-align

凡是 line-height 起作用的地方 vertical-align 也一定起作用。

## 目录

- [vertical-align](#vertical-align)
  - [目录](#目录)
  - [vertical-align 家族基本认识](#vertical-align-家族基本认识)
  - [vertical-align 作用的前提](#vertical-align-作用的前提)
    - [vertical-align 未起作用的原因](#vertical-align-未起作用的原因)
  - [vertical-align 和 line-height 之间的关系](#vertical-align-和-line-height-之间的关系)
    - [容器元素内图片底部留有间隙](#容器元素内图片底部留有间隙)
  - [深入理解 vertical-align 线性类属性值](#深入理解-vertical-align-线性类属性值)
    - [inline-block 与 baseline](#inline-block-与-baseline)
    - [了解 vertical-align: top/bottom](#了解-vertical-align-topbottom)
    - [vertical-align: middle 与近似垂直居中](#vertical-align-middle-与近似垂直居中)
  - [理解 vertical-align 文本类属性值](#理解-vertical-align-文本类属性值)
  - [了解 vertical-align 上标下标类属性值](#了解-vertical-align-上标下标类属性值)
  - [无处不在的 vertical-align](#无处不在的-vertical-align)
  - [基于 vertical-align 属性的水平垂直居中弹框](#基于-vertical-align-属性的水平垂直居中弹框)

## vertical-align 家族基本认识

vertical-align 四类属性值

- 线类
  - 如 baseline（默认值）、top、middle、bottom
- 文本类
  - 如 text-top、text-bottom
- 上标下标类
  - 如 sub、super
- 数值百分比类
  - 如 20px、2em、20%等
  - 行为表现一致
    - 根据计算值的不同，相对于基线向上或向下偏移
    - 负值，向下偏移
    - 正值，向上偏移

由于 vertical-align 的默认值是 baseline，即基线对齐，而基线的定义就是字母 x 的下边缘。因此，内联元素默认都是沿字母 x 的下边缘对齐。对于图片等替换元素，往往使用元素本身的下边缘作为基线。

vertical-align: baseline 等同于 vertical-align: 0

vertical-align 的数值属性值在实际开发时有以下好处：

- 兼容性非常好
- 可以精确控制内联元素的垂直对齐位置

在 CSS 世界中，百分比值的相对计算如下

- 相对于宽度计算
  - margin
  - padding
- 相对于 font-size 计算
  - line-height
- 相对于 line-height 计算
  - vertical-align

对于 vertical-align 来说更推荐使用具体的数值。

---

## vertical-align 作用的前提

vertical-align 只能应用于**内联元素**、display: table-cell 的元素

vertical-align 的属性只能作用在 display 计算值为 inline、inline-block、inline-table、table-cell 的元素上。

默认情况下，\<span>、\<strong>、\<em> 等内联元素，\<img>、\<button>、\<input> 等替换元素，非 HTML 规范的自定义元素，以及 \<td> 单元格，都支持 vertical-align 属性。

### vertical-align 未起作用的原因

其他 CSS 属性值改变了元素 display 属性的计算值

```css
.example {
    float: left; /* 元素块状化 */
    vertical-align: middle; /* 没有作用 */
}

.example {
    position: absolute; /* 元素块状化 */
    vertical-align: middle; /* 没有作用 */
}
```

行框盒子中的幽灵空白节点 strut 高度太小，vertical-align 参照值过小

```html
<style>
    .box {
        height: 128px;
        /* 
        line-height: 128px; 关键 CSS 属性
        此时图片垂直居中
        */
    }

    .box > img {
        height: 96px;
        vertical-align: middle;
    }
</style>

<div class="box">
    <img src="1.jpg">
</div>
```

table-cell 元素的 vertical-align 作用于自身

```html
<style>
    .cell {
        height: 128px;
        display: table-cell;
        vertical-align: middle;  /* 此时图片垂直居中 */
    }

    .cell > img {
        height: 96px;
        /* vertical-align: middle;  此时图片并未垂直居中 */
    }
</style>
```

table-cell 元素设置 vertical-align 垂直对齐的是子元素，但是其作用的并不是子元素，而是 table-cell 元素自身

---

## vertical-align 和 line-height 之间的关系

举个栗子

```html
<style>
    .box {
        line-height: 32px;
    }

    .box > span {
        font-size: 24px;
    }
</style>

<div class="box">
    x<span>文字x</span>
</div>
```

上述代码的渲染结果中，容器 .box 的高度并不是声明的 32px。关键原因在于子元素 \<span> 声明了 font-size 导致其与父元素 \<div> 的字体大小有出入。

![font-size 影响的容器最终高度呈现](images/03-font-size%20影响的容器最终高度呈现.png)

对字符而言，font-size 越大，其基线位置越往下，因为文字默认是基线对齐，**当行框盒子中两个字号不一致的文字在一起时，彼此之间就会发生上下位移**，如果相对位移距离足够大，就会超过行高的限制，进而撑搞行框盒子。

由此，解决上述问题可以**设置行框盒子前的幽灵空白节点 strut 与 \<span> 元素的字号一致**，或者改变字符的垂直对齐方式。

```css
/* 设置 strut 节点高度 */
.box {
    line-height: 32px;
    font-size: 24px; /* 与子元素 font-size 一致 */
}

.box > span {
    font-size: 24px;
}

/* 改变垂直对齐方式 */
.box {
    line-height: 32px;
}

.box > span {
    font-size: 24px;
    vertical-align: top;
}
```

### 容器元素内图片底部留有间隙

任意一个块级元素，其中若有图片，则块级元素高度基本都要比图片的高度高

```html
<style>
    .box {
        width: 280px;
        outline: 1px solid #aaa;
        text-align: center;
    }

    .box > img {
        height: 96px;
    }
</style>

<div class="box">
    <img src="1.jpg">
</div>
```

上述代码的渲染结果，.box 元素中的图片底部下有空白间隙。

原因：图片前方有一个幽灵空白节点 strut，当前 line-height 计算值是 20px，而 font-size 为 14px。由公式：间距 = line-height - font-size，strut 的基线与图片的基线相同，所以会在图片下方留有**半间距**空间。

如何解决上述问题

- 图片块状化
  - 清除幽灵空白节点
- 容器 line-height 足够小
  - 由上述公式，line-height 足够小则间距趋近于 0 或负
  - 半间距位于 strut 节点基线或者基线上方
- 容器 font-size 足够小
  - 前提 line-height 属性值与当前 font-size 相关
  - font-size 足够小
- 图片设置其他 vertical-align 属性值
  - 使图片不对于基线对齐

**注**，非主动触发位移的内联元素不可能处于计算容器的外面。

---

## 深入理解 vertical-align 线性类属性值

### inline-block 与 baseline

默认 vertical-align: baseline，在文本之类内联元素中取**字符 x 的下边缘作为基线**，在图片之类的替换元素中取**替换元素的下边缘作为基线**。

对于 display: inline-block 元素，如果**元素中没有内联元素**，或者 **overflow 值不是 visible**，则该元素的**基线是元素 margin box 底边缘**，否则元素基线取**最后一行内联子元素的基线**。

```html
<style>
    .dib-baseline {
        display: inline-block;
        width: 150px;
        height: 150px;
        border: 1px solid #cad5eb;
        background-color: #f0f3f9;
    }
</style>
<span class="dib-baseline"></span>
<span class="dib-baseline">x-baseline</span>
```

上述代码的运行结果如下图所示

![display: inline-block 的特殊表现](images/04-display_inline-block%20的特殊表现.png)

第一个 \<span> 元素中没有内联元素，因此**其基线就是 margin box 的下边缘**，第二个 \<span> 元素中有字符内容，因此**其基线就是这些字符的基线**，由于内联元素基于基线对齐，故而最终渲染如图所示。

当为第二个 \<span> 元素声明 line-height: 0 后，渲染结果如下图所示

![line-height: 0 的特殊效果](images/05-line-height_0%20的特殊效果.png)

根据间距公式，间距 = line-height - font-size，由于此时 line-height 为 0 ，那么间距为 -1em，由于上下间距等分，此时第二个元素的 x-baseline 对齐点就是当前字符的**垂直中心位置**，相对于之前的情况，该元素向下移动 line-height - 0.5em。

### 了解 vertical-align: top/bottom

vertical-align: top 垂直上边缘对齐。

- 内联元素
  - 元素底部和**当前行框盒子的顶部对齐**
- table-cell 元素
  - 元素底 padding 边缘和表格行的顶部对齐

vertical-align: bottom 垂直下边缘对齐。

- 内联元素
  - 元素底部和**当前行框盒子的底部对齐**
- table-cell 元素
  - 元素底 padding 边缘和表格行的底部对齐

### vertical-align: middle 与近似垂直居中

vertical-align: middle 定义

- 内联元素
  - 元素的的垂直中心点和**行框盒子基线向上 1/2 x-height 处对齐**
- table-cell 元素
  - 单元格填充盒子相对于外面的**表格行居中对齐**

vertical-align: middle 可以让内联元素的真正意义上的垂直中心位置和字符 x 的交叉点对齐。

---

## 理解 vertical-align 文本类属性值

文本类属性值指 text-top 和 text-bottom，定义如下

- vertical-align: text-top
  - 盒子顶部和**父级内容区域的顶部对齐**
- vertical-align: text-bottom
  - 盒子底部和**父级内容区域的底部对齐**

父级内容区域指在**父级元素当前 font-size 和 font-family 下应有的内容区域大小。**

![vertical-align: text-top 实例](images/06-vertical-align_text-top%20实例.png)

---

## 了解 vertical-align 上标下标类属性值

vertical-align 上标下标类属性值指 sub（下标） 和 super （上标）两个值。

HTML 中有类似的两个语义标签 \<sub>、\<sup>，\<sub> 默认 vertical-align: sub，常用在数学公式、化学表达式中； \<sup> 默认 vertical-align: supper，常用作标注。

- vertical-align: super
  - 提高盒子的基线到父级合适的上标基线位置
- vertical-align: sub
  - 降低盒子的基线到父级合适的下标基线位置

对于“合适”这样模棱两可的名词，不利于布局实现。

**注**：CSS 属性值 super/sub 并不会修改文字大小，而 HTML 标签 sup/sub 默认 font-size: smaller。

---

## 无处不在的 vertical-align

**对于内联元素，一定要考虑到幽灵空白节点 strut 以及无处不在的 vertical-align 属性**。

vertical-align 常用属性值分类

- top/bottom
  - 根据边缘以及行框盒子对齐
- baseline/middle
  - 根据字符 x 进行对齐

---

## 基于 vertical-align 属性的水平垂直居中弹框

[基于 vertical-align 属性的水平垂直居中弹框](https://demo.cssworld.cn/5/3-10.php)

[基于 vertical-align 属性的水平垂直居中弹框 - 备份](demo/04-水平垂直居中弹框.html)

核心代码

```html
<style>
  .container {
    /* 
    块级盒子声明 position: fixed/absolute 
    宽度和高度会自动填充容器
    */
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* 蒙层 */
    background: rgba(0, 0, 0, 0.5);
    /* 使内联内容水平居中呈现 */
    text-align: center;
    white-space: nowrap;
    z-index: 99;
  }

  .container::after {
    content: "";
    display: inline-block;
    /* 伪元素充当 strut，撑开 container 高度 */
    height: 100%;
    /* 使内容垂直居中对齐 */
    vertical-align: middle;
  }

  .dialog {
    display: inline-block;
    vertical-align: middle;
    border-radius: 6px;
    background-color: #fff;
    text-align: left;
    white-space: normal;
  }

  .content {
    width: 100px;
    height: 100px;
  }
</style>

<div class="container">
  <div class="dialog">
    <div class="content">内容占位</div>
  </div>
</div>
```

使用伪元素模仿“幽灵空白节点”创建一个和外部容器一样高的宽度为 0 的 inline-block 元素，注意 vertical-align: middle 的定义，元素的的垂直中心点和行框盒子基线向上 1/2 x-height 处对齐，伪元素声明 vertical-align: middle，由于其高度 100%，元素中线就是高度 50%，使 container 内容居中。
