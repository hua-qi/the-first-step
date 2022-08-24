# Class 与 Style 绑定

由于 class 列表和内联央视都属于 attribute，所以可以用 v-bind 指令进行处理，**只需要通过表达式计算出字符串结果即可**。

由于字符串拼接麻烦其易错，因此 Vue.js 在将 v-bind 用于 class 和 style 时，做了专门的增强，表达式结果的类型除了字符串之外，还可以是**对象和数组类型**。

## 目录

- [Class 与 Style 绑定](#class-与-style-绑定)
  - [目录](#目录)
  - [绑定 HTML Class](#绑定-html-class)
    - [对象语法](#对象语法)
    - [v-bind:class="{}" 内容的注意点](#v-bindclass-内容的注意点)
    - [数组语法](#数组语法)
    - [v-bind:class 与组件](#v-bindclass-与组件)
  - [绑定内联样式](#绑定内联样式)
    - [内联样式的对象语法](#内联样式的对象语法)
    - [内联样式数组语法](#内联样式数组语法)
    - [自动添加前缀](#自动添加前缀)
    - [多重值](#多重值)

## 绑定 HTML Class

### 对象语法

- 可以传递给 v-bind:class 一个对象，实现动态切换 class
  - 可以在对象中传入多个字段，实现动态切换多个 class
- v-bind:class 绑定对象可以与普通的 class attribute 共存
- v-bind:class 绑定的对象不必内联定义在模板中
- v-bind:class 亦可以绑定一个返回对象的**计算属性或方法**
  - [class 与方法绑定实践](00-demo/04-class%20与方法绑定实践.html)

代码示例：

```html
<!-- active 是否存在，取决于数据 property isActive 的 truthiness -->
<div v-bind:class="{ active: isActive }"></div>

<!-- ================================================================= -->

<!-- v-bind:class 指令与普通的 class attribute 共存 -->
<div
    class="static"
    v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>

<script>
    data: {
        isActive: true;
        hasError: false;
    }
</script>

<!-- 渲染结果 -->
<div class="static active"></div>

<!-- ================================================================= -->

<!-- v-bind:class 绑定的数据对象不必内联定义在模板中 -->
<div v-bind:class="classObject"></div>

<script>
    data: {
        classObject: {
            active: true,
            'text-danger': false
        }
    }
</script>

<!-- v-bind:class 亦可以绑定返回对象的计算属性或方法 注意方法也可以 -->
<div v-bind:class="classObject"></div>

<script>
    data: {
        isActive: true,
        error: null
    },
    computed: {
        classObject: function() {
            return {
                active: this.isActive && !this.error,
                'text-danger': this.error && this.error.type === 'fatal'
            }
        }
    }
</script>
```

### v-bind:class="{}" 内容的注意点

Vue2 官方文档中有如下代码：

```html
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
```

为什么 text-danger 被引号包裹呢？

因为 "" 中的代码会被 Vue 当作 JavaScript 对象处理，而 JavaScript 对象的键仅支持 String 和 Symbol 类型。

active 会被自动解析为 String 类型；

而 text-danger 由于存在字符 “-”，在 JavaScript 中作为**标识符**不合法，因此需要包裹引号，手动转变为 String 类型。

### 数组语法

- v-bind:class 可以绑定一个数组，以应用一个 class 列表
- 数组元素可以是一个三元表达式
- 数组元素亦可以是一个对象

```html
<!-- v-bind:class 绑定数组 -->
<div v-bind:class="[activeClass, errorClass]"></div>

<script>
    data: {
        activeClass: "active",
        errorClass: "text-danger"
    }
</script>

<!-- 渲染结果 -->
<div class="active text-danger"></div>

<!-- ===================================================== -->

<!-- 数组元素为三元表达式 -->
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

<!-- 数组元素为对象 -->
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

### v-bind:class 与组件

当自定义组件使用 class property 时，这些 class 将被添加到**该组件的根元素**上，该元素已经存在的 class 不会被覆盖。

```html
<script>
    // 注册 Vue 组件
    Vue.component("my-component", {
        template: '<p class="foo bar">Hi</p>'
    })
</script>

<!-- 组件添加 class -->
<my-component class="baz boo"></my-component>

<!-- HTML 的渲染结果 -->
<p class="foo bar baz boo">Hi</p>

<!-- ================================ -->

<!-- 组件亦可以绑定 class 对象 -->
<my-component v-bind:class="{ active: isActive }"></my-component>
```

---

## 绑定内联样式

### 内联样式的对象语法

v-bind:style 的对象语法作为一个 JavaScript 对象，与 CSS 样式书写格式很相似。但需要将短横线分割格式的 CSS 属性名更改为驼峰式属性名写法（font-size -> fontSzie）。

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<script>
data: {
    activeColor: 'red',
    fontSize: 30
}
</script>

<!-- 直接绑定样式对象 -->

<div v-bind:style="styleObject"></div>

<script>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
</script>
```

### 内联样式数组语法

v-bind:style 的数组语法可以将**多个样式对象**应用到同一个元素上：

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

### 自动添加前缀

当 v-bind:style 使用需要添加**浏览器引擎前缀**的 CSS property 时，会自动侦测并添加相应的前缀。

### 多重值

v-bind:style 绑定对象中的 CSS 属性可以提供一个包含多个值的数组，常用于**提供多个带前缀的值**：

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

上述代码**只会渲染最后一个被浏览器支持的值**。
