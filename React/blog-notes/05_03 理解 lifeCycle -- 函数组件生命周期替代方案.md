# 理解 lifeCycle -- 函数组件生命周期替代方案

React hooks 提供了用于弥补函数组件没有生命周期的缺陷的 api，其原理主要是运用了 hooks 里面的 useEffect() 和 useLayoutEffect()

## 目录

- [理解 lifeCycle -- 函数组件生命周期替代方案](#理解-lifecycle----函数组件生命周期替代方案)
  - [目录](#目录)
  - [1. useEffect() 和 useLayoutEffect()](#1-useeffect-和-uselayouteffect)
    - [useEffect()](#useeffect)
    - [useLayoutEffect()](#uselayouteffect)
    - [Q & A](#q--a)
  - [2. componentDidMount() 替代方案](#2-componentdidmount-替代方案)
  - [3. componentWillUnmount() 替代方案](#3-componentwillunmount-替代方案)
  - [4. UNSAFE_componentWillReceiveProps() 替代方案](#4-unsafe_componentwillreceiveprops-替代方案)
  - [5. componentDidUpdate() 替代方案](#5-componentdidupdate-替代方案)

## 1. useEffect() 和 useLayoutEffect()

### useEffect()

```javascript
useEffect(() => {
    return destory;
}, [dep])
```

参数：

- useEffect() 的第一个参数 callback，返回 destory。
  - destory 在下一次 callback 执行之前调用，用于清除上一次 callback 产生的副作用。
- useEffect() 的第二个参数作为依赖项，是一个数组，可以有多个依赖项。
  - 依赖项改变，执行上一次 callback 返回的 destory 和新的 callback 函数。

对于 useEffect()，React 采用**异步调用**处理逻辑，对于每一个 useEffect() 的 callback，React 的处理方式类似 setTimeout() 回调函数，将其放入任务队列，等待主线程任务完成，DOM 更新、JS 执行完毕、视图绘制完毕才执行，所以 **useEffect() callback 不会阻塞浏览器绘制视图**。

### useLayoutEffect()

useLayoutEffec() 和 useEffect() 的不同之处在于其采用了**同步执行**，具体区别如下：

- 执行时机不同
  - useLayoutEffect() 在 DOM 绘制之前，此时方便修改 DOM，这样浏览器只会绘制一次
  - 如果将修改 DOM 布局放在 useEffect()，那么 useEffect() 的执行是浏览器绘制视图之后，接下来又修改 DOM，会导致浏览器再次重绘或回流，而且由于两次绘制，还可能造成页面闪现突兀的效果
- useLayoutEffect() 的 callback 中的代码会阻塞浏览器绘制

一句话概括如何选择 useEffect() 和 useLayoutEffect()：**修改 DOM 、改变布局就用 useLayoutEffect()，其他情况就用 useEffect()。**

### Q & A

问：useEffect() callback 和 componentDidMount() / componentDidUpdate() 的执行时机有何不同？

答：useEffect() 在 React 的执行栈中是**异步执行**，而 componentDidMount() / componentDidUpdate() 是**同步执行**。useEffect() 不会阻塞浏览器绘制。

在时机上，componentDidMount() / componentDidUpdate() 和 useLayoutEffect() 更类似

## 2. componentDidMount() 替代方案

```javascript
useEffect(() => {
    // 请求数据、事件监听、操纵 dom

}, []) // 注： 此处 dep = []
```

**Tips**：dep = []，表明当前 effect 没有任何依赖项，即只有初始化阶段执行一次

## 3. componentWillUnmount() 替代方案

```javascript
useEffect(() => {
    // 请求数据、事件监听、操纵 dom、增加定时器、延时器
    return function componentWillUnmount() {
        // 去除事件监听、清除定时器和延时器
    }
},[]) // 注：此处 dep = []
```

在使用 useEffect() callback 实现 componentDidMount() 效果的前提下，useEffect() callback 的返回函数可以作为 componentWillUnmount() 使用。

## 4. UNSAFE_componentWillReceiveProps() 替代方案

使用 useEffect 代替 componentWillReceiveProps() 有些牵强

- 两者的执行阶段不同
  - useEffect() 在 commit 阶段的 layout 时期
  - UNSAFE_componentWillReceiveProps() render 阶段
- 执行时机有差异
  - useEffect() 会在初始化时执行一次
  - UNSAFE_componentWillReceiveProps() 只有组件更新 props 变化时才会执行

```javascript
// 此时依赖项是 props，props 变化则执行此时的 useEffect() callback
useEffect(() => {
    console.log("props 变化：componentWillReceiveProps");
}, [ props ]);

// 此时依赖项是 props.number
useEffect(() => {
    console.log("props 中 number 变化：componentWillReceiveProps");
}, [ props.number ]);
```

## 5. componentDidUpdate() 替代方案

useEffect() 和 componentDidUpdate() 的异同

- 不同
  - useEffect() 异步执行
  - componentDidUpdate() 同步执行
  - useEffect() 默认会执行一次
  - componentDidUpdate() 只有在组件更新完成后才会执行
- 相同
  - 都处于 commit 阶段

```javascript
useEffect(() => {
    console.log("组件更新完成：componentDidUpdate");
}) // 没有 dep 依赖项
```

**Tips**：此时 useEffect() 没有第二个参数，每一次执行函数组件，都会执行该 effect
