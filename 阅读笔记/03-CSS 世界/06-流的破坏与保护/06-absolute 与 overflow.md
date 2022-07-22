# absolute 与 overflow

## oveflow: hidden 与子级绝对定位元素的剪裁规则

绝对定位元素不总是被父级 overflow 属性剪裁，尤其当 overflow 再绝对定位元素及其包含块之间时。

```html
<!-- 
    两种情况，overflow: hidden 均处于绝对定位元素与其包含块之间，所以不会被裁剪
-->
<div style="overflow: hidden;">
    <img src="1.jpg" style="position: absolute" />
</div>

<div style="position: relative;">
    <div style="overflow: hidden;">
        <img src="1.jpg" style="position: absolute;"/>
    </div>
</div>

<!-- overflow 作为绝对定位元素的包含块声明属性，所以 img 元素被裁剪 -->
<div style="overflow: hidden; position: relative;">
    <img src="1.jpg" style="position: absolute;">
</div>

<!-- 绝对定位元素的包含块作为声明 overflow: hidden 子元素，故而 img 元素被剪裁 -->
<div style="overflow: hidden;">
    <div style="position: relative;">
        <img src="1.jpg" style="position: absolute;"/>
    </div>
</div>
```

---

## overflow: auto/srcoll 与子级绝对定位元素的特殊表现

如果绝对定位元素的父元素的 overflow 属性值是 auto/srcoll，即使绝对定位元素宽高数值都大于其父级元素，也不会出现滚动条。

```html
<!-- 此时 .box 元素并不出现滚动条 -->
<style>
    .box {
        width: 300px;
        height: 100px;
        background-color: #f0f3f9;
        overflow: auto;
    }

    .box > img {
        width: 256px;
        height: 192px;
        position: absolute;
    }
</style>

<div class="box">
    <img src="1.jpg">
</div>
```

由上述特性中，若为 \<img> 元素添加一个超过容器的宽高的兄弟元素，此时 \<img> 相对于容器表现类似为 position: fixed，当拖动容器滚动条时 \<img> 元素位置不变。

**注**，由于声明 position: fixed 的元素其包含块为根元素，因此，除非是窗口滚动，否则上述讨论的所有 overflow 剪裁规则对固定定位都不适用。

---

## transform 对 overflow 剪裁绝对定位元素的影响

- 绝对定位元素父级元素同时声明 overflow、transform
  - Firefox、Safari 剪裁
  - Chrome、Opera 不剪裁
- overflow 子元素声明 transform
  - Firefox、Safari 剪裁
  - Chrome、Opera 剪裁

transform 对层叠上下文以及 position: fixed 的渲染也有影响。
