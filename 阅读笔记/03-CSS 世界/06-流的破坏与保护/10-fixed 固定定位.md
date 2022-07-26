# position: fixed 固定定位

普通元素声明 overflow: hidden 无法剪裁固定定位元素。

## 目录

- [position: fixed 固定定位](#position-fixed-固定定位)
  - [目录](#目录)
  - [position: fixed 不一样的包含块](#position-fixed-不一样的包含块)
    - [无依赖固定定位](#无依赖固定定位)
  - [position: fixed 的 absolute 模拟](#position-fixed-的-absolute-模拟)
  - [position: fixed 与背景锁定](#position-fixed-与背景锁定)

## position: fixed 不一样的包含块

position: fixed 固定定位元素的包含块是根元素，可以近似看作是 \<html> 元素。

由于上述原因，元素若声明 relative 亦对固定定位元素没有任何限制作用。

### 无依赖固定定位

无依赖固定定位与无依赖绝对定位相似。

利用元素声明 absolute/fixed 属性但没有声明 top/right/bottom/left 相对定位属性，可以将目标元素定位到指定位置

```html
<style>
    .father {
        width: 300px;
        height: 200px;
        position: relative;
    }

    .right {
        height: 0;
        text-align: right;
        overflow: hidden;
    }

    .son {
        display: inline;
        width: 40px;
        height: 40px;
        position: fixed;
        margin-left: -40px;
    }
</style>

<div class="father">
    <div class="right">
        &nbsp;<div class="son"></div>
    </div>
</div>
```

上述代码的渲染结果为，.son 元素被定位到 .father 元素的右上角。

---

## position: fixed 的 absolute 模拟

需求：元素既有不跟随滚动的固定定位效果，又能被定位元素限制和精准定位。

可以使用 position: absolute 进行模拟，原理：**页面的滚动使用普通元素替代**，此时滚动元素之外的其他元素相对来说就有固定定位的效果。

```html
<style>
    html,
    body {
        height: 100%;
        overflow: hidden;
    }

    .page {
        height: 100%;
        overflow: auto;
    }

    .fixed {
        position: absolute;
    }
</style>

<html>
    <body>
        <div class="page">固定定位元素</div>
        <div class="fixed"></div>
    </body>
</html>
```

上述代码中，整个网页的滚动条由 .page 元素产生，而非根元素，此时 .fixed 元素虽然是绝对定位，但是并不在滚动元素内部，自然不会跟随滚动，如果固定定位效果。同时其本身为绝对定位，因此可以使用 relative 进行限制或者使用 overflow 进行剪裁。

---

## position: fixed 与背景锁定

蒙层弹窗是网页中常见的交互，其中黑色半透明全屏覆盖的蒙层基本上都是通过声明 position: fixed 实现的。但此时**蒙层无法覆盖浏览器右侧的滚动栏，并且鼠标滚动时蒙层之下的内容依然可以被滚动，并没有被锁定**。

解决上述问题，一方面可以借鉴上述 absolute 模拟 fixed 定位的思路，让页面滚动条由内部普通元素产生。另一方面，则可以借助 JavaScript 实现锁定。

若是移动端项目，阻止 touchmove 事件的默认行为可以防止滚动。如果时桌面端项目，可以直接根元素声明 overflow: hidden。

在上述提到的桌面端中，由于 Windows 操作系统下的浏览器的滚动条都是占据一定宽度的，滚动条的消失会会导致页面的可用宽度发生变化，进而产生晃动，此时可以使用**与滚动条同等宽度的透明 border 进行替代**。

蒙层显示的同时，执行下述 JavaScript 代码：

```javascript
let widthBar = 17, 
        root = document.documentElement;
if (typeof window.innerWidth === "number") {
    widthBar = window.innerWidth - root.clientWidth;
}
root.style.overflow = 'hidden';
root.style.borderRight = `${widthBar}px solid transparent`;
```

蒙层隐藏时，执行下述 JavaScript 代码：

```javascript
const root = document.documentElement;
root.style.overflow = "";
root.style.borderRight = "";
```
