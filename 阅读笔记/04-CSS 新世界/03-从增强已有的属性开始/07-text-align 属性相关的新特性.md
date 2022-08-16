# text-align 属性相关的新特性

text-align 属性支持的常用属性值 left、right、center、justify，也支持逻辑属性值 start、end，除此之外，亦新增了多个属性值：

```css
text-align: match-parent;
text-align: justify-all;
text-align: <string>;
```

但新增的属性值兼容性不太好，因此不适合在生产环境中使用。

## 目录

- [text-align 属性相关的新特性](#text-align-属性相关的新特性)
  - [目录](#目录)
  - [match-parent 属性值](#match-parent-属性值)
  - [justify-all 属性值](#justify-all-属性值)
    - [text-justify 属性【延申】](#text-justify-属性延申)
  - [text-align 属性的字符对齐特性](#text-align-属性的字符对齐特性)

## match-parent 属性值

match-parent 属性值的视觉表现类似 inherit，由于 text-align 属性本身具有继承性，因此，match-parent 属性值是用于**改变“看不见”的对齐计算值**。

属性值对比理解：

```html
<style>
    section {
        direction: rtl;
        text-align: start;
    }

    #p2 {
        text-align: -webkit-match-parent;
        text-align: match-parent;
    }
</style>

<section>
    <p id="p1"></p>
</section>
<section>
    <p id="p2"></p>
</section>
```

上述代码的渲染结果中，p1 和 p2 元素的对齐表现一样，但是其计算值不一样：

```javascript
// p1 默认计算值为 start
console.log(getComputedStyle(p1).textAlign);
// p2 计算值为 right
console.log(getComputedStyle(p2).textAlign);
```

综上，声明 text-align: match-parent 的元素其计算值是**视觉上的 left 或 right**，哪怕继承自 start 这类逻辑属性值，这样有助于在 JavaScript 应用中知道元素对齐的视觉方位。

---

## justify-all 属性值

元素声明 text-align: justify-all，其文字表现为两端对齐，与 justify 属性值的区别在于 justify-all 属性值可以让最后一行也表现为两端对齐。

但用于该属性值的兼容性问题，因此目前若要实现最后一行两端对齐，可以使用 text-align-last 属性值：

```css
text-align-last: justify;
```

### text-justify 属性【延申】

在现代浏览器中，text-align: justify 使用的算法为：

- CJK 文本使用 letter-spacing 间隔算法；

- 非 CJK 文本使用 word-spacing 间隔算法

若希望非 CJK 文本也使用 letter-spacing 间隔算法，即每个字母彼此都拉开间隙，可以进行如下声：

```css
text-justify: inter-character;
```

## text-align 属性的字符对齐特性

在 CSS Text Module Level 4 规范中，text-align 属性新增了对字符属性值的支持。

该字符属性值必须是单个字符，否则会被忽略，同时只能作用在单元格中，让单元格基于这个指定的字符对齐。

字符可以和关键字属性值一起使用，若没有关键字属性值，字符会显示在右侧。
