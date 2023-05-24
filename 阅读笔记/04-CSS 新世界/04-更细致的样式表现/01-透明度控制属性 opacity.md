# 透明度控制属性 opacity

opacity 属性可以让元素表现为半透明，属性计算值范围是 0~1，初始值是 1.0，没有继承性。

在所有支持 CSS 过渡和动画的 CSS 属性中，opacity 属性的性能最高。

opacity 属性值不会为 1 的元素会创建一个层叠上下文，层叠顺序会变高。

## 目录

- [透明度控制属性 opacity](#透明度控制属性-opacity)
  - [目录](#目录)
  - [opacity 属性的叠加计算规则](#opacity-属性的叠加计算规则)
  - [opacity 属性的边界特性与应用](#opacity-属性的边界特性与应用)
    - [自动配色按钮](#自动配色按钮)

## opacity 属性的叠加计算规则

**由于 opacity 属性没有继承性**，因此父、子元素同时设置半透明时，半透明效果会叠加。

```css
.father {
    opacity: 0.5;
}

.son {
    opacity: 0.5;
}
```

此时，子元素 son 的视觉透明度为 0.5 * 0.5 === 0.25

CSS 中**半透明颜色和非透明颜色**的叠加算法如下:

>> r = (foreground.r * alpha) + (background.r * (1.0 - alpha));
>> g = (foreground.g * alpha) + (background.g * (1.0 - alpha));
>> b = (foreground.b * alpha) + (background.b * (1.0 - alpha));

---

## opacity 属性的边界特性与应用

opacity 属性设置的数值大小如果超过 0~1 的范围限制，最终的计算值是边界值。

```css
.example {
    opacity: -999;   /* 解析为 0，完全透明 */
    opacity: -1;    /* 解析为 0，完全透明 */
    opacity: 2;     /* 解析为 1，完全不透明 */    
    opacity: 999;   /* 解析为 1，完全不透明 */
}
```

RGBA 颜色或 HSLA 颜色中认知一个颜色通道数值都有边界特性

```css
.example {
    color: hsl(0, 0%, -100%); /* 解析为 hsl(0, 0%, 0%) 黑色 */
    color: hsl(0, 0%, 200%); /* 解析为 hsl(0, 0%, 100%) 白色 */
}
```

边界特性配合 CSS 变量可以在 CSS 中实现类似 if...else 的逻辑判断，可以用在**元素显隐或者色值变化**的场景。

---

### 自动配色按钮

借助透明度和颜色的边界特性可以如下效果：

如果按钮背景颜色比较浅，则按钮的文字颜色自动变成黑色，同时显示边框；

如果按钮的背景颜色比较深，则按钮的文字颜色自动变成白色。

```css
:root {
    /* 定义 RGB 变量 */
    --red: 44;
    --green: 135;
    --blue: 255;
    /* 
    亮度算法：
    lightness = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255
     */
    --lightness: calc((var(--red) * 0.2126 + var(--green) * 0.7152 + var(--blue) * 0.0722) / 255);
}

.button {
    /* 固定样式 */
    border: .2em solid;
    /* 背景颜色 */
    background: rgb(var(--red), var(--green), var(--blue));
    /* 文字颜色：只可能是黑色和白色 */
    color: hsl(0, 0%, calc((var(--lightness) - 0.5) * -999999%));
    /* 文字阴影，黑色文字才会出现 */
    text-shadow: 1px 1px rgba(calc(var(--red) + 50), calc(var(--green) + 50), calc(var(--blue) + 50), calc((var(--lightness) - 0.8) * 100));
    /* 边框样式 */
    border-color: rgba(calc(var(--red) - 50), calc(var(--green) - 50), calc(var(--blue) - 50), calc((var(--lightness) - 0.8) * 100));
}
```

此时 .button 按钮的文字颜色、文字阴影和边框颜色都是由 --red、--green, --blue 三个变量值决定，前景颜色，背景颜色和边框颜色均自动适配。

[按钮文字颜色随着背景颜色自动变化](https://demo.cssworld.cn/new/4/1-1.php)

[按钮文字颜色随着背景颜色自动变化-备份](./demo/01-按钮文字颜色随着背景颜色自动变化.html)
