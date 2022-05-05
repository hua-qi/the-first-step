# 深入 props

## 目录

- [深入 props](#深入-props)
  - [目录](#目录)
  - [前言](#前言)
  - [理解 props](#理解-props)
  - [demo](#demo)
    - [props 在组件实例上是什么样子](#props-在组件实例上是什么样子)
  - [React 如何定义的 props](#react-如何定义的-props)
    - [props 在 React 组件层级中充当的角色](#props-在-react-组件层级中充当的角色)
    - [props 在 React 更新机制中充当的角色](#props-在-react-更新机制中充当的角色)
    - [props 在 React 插槽层面充当的角色](#props-在-react-插槽层面充当的角色)
  - [监听 props 改变](#监听-props-改变)
    - [类组件](#类组件)
    - [函数组件](#函数组件)
  - [props children 模式](#props-children-模式)
    - [props 插槽组件](#props-插槽组件)
    - [render props 模式](#render-props-模式)
    - [混合模式](#混合模式)
  - [操作 props 小技巧](#操作-props-小技巧)
    - [抽象 props](#抽象-props)
      - [混入 props](#混入-props)
      - [抽离 props](#抽离-props)
    - [注入 props](#注入-props)
      - [显式注入 props](#显式注入-props)
      - [隐式注入 props](#隐式注入-props)

## 前言

从 React 的组件设计思想出发，组件的作用是什么？

1. 可以作为渲染 UI 视图的容器
2. 组件作为 React 的零件，需要处理组件之间的联系，而 props 即是作为组件之间联系的桥梁

## 理解 props

对于 React 应用的组件，无论是函数组件 FunComponent，还是类组件 ClassComponent，父组件绑定在它们标签中的属性、方法，最终会变成 props 传递给组件。

**注**：对于一些特殊的属性，比如 ref/key，React 会在底层做一些额外的处理

## demo

```javascript
// children
function ChildrenComponent() {
    return <div>In this chapter, let`s learn about react props!</div>
}

// props 接受处理
class PropsComponent extends React.Component {
    componentDidMount() {
        console.log(this, "_this");
    };

    render() {
        // 解构获取参数
        const { children, mes, renderName, say, Component } = this.props;

        const [renderFunction, renderComponent]= children;

        // 对于子组件，不同的 props 应怎么被处理
        return <div>
            { renderFunction() }
            { mes }
            { renderName() }
            { renderComponent() }
            <Component />
            <button onClick={ () => say() }> change content</button>
        </div>
    }
}

// props 定义绑定
class Index extends React.Component {
    state={
        mes: "hello, React"
    };
    node = null;
    say = () => this.setState({ mes: "let us learn React!" });

    render() {
        return <div>
            <PropsComponent
                mes={ this.state.mes }                              // ① props 作为一个渲染数据源
                say={ this.say }                                    // ② props 作为一个回调函数
                Component={ ChildrenComponent }                     // ③ props 作为一个组件
                renderName={ () => <div>my name is huaqi </div> }   // ④ props 作为渲染函数
            >
                { () => <div>hello, world</div> }                   {/*⑤ render props */}
                <ChildrenComponent />                               {/*⑥ render component */}
            </PropsComponent>
        </div>
    }
}
```

如上 demo 中 props 可以是什么？

1. props 作为一个子组件渲染数据源
2. props 作为一个通知父组件的回调函数
3. props 作为一个单纯的组件传递
4. props 作为渲染函数
5. render props，和 ④ 的区别是位于 children 属性中
6. render component 插槽组件

### props 在组件实例上是什么样子

PropsComponent 如果是一个类组件，可以通过 this.props 访问到 props

![demo-props](images/blog-notes/03-深入%20props.png)

## React 如何定义的 props

### props 在 React 组件层级中充当的角色

- 父组件可以通过 props 将数据传递给子组件去渲染消费
- 子组件可以通过 props 中的 callback，向父组件传递信息
- 可以将视图容器作为 props 进行渲染

### props 在 React 更新机制中充当的角色

在 React 中，props 在组件更新中充当了重要的角色，在 fiber 调和阶段，对 props 进行 diff 可以认为是 React 更新的驱动器。

在 React 中，无法直接检测出数据更新波及到的范围，props 可以作为组件是否更新的重要准则，**变化即更新**，于是有了 PureComponent、memo 等性能优化方案。

**注**：Vue 基于响应式（Vue2 使用对象的存取描述符 getter、setter 对数据的变化进行拦截、Vue3 使用 proxy 对数据的变化进行拦截），数据的变化，就会颗粒化到组件层级，通知其更新。

### props 在 React 插槽层面充当的角色

React 可以把组件闭合标签里的插槽，转换为 Children 属性。具体请看 [props chilren 模式](#props-children-模式)

## 监听 props 改变

### 类组件

componentWillReceiveProps 可以作为监听 props 的声明周期。（React V18 已废弃该生命周期）

**废弃原因**：该生命周期超越了 React 的可控制范围，可能因此多次执行等情况发生

推荐使用 getDerivedStateFromProps, \<slot>\</slot>

### 函数组件

函数组件可以使用 useEffect() 监听改变后的 props。

**注** useEffect 初始化会默认执行一次

```javascript
React.useEffect(() => {
    // props 中 number 改变，引起该副作用执行
    console.log(`props 改变：${ props.number }`);
},[ props.number ])
```

## props children 模式

props + chilren 模式在 React 及其生态中很常用，比如 react-router 的 Switch 和 Route、antd 中的 Form 和 FormItem。

### props 插槽组件

```javascript
<Container>
    <Children />
</Container>
```

上述 demo 中，在 Container 组件中，可以通过 props.children 访问到 Children 组件（React element 对象）

作用：

- 可以根据需要控制 Children 是否渲染
- Container 可以使用 React.cloneElement() 强化 props、混入新的 props 或是修改 Children 的子元素

### render props 模式

```javascript
<Container>
    { ContainerProps => <Children { ...ContainerProps } />}
</Container>
```

类似上述 Demo 情况中，props.children 属性访问到的是**函数**，并不是 React element，是不能直接渲染的，否则会报错

```javascript
// 这样的编码会报错呀
// Function are not valid as a React child.
function Container(props) {
    return props.children;
}

// 可以改写为如下编码
function Container(props) {
    const ContainerProps = {
        name: "huaqi",
        mes: "let us learn react"
    };

    return props.children(ContainerProps);
}
```

作用：

- 根据需要控制 Children 渲染与否
- 可以将需要通过 props 方式传递给 Children 的数据直接以函数参数的方式传递给执行函数 children

### 混合模式

```javascript
<Container>
    <Children />
    { ContainerProps => <Children { ...ContainerProps } name={ "huaya" } /> }
</Container>
```

如上述 demo，Container 的 Children 既有函数也有组件，这种情况如何处理？

需要先遍历 children，更具不同的 children 元素类型，做相应的操作

- 针对 element 节点，通过 cloneElement 混入 props
- 针对函数，直接传递参数，执行函数

```javascript
const Children = props => (
    <div>
        <div>hello, my name is { props.name }</div>
        <div>{ props.mes }</div>
    </div>
)

function Container(props) {
    const ContainerProps = {
        name: "huaqi",
        mes: "let us learn react"
    };

    return props.children.map(item => {
        if (React.isValidElement(item) {
            return React.cloneElement(item, { ...ContainerProps }, item.props.children);
        } else if (typeof item === "function") {
            return item(ContainerProps);
        } else {
            return null;
        })
    })
}

const Index = () => { 
    return <Container>
        <Children />
        { ContainerProps => <Children { ...ContainerProps } name={ "huaya" } /> }
    </Container>
}
```

## 操作 props 小技巧

### 抽象 props

抽象 props 一般用于跨层级传递 props，一般不需要具体指出 props 中某个属性，而是将 props 直接传入或是抽离到子组件

#### 混入 props

Father 组件一方面直接 Index 组件 indexProps 抽象传递给 Son，一方面混入 fatherProps。

```javascript
function Son(props) {
    console.log(props);
    return <div>hello, world</div>;
}

function Father(props) {
    const fatherProps = {
        mes: "let us learn React!";
    };
    return <Son { ...props } { ...fatherProps } />
}

function Index() {
    const indexProps = {
        name: "huaqi",
        age: "21",
    };

    return <Father { ... indexProps } />;
}
```

#### 抽离 props

如果想要从父组件 props 中抽离某个属性，再传递给子组件，应该如何做？

这个时候就需要用到神奇的**解构**了

```javascript
function Son(props) {
    console.log(props);
    return <div>hello, world</div>;
}

function Father(props) {
    const { age, ...fatherProps } = props;
    return <Son { ...fatherProps } />
}

function Index() {
    const indexProps = {
        name: "huaqi",
        age: "20",
        mes: "let us learn React!"
    }
    return <Father { ...indexProps } />
}
```

### 注入 props

#### 显式注入 props

显式注入 props，即是能够直观看见标签中绑定的 props。

```javascript
function Son(props) {
    console.log(props);
    return <div>hello, world</div>;
}

function Father(props) {
    return props.children;
}

function Index() {
    return <Father>
        {/* 向 Son 组件绑定的 name 和 age 是能够被直观看到的 */}
        <Son name="huaqi" age="20" />
    </Father>
}
```

#### 隐式注入 props

一般通过 React.cloneElement 对 props.children 克隆再混入新的 props

```javascript
function Son(props) {
    console.log(props);
    return <div>hello, world</div>
}

function Father(props) {
    return React.cloneElement(prop.children, { mes: "let us learn React! " });
}

function Index() {
    return <Father>
        <Son name="huaqi" age="20" />
    </Father>
}
```
