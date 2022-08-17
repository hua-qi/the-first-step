# text-decoration 属性全新升级

## 目录

- [text-decoration 属性全新升级](#text-decoration-属性全新升级)
  - [目录](#目录)
  - [text-decoration 属性现在是一种缩写](#text-decoration-属性现在是一种缩写)

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
