# CSS Grids 布局

## 目录

- [CSS Grids 布局](#css-grids-布局)
  - [目录](#目录)
  - [简介](#简介)
  - [什么是 grid layout](#什么是-grid-layout)
  - [在 CSS 中创建 grid](#在-css-中创建-grid)
    - [fr 单位](#fr-单位)
    - [gap 使用](#gap-使用)
    - [repeat() 使用](#repeat-使用)
    - [隐式网格与显示网格](#隐式网格与显示网格)
    - [隐式网格设置宽/高](#隐式网格设置宽高)
    - [minmax() 函数使用](#minmax-函数使用)
    - [代码示例](#代码示例)
  - [如何在网格布局中排列元素](#如何在网格布局中排列元素)
    - [Line-based placement](#line-based-placement)
    - [Positioning with grid-template-areas](#positioning-with-grid-template-areas)
    - [Grid frameworks in CSS Grid](#grid-frameworks-in-css-grid)

## 简介

CSS Grid 布局是一个二维的网页布局体系，它会让内容以行和列的方式进行呈现。

## 什么是 grid layout

Grid 是水平线和垂直线的集合，它们创建了一个模式，我们可以根据这个模式排列 HTML 元素。

Grid 通常具有**列（columns）**、**行（rows）**以及处于每行或每列之间的**间隔（gaps）**，间隔（gaps）可以理解为**槽（gutters）**。

列（columns）和 行（rows）亦可以称之为 轨道（track）

图示：

![grid 图示](images/grid.png)

## 在 CSS 中创建 grid

### fr 单位

fr(fraction) 单位，只占用 available space 当 fr 与 固定单位（比如 px）一起使用时，只占用固定单位占用过的空间

### gap 使用

column-gap 与 row-gap 两项可只由 gap 表示，gap 单位只能是 固定单位 / 百分比，不能是 fr。

在最新的规范中，去除了 gap 前缀 grid-，用于更多的布局，不过为使代码更健壮，建议重复声明一次 grid-gap。

### repeat() 使用

使用 repeat() 函数，用于重复声明 grid 的 track

- repeat()
  - param01: number，重复 track 的次数
  - param02：track，可以是一个 或 多个
  - 示例
    - grid-template-rows: repeat(4, 1fr);
    - grid-template-columns: repeat(3, 1fr 2fr);

### 隐式网格与显示网格

implicit grid and explicit grid（隐式网格与显示网格）

显式网格即是我们声明的网格，比如上文我们声明的：
grid-template-columns，亦可以为 grdi-template-rows。

当我们设置了 grid-template-columns 时。当一行显式网格容纳不下 元素、内容时，此时这些元素、内容会按照 已声明的显示网格的方式在下一行，而新产生的一行与上一行就构成了一个纵向的网格，即是**隐式网格**。

grid-template-columns 对应 grid-auto-rows，反之亦然。

**注**：可以认为 显式网格与隐式网格共同组成一个区块。

### 隐式网格设置宽/高

可以通过 grid-auto-rows 或 grid-auto-columns 为隐式网格设置宽高

需要注意的是，当我们设定的区块容纳不下内容时，就会产生溢出，这显然不是我们想要遇到的事。

**注**：在 grid 布局中产生溢出会打乱整个布局。

为解决溢出问题，我们可以使用 minmax() 函数。

### minmax() 函数使用

可以使用 minmax() 函数为轨道（track）设置体积的**最小值和最大值**

### 代码示例

[代码示例 - JS Bin](https://jsbin.com/ricobos/edit?html,output)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>CSS Grid starting point</title>
    <style>
      body {
        width: 90%;
        max-width: 900px;
        margin: 2em auto;
        font: 0.9em/1.2 Arial, Helvetica, sans-serif;
      }

      .container {
        display: grid;
        /*
        step-01
        grid-template-columns: 1fr 1fr 2fr; */

        /* 
        step-02
        fr 单位使用        
        当下例子即：available = body.width - 100px
        */
        /* grid-template-columns: 1fr 2fr 100px; */
        /*
        step-03
        gap 使用
         */
        gap: 20px;
        grid-gap: 20px;

        /*
        step-04
        repeat() 函数使用
         */
        /* grid-template-columns: repeat(3, 1fr); */
        /*
        repeat() 与 minmax() 组合使用
        repeat 函数的第一个参数由固定值改为 auto-fill
        以构成适应性布局  
         */
         grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))

        /* 
        step-05
        隐式网格设置宽/高
        grid-auto-rows: 100px;
         */

         /* 
         step-06
         minmax() 函数使用
         下列代码会使区块的最小高度为100px, 最大高度无限
          */
          grid-auto-rows: minmax(100px, auto)

      }

      .container > div {
        border-radius: 5px;
        padding: 10px;
        background-color: rgb(207, 232, 220);
        border: 2px solid rgb(79, 185, 227);
      }
    </style>
  </head>

  <body>
    <h1>Simple grid example</h1>

    <div class="container">
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
      <div>Four</div>
      <div>Five</div>
      <div>Six</div>
      <div>Seven</div>
    </div>
  </body>
</html>

```

## 如何在网格布局中排列元素

模板代码：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>CSS Grid - line-based placement starting point</title>
    <style>
      body {
        width: 90%;
        max-width: 900px;
        margin: 2em auto;
        font: 0.9em/1.2 Arial, Helvetica, sans-serif;
      }

      .container {
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-gap: 20px;
      }

      header,
      footer {
        border-radius: 5px;
        padding: 10px;
        background-color: rgb(207, 232, 220);
        border: 2px solid rgb(79, 185, 227);
      }

      aside {
        border-right: 1px solid #999;
      }

    </style>
  </head>

  <body>
    <div class="container">
      <header>This is my lovely blog</header>
      <article>
        <h1>My article</h1>
        <p>
          Duis felis orci, pulvinar id metus ut, rutrum luctus orci. Cras
          porttitor imperdiet nunc, at ultricies tellus laoreet sit amet. Sed
          auctor cursus massa at porta. Integer ligula ipsum, tristique sit amet
          orci vel, viverra egestas ligula. Curabitur vehicula tellus neque, ac
          ornare ex malesuada et. In vitae convallis lacus. Aliquam erat
          volutpat. Suspendisse ac imperdiet turpis. Aenean finibus sollicitudin
          eros pharetra congue. Duis ornare egestas augue ut luctus. Proin
          blandit quam nec lacus varius commodo et a urna. Ut id ornare felis,
          eget fermentum sapien.
        </p>

        <p>
          Nam vulputate diam nec tempor bibendum. Donec luctus augue eget
          malesuada ultrices. Phasellus turpis est, posuere sit amet dapibus ut,
          facilisis sed est. Nam id risus quis ante semper consectetur eget
          aliquam lorem. Vivamus tristique elit dolor, sed pretium metus
          suscipit vel. Mauris ultricies lectus sed lobortis finibus. Vivamus eu
          urna eget velit cursus viverra quis vestibulum sem. Aliquam tincidunt
          eget purus in interdum. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </p>
      </article>
      <aside>
        <h2>Other things</h2>
        <p>
          Nam vulputate diam nec tempor bibendum. Donec luctus augue eget
          malesuada ultrices. Phasellus turpis est, posuere sit amet dapibus ut,
          facilisis sed est.
        </p>
      </aside>
      <footer>Contact me@mysite.com</footer>
    </div>
  </body>
</html>

```

### Line-based placement

我们都知道网格是由各条**线**组成的。

在网格布局中，每条线都是由 1 开始计数。而从那个方向开始计数取决于**书写模式（writing mode）**，像我们的汉字从左往右进行书写，那么 column 1 就是由文档左侧开始，row 1 就是在文档顶部。

我们可以通过以下属性为元素设置在网格布局中所占区域

- grid-column-start
- grid-column-end
- grid-row-start
- grid-row-end

这些属性以数字（number）作为值，亦可以使用以下简略写法表示：

- grid-column
- grid-row

**注**：简略写法语法为 startNum / endNum，以 / 符号进行分割。

**注**：可以使用 -1 表示列或行的最后一条线，也可以使用负数表示从末端开始计数的线。并且也要知道线的计数总是依据显式网格的边界，而不是隐式网格的。

代码示例：

```css
/* 
可将该代码块添加到上文的模板中
运行并观察页面效果
也可以自己尝试更多
 */
    header {
      grid-column: 1 / 3;
      grid-row: 1;
    }
    article {
      grid-column: 2;
      grid-row: 2;
    }
    aside {
      grid-column: 1;
      grid-row: 2;
    }
    footer {
      grid-column: 1 / 3;
      grid-row: 3;
    }
```

[line-base placement - JS Bin](https://jsbin.com/yurekan/edit?html,output)

### Positioning with grid-template-areas

使用属性 grid-template-areas 是另外一种排列网格元素的方式。

示例代码：

```css
/* 
可将该代码块添加到上文的模板中（注意清除原有代码）
运行并观察页面效果
也可以自己尝试更多
 */
.container {
  display: grid;
  grid-template-areas:
      "header header"
      "sidebar content"
      "footer footer";
  grid-template-columns: 1fr 3fr;
  gap: 20px;
}

header {
  grid-area: header;
}

article {
  grid-area: content;
}

aside {
  grid-area: sidebar;
}

footer {
  grid-area: footer;
}
```

grid-template-areas 注意事项:

- 需要把所有网格都填满
- 当元素跨越多个网格时，重复声明这个元素名称
- 使用 . 表示一个网格为空
- 使用网格构成的区域必须是一个矩形，不能是一个 L 型区域
- 区域不能在不同的地点重复

### Grid frameworks in CSS Grid

Grid 框架通常基于 12 或 16-columns grids。

```css
/*
将以下代码添加至模板代码中
即将内容布局基于 12-columns grid 
 */
header {
  grid-column: 1 / 13;
  grid-row: 1;
}

article {
  grid-column: 4 / 13;
  grid-row: 2;
}

aside {
  grid-column: 1 / 4;
  grid-row: 2;
}

footer {
  grid-column: 1 / 13;
  grid-row: 3;
}
```

如果使用 Firefox Grid Inspector 检查文档你将会看到 12-columns grid 是如何工作的

![12-columns grid](images/12-columns%20grid.png)
