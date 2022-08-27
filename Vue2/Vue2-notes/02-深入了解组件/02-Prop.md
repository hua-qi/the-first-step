# Prop

## 目录

- [Prop](#prop)
  - [目录](#目录)
  - [camelCase vs kebab-case](#camelcase-vs-kebab-case)
  - [Prop 类型](#prop-类型)
  - [传递静态或动态 Prop](#传递静态或动态-prop)
    - [传入一个数字](#传入一个数字)
    - [传入一个布尔值](#传入一个布尔值)
    - [传入一个数组](#传入一个数组)
    - [传入一个对象](#传入一个对象)
    - [传入一个对象的所有 property](#传入一个对象的所有-property)
  - [单项数据流](#单项数据流)
  - [Prop 验证](#prop-验证)
    - [类型检查](#类型检查)
  - [非 Prop 的 Attribute](#非-prop-的-attribute)
    - [替换/合并已有的 Attribute](#替换合并已有的-attribute)
    - [禁用 Attribute 继承](#禁用-attribute-继承)

## camelCase vs kebab-case

HTML 中的 attribute 名大小写不敏感，浏览器会将所有大写字符解释为小写字符。

当在 DOM 中的模板中使用 camelCase（驼峰命名法）的 prop 名时，需要使用其等价的 kebab-case（短横线分割命名）命名。

当使用字符串模板时，该限制不存在。

```html
<script>
Vue.component('blog-post', {
    // 在 JavaScript 中是 camelCase 命名
    props: ['postTitle'],
    template: '<h3>{{ postTitle }}</h3>'
})
</script>
 
<!-- 在 HTML 中为 kebab-case 命名 -->
<blog-post post-title="hello!"></blog-post>
```

---

## Prop 类型

若希望每个 prop 都有指定的值类型。

这时可以以对象形式列出 prop：

```js
props: ["title", "likes", "isPublished", "commentIds", "author"];

props: {
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    contactsPromise: Promise // or any other constructor
}
```

---

## 传递静态或动态 Prop

- 可以直接给 prop 传入一个静态的值
- prop 可以通过 v-bind 动态赋值

```html
<blog-post title="My journey with Vue"></blog-post>

<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post
    v-bind:title="post.title + 'by' + post.author.name"
></blog-post>
```

### 传入一个数字

```html
<!-- 
    即便 '21' 是静态的，仍需要使用 v-bind  告知 Vue：
    这是一个 JavaScript 表达式而不是一个字符串
-->
<blog-post v-bind:likes="42"></blog-post>

<!-- 使用一个变量进行动态赋值 -->
<blog-post v-bind:likes="post.likes"></blog-post>
```

### 传入一个布尔值

```html
<!-- 包含该 prop 没有值的情况在内，都意味着 true -->
<blog-post is-published></blog-post>

<!-- 
    即便 false 是静态的，仍需要使用 v-bind 告知 Vue：
    这是一个 JavaScript 表达式而不是一个字符串
-->
<blog-post v-bind:is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值 -->
<blog-post v-bind:is-published="post.isPublished"></blog-post>
```

### 传入一个数组

```html
<!-- 即便是静态数组，仍需要使用 v-bind 告知 Vue：
    这是一个 JavaScript 表达式而不是一个字符串
-->
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>

<!-- 使用变量进行动态赋值 -->
<blog-post v-bind:comment-ids="post.commentIds"></blog-post>
```

### 传入一个对象

```html
<!-- 即便是静态对象，仍需要使用 v-bind 告知 Vue：
    这是一个 JavaScript 表达式而不是一个字符串
-->
<blog-post
    v-bind:author="{
        name: 'Veronica',
        company: 'Veridian Dynamics'
    }"
></blog-post>

<!-- 使用一个变量进行动态赋值 -->
<blog-post v-bind:author="post.author"></blog-post>
```

### 传入一个对象的所有 property

若要将一个对象的所有 property 都作为 prop 传入，可以使用不带参数的 v-bind（取代 v-bind: prop-name）：

```html
<script>
    post: {
        id: 1,
        title: 'My Journey with Vue'
    }
</script>

<blog-post v-bind="post"></blog-post>

<!-- 等价于 -->
<blog-post
    v-bind:id="post.id"
    v-bind:title="post.title"
></blog-post>
```

## 单项数据流

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。

这样可以防止从子组件意外变更父级组件的状态，从而导致应用的数据流向难以理解。

每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。意味着**不应该**在一个子组件内部改变 prop。

两种常见的视图变更一个 prop 的情形：

1.这个 prop 用于传递一个初始值；子组件接下来希望将其作为一个本地的 prop 数据来使用。

上述情况中，最好定义个本地的 data property 并将这个 propp 用作其初始值：

```javascript
props: ["initialCounter"],
data: function () {
    return {
        counter: this.initialCounter
    }
}
```

2.这个 prop 以一种原始的值传入且需要进行转换。

上述情况中，最好使用该 prop 的值来定义一个计算属性：

```js
props: ["size"],
computed: {
    normalizedSize: function () {
        return this.size.trim().toLowerCase();
    }
}
```

**注**：在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身**将会**影响到父组件的状态。

---

## Prop 验证

可以为组件的 prop 指定验证要求。

为定制 prop 的验证方式，可以为 props 中的值提供一个带有验证需求的对象，而不是一个字符串数组。

```js
Vue.component("my-component", {
    props: {
        // 基础的类型检查（null 和 undefined 会通过任何类型验证）
        propA: Number,
        // 多个可能的类型
        propB: [String, Number],
        // 必填的字符串
        propC: {
            type: String,
            required: true
        },
        // 带有默认值的数字
        propD: {
            type: Number,
            default: 100
        },
        // 带有默认值的对象
        propE: {
            type: Object,
            // 对象或数组默认值必须从一个工厂函数中获取
            default: function () {
                return {
                    message: "hello"
                }
            }
        },
        // 自定义验证函数
        propF: {
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['success', 'warning', 'danger'].includes(value)
            }
        }
    }
})
```

当 prop 验证失败时，（开发环境构建版本的）Vue 将会产生一个控制台的警告。

**注**：prop 会在一个组件实例创建**之前**进行验证，所以实例的 property（如 data、computed 等）在 default 或 validator 函数中是不可用的。

### 类型检查

type 可以是下列原生构造函数中的一个：

- String
- Number
- Boolean
- Array
- Object
- Data
- Function
- Symbol

type 还可以是一个自定义的构造函数，并通过 instanceof 来进行检查确认。

```js
function Person (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

// 验证 author prop 的值是否是通过 new Person 创建
Vue.component('blog-post', {
    props: {
        author: Person
    }
})
```

## 非 Prop 的 Attribute

一个非 prop 的 attribute 指传向一个组件，但是该组件并没有相应 prop 定义的 attribute。

显示定义的 prop 适用于向一个子组件传入信息，然而组件库的作者并不总能预见组件会被用于怎样的场景。

考虑到上述情况，Vue 组件可以接受任意的 attribute，而这些 attribute 会被添加到这个组件的根元素上。

### 替换/合并已有的 Attribute

对于大多数 attribut 来说，从外部提供给组件的值会替换掉组件内部设置好的值。

所以，若向组件传入 type="text"，就会替换掉组件内部已定义的 type="date"，并将其破坏。

class 和 style attribute 会将组件的 attribute 和其内部预定义的值进行合并。

### 禁用 Attribute 继承

若**不希望**组件的根元素集成 attribute，可以在组件的选项对象中设置 inheritAttrs: false。

尤其适合配合实例的 $attrs property 使用，该 property 包含了传递给一个组件的 attribute 名和 attribute 值。

使用 inheritAttrs: false 和 $attrs，可以手动决定这些 attribute 会被赋予那些元素。

```js
Vue.component("base-input", {
    inheritAttrs: false,
    props: ["label", "value"],
    template: `
        <label>
            {{ label }}
            <input
                v-bind="$attrs"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
            >
        </label>
    `
})
```

**注**：inheritAttrs: false 选项**不会**影响 style 和 class 的绑定。

该模式允许你在使用基础组件的时候更像是使用原始的 HTML 元素，而不用担心那个元素是真正的根元素：

```html
<base-input
    label="Username:"
    v-model="username"
    required
    placeholder="Enter your username"
></base-input>
```
