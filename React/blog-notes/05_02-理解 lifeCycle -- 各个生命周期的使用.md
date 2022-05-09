# 理解 lifeCycle -- 各个生命周期的使用

React 在不同时期抛出不同的生命周期钩子。

## 目录

- [理解 lifeCycle -- 各个生命周期的使用](#理解-lifecycle----各个生命周期的使用)
  - [目录](#目录)
  - [1. constructor](#1-constructor)
  - [2. getDerivedStateFromProps](#2-getderivedstatefromprops)
  - [3. componentWillMount()、UNSAFE_componentWillMount()](#3-componentwillmountunsafe_componentwillmount)
  - [4. componentWillReceiveProps()、UNSAFE_componentWillReceiveProps()](#4-componentwillreceivepropsunsafe_componentwillreceiveprops)
    - [Q&A](#qa)
  - [5. componentWillUpdate、UNSAFE_componentWillUpdate](#5-componentwillupdateunsafe_componentwillupdate)
  - [6. render()](#6-render)
  - [7. getSnapshotBeforeUpdate()](#7-getsnapshotbeforeupdate)
  - [8. componentDidUpdate()](#8-componentdidupdate)
  - [9. componentDidMount()](#9-componentdidmount)
  - [10. shouldComponentUpdate()](#10-shouldcomponentupdate)
  - [11. componentWillUnmount()](#11-componentwillunmount)

## 1. constructor

constructor 在类组件创建实例时调用，在初始化的时候执行一次，所以可以在 constructor 中做一些初始化的工作。

```javascript
constructor(props) {
    // 执行 super()，方便再接下来的上下文中获取 props
    super(props);
    // 用于初始化  state
    this.state = {
        name: "alien"
    }
    // 绑定 this
    this.handleClick = this.handleClick.bind(this);
    // 绑定防抖函数
    this.handleInputChange = debounce(this.handleInputChange, 500);
    const _render = this.render;
    this.render = function() {
        // 劫持修改类组件上的一些生命周期
        return _render.bind(this);
    }
}
handleClick(){}
handleInputChange(){}
```

constructor 作用:

- 初始化 state，可以用来截取路由中的参数，赋值给 state
- 对类组件的事件做一些处理，比如绑定 this、节流、防抖等
- 对类组件进行一些必要的生命周期劫持、渲染劫持
  - 这个功能更适合反向继承的 HOC

## 2. getDerivedStateFromProps

```javascript
getDerivedStateFromProps(nextProps, prevState);
```

- nextProps 父组件新传递的 props
- prevState 组件在此次渲染前待更新的 state

getDerivedStateFromProps() 方法可以作为类组件的静态属性方法执行，内部访问不到 this，更趋向于纯函数。

**Tips**：React 对该生命周期的定义为取缔 componentWillMount() 和 componentWillReciveProps()

getDerivedStateFromProps()（翻译：从 props 中得到派生的 state），这个生命周期用于，在初始化和更新阶段，接受父组件的 props 数据，可以对 props 进行格式化、过滤等操作，返回值将作为新的 state 合并到 state 中，供给视图渲染层消费。

**Tips**：只要组件更新，就会执行 getDerivedStateFromProps()，不论 props 改变、setState()、forceUpdate()。

```javascript
static getDerivedStateFromProps(newProps) {
    const { type } = newProps;
    // 根据 props 变化，返回值将作为新的 state，用于渲染 或 传递 shouldComponentUpdate()
    switch(type) {
        case "fruit" :
            return { 
                list: ["苹果", "香蕉","葡萄"]
            };
        case "vegetables" : 
            return { 
                list: ["菠菜", "西红柿", "土豆"]
            };
    }
}

render() {
    return <div>{ this.state.list.map(item => <li key={ item }>{ item }</li>) }</div>
}
```

getDerivedStateFromProps 作用：

- 代替 componentWillMount() 和 componentWillReceiveProps()
- 组件初始化、更新时，将 props 映射到 state
- 返回值与旧 state 合并，可以作为 shouldComponentUpdate() 第二参数 newState，可以判断是否渲染组件

## 3. componentWillMount()、UNSAFE_componentWillMount()

在 React V16.3 componentWilMount、componentWillReceiveProps、componentWillUpdate 三个生命周期被打上了不安全的标识符 UNSAFE。在 React V18 中已废弃。

为什么废弃？

上述废弃的三个生命周期，都是在 render() 之前执行的，React 对于执行 render() 有诸如 shouldUpdate() 等条件制约，但是对于执行在 render() 之前的生命周期并没有限制，存在一定隐匿风险，

如果 updateClassInstance 执行多次或 React 开发者滥用这几个生命周期，可能导致生命周期内的上下文被多次执行。

## 4. componentWillReceiveProps()、UNSAFE_componentWillReceiveProps()

该生命周期的执行在函数更新阶段，只要父组件触发 render 函数，调用 React.createElement()，那么 props 就会被重新创建，该声明周期就会执行。这也解释了即是 props 没变，该声明周期也会执行。

### Q&A

Q：在 props 不变的前提下，PureComponent 组件能否阻止 componentWillReceiveProps 执行

A：componentWillReceiveProps 声明周期的执行与 PureComponent 没有关系。

PureComponent 在 componentWillReceiveProps 执行之后浅比较 props 是否发生变化。所以 PureComponent 下不会阻止该生命周期的执行。

## 5. componentWillUpdate、UNSAFE_componentWillUpdate

该生命周期可以在组件更新之前（此时的 DOM 还没有更新），在这里可以做一些获取 DOM 的操作。

React 新的生命周期 getSnapshotBeforeUpdate() 用于代替 UNSAFE_componentWillUpdate()

## 6. render()

在 render() 中，各个 JSX 语句将会被转义为 React.createElement() 的形式，用于创建 React.element 对象。

一次 render 的过程，就是创建 React.element 对象的过程

可以在 render() 中做一些 createElement()、cloneElement()、React.children.forEach() 等操作

## 7. getSnapshotBeforeUpdate()

```javascript
getSnapshotBeforeUpdate(prevProps, prevState){}
```

参数：

- prevProps 更新前的 props
- prevState 更新前的 state

getSnapshotBeforeUpdate()（翻译：获取更新前的快照）可以理解为获取更新前 DOM 的状态。

该声明周期是在 commit 阶段的 before Mutation（DOM 修改前），此时 DOM 还没有更新。此时是获取 DOM 信息的最佳信息，getSnapshotBeforeUpdate() 将返回值作为 snapshot，作为**第三参数**传递给 componentDidUpdate()。

**Tips**：

- 如果该声明周期没有返回值（即 snapshot）会给予警告
- 如果该声明周期后没有 componentDidUpdate() 也会给予警告
- snapshot 不限于 DOM 的信息，也可以是根据 DOM 计算得出的产物

```javascript
getSnapshotBeforeUpdate(prevProps, preState) {
    const style = getComputedStyle(this.node);
    // 传递更新前的元素位置
    return {
        cx: style.cx,
        cy: style.cy
    }
}
componentDidUpdate(prevProps, prevState, snapshot) {
    // 获取元素更新前的位置
    console.log(snapshot);
}
```

作用：

通过计算形成一次 snapshot，传递给 componentDidUpdate()。保存一次更新前的信息。

## 8. componentDidUpdate()

```javascript
componentDidUpdate(prevProps, prevState, snapshot){
    const style = getComputedStyle(this.node);
    // 获取元素最新的位置信息
    const newPosition = {
        cx: style.cx,
        cy: style.cy
    }
}
```

参数：

- prevProps 更新之前的 props
- prevProps 更新之前的 state
- snapshot 为 getSnapshotBeforeUpdate 返回的快照，可以是更新前的 DOM 信息

作用：

- componentDidUpdate() 生命周期执行时，此时 DOM 已经更新，可以直接获取 DOM 最新状态
  - 如果使用 setState() 需要加以限制，负责会引起无限循环
- 接受 getSnapshotBeforeUpdate 保存的快照信息

## 9. componentDidMount()

该生命周期的执行时机和 componentDidUpdate() 一样，只不过其在**初始化阶段**，而后者在**更新阶段**。此时 DOM 已经创建完毕，可以做一些基于 DOM 操作、DOM 事件监听器

```javascript
async componentDidMount() {
    this.node.addEventListener("click", () => {
        // 事件监听
    })
    // 请求数据
    const data = await this.getData();
}
```

作用：

- 做一些关于 DOM 操作，比如基于 DOM 的事件监听器
- 可以初始化向服务器请求数据、渲染视图

## 10. shouldComponentUpdate()

```javascript
shouldComponentUpdate(newProps, newState, nextContext) {}

shouldComponentUpdate(newProps, newState) {
    // props.a 发生变化，则渲染组件
    if (newProps.a !== this.props.a) {
        return true;
    } else if (newState.b !== this.props.b) {
        return true;
    } else {
        return false;
    }
}
```

该生命周期一般用于性能优化，其返回值决定是否重新渲染类组件。

对于第二个参数 newState，如果有 getDerivedStateFromProps() 生命周期，其返回值将合并到 newState，供 shouldComponentUpdate() 使用

## 11. componentWillUnmount()

该生命周期是组件销毁阶段唯一执行的生命周期，主要做一些收尾工作，比如清除一些可能造成内存泄漏的定时器、延时器或者一些事件监听器

```javascript
componentWillUnmount() {
    clearTimeout(this.timer);
    this.node.removeEventListener("click", this.handerClick);
}
```

作用：

- 清除延时器、定时器
- 取出基于 DOM 的操作，比如事件监听器
