# 理解 lifeCycle

React **类组件**为开发者提供了一些声明周期钩子函数，能让开发者在 React 执行的重要阶段，在钩子函数里做一些事情。

React Hooks 的出现，弥补了**函数组件**函数组件没有声明周期的缺陷。

本文目标：

- 认识 React 生命周期的流程
- 理解 React 在各个生命周期都做了什么
- 提升对 React Hooks 中 useEffect() 和 useLayoutEffect() 的理解

## 目录

- [理解 lifeCycle](#理解-lifecycle)
  - [目录](#目录)
  - [类组件生命周期介绍](#类组件生命周期介绍)
  - [React 类组件生命周期执行过程探秘](#react-类组件生命周期执行过程探秘)
  - [初始化阶段](#初始化阶段)
  - [更新阶段](#更新阶段)
  - [销毁阶段](#销毁阶段)
  - [三个阶段生命周期 + 无状态组件总览图](#三个阶段生命周期--无状态组件总览图)

## 类组件生命周期介绍

前置知识，React 的两个重要阶段：render 阶段和 commit 阶段。

- render（调和）阶段
  - 深度遍历 React fiber 树
  - 发现不同（diff）
  - 对于变化的组件，执行 render() 函数
- commit 阶段
  - 创建修改真实的 DOM 节点

如果在一次调和过程中，发现一个 tag === 1 的 fiber （即类组件对应的 fiber），就会按照类组件的逻辑进行处理。

```javascript
// workloop React 处理类组件的主要功能方法
function updateClassComponent() {
    let shouldUpdate;
    // stateNode fiber 指向 类组件实例的指针
    const instance = workInProgress.stateNode;
    // instance 为组件实例。如果该组件实例不存在，证明该类组件没有被挂载，那么会走初始化流程
    if (instance === null) {
        // 组件将在这个方法中被实例化
        constructClassInstance(workInProgress, Component, nextProps);
        // 初始化挂载组件流程
        mountClassInstance(workInProgress, 
        Component, nextProps, renderExpirationTime);
        // shouldUpdate 标识组件是否需要更新
        shouldUpdate = true;
    } else {
        // 组件更新流程
        shouldUpdate = updateInstance(current, workInProgress, Component, nextProps, renderExpirationTime);
    }
    if (shouldUpdate) {
        // 执行 render 函数,得到子节点
        nextChildren = instance.render();
        // 继续调和子节点
        reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime)
    }
}
```

上述流程中，几个重要概念：

1. instance 当前类组件对应的实例
2. workInProgress 树，当前正在调和的 fiber 树
   - 一次更新中，React 会自上而下深度遍历子代 fiber 树
   - 如果遍历到一个 fiber，会将当前 fiber 指向 workInProgress
3. current 树，在初始化更新时，current = null，在第一次给 fiber 调和之后，会将 workInProgress 树赋值给 current 树
   - React 使用 workInProgress 和 current 类确保一次更新的快速构建，且保证状态不丢失
4. Component 项目中的当前的 类组件
5. nextProps 作为组件在一次更新中 新的 props
6. renderExpiratonTime 作为下一次渲染的过期时间

**Tips**：

- 在组件实例上，可以通过 _reactInternals 属性访问组件对应的 fiber 对象
- 在 fiber 对象上，可以通过 stateNode 访问当前 fiber 对应的组件实例

![组件实例和 fiber 对象的互指](./../images/blog-notes/05_01-组件实例和%20fiber%20的互指.png)

## React 类组件生命周期执行过程探秘

React 的大部分生命周期的执行，都在 mountClassInstance() 和 updateClassInstance() 这两个方法中执行。所以有必要了解这两个函数充当了什么角色。

在此将流程简化为 mount（初始化渲染）和 update（更新）两个方向。

为方便理解生命周期的执行流程，将分为**组件初始化、组件更新、组件销毁**三大阶段分析

## 初始化阶段

```javascript
function mountClassInstance(workInProgress, ctor, newProps, renderExpirationTime) {
    const instance = workInProgress.stateNode;
    // ctor 即是类组件，此处是获取类组件的静态方法
    const getDerivedStateFromProps = ctor.getDerivedStateFromProps;

    // 此时执行 getDerivedStateFromProps() 生命周期，得到合并的 state
    if (typeof getDerivedStateFromProps === "function") {
        const partialState = getDerivedStateFromProps(nextProps, prevState);

        // 合并 state
        const memoizedState = partialState === null || partialState === undefined ? prevState : Object.assign({}, prevState, partialState);

        workInProgress.memoizedState = memoizedState;
        // 将 state  赋值到组件实例上，即是在类组件中 this.state 获取到的 state
        instance.state = workInProgress.memoizedState;
    } 

    // 当 getDerivedStateFromProps() 和 getSnapshotBeforeUpdate() 均不存在时，执行 componentWillMount()
    if (typeof ctor.getDerivedStateFromProps !== "function" && typeof instance.getSnapshotBeforeUpdate !== "function" && typeof instance.componentWillMount === "function") {
        instance.componentWillMount();
    }
}
```

1. constructor() 执行
   1. mount 阶段，首先执行 constructClassInstance() 函数，用于实例化 React 组件，类组件的 constructor() 方法在此时执行
   2. 调用 mountClassInstance() 进行组件挂载
2. getDerivedStateFromProps() 执行
   - 在初始化阶段，getDerivedStateFromProps() 是第二个执行的生命周期。
   - 它是从 ctor 类上直接绑定的 静态方法，传入 props、state。返回值将和之前的 state 合并，作为新的 state，传递给组件实例使用。
3. UNSAFE_componentWillMount() 执行
   - 如果存在 getDerviedStateFromProps() 和 getSnapshotBeforeUpdate() 就不会执行生命周期 UNSAFE_componentWillMount()()
4. render() 执行
   1. 到此为止 mountClassInstance() 函数执行完毕
   2. 结合文章最先提到的 updateClassComponent() 函数，其在执行完 mountClassInstance()，会接着执行 render() 渲染函数，形成 children
   3. React 调用 reconcileChildren() 深度调和 children
5. componentDidMount() 执行
   - 上述提及的生命周期都是在 render 阶段执行的
   - 一旦 React 调和完所有的 fiber 节点，就会到达 commit 阶段
   - 在组件初始化 commit 阶段，会调用 componentDidMount() 生命周期

```javascript
function commitLifeCycles(finishedRoot, current, finishedWork) {
    switch(finishWork.tag) {
        case ClassComponent: {
            const instance = finishWork.stateNode;
            if (current === null) {
                instance.componentDidMount();
            } else {
                instance.componentDidUpdate(prevProps, prevState, instance._reactInternalSnapshotBeforeUpdate);
            }
        }
    }
}
```

由上述源码可以认识到 componentDidMount() 执行时机 和 componentDidUpdate() 执行时机是相同的，只不过一个针对组件初始化，一个针对组件更新。

到此，初始化阶段的生命周期执行完毕

执行顺序：

1. constructor()
2. getDerivedStateFromProps()/ UNSAFE_componentWillMount()
3. render()
4. componentDidMount();

![初始化阶段的生命周期](../images/blog-notes//05_02%20%E5%88%9D%E5%A7%8B%E5%8C%96%E9%98%B6%E6%AE%B5%E7%9A%84%20React%20%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.awebp)

## 更新阶段

在执行 updateClassComponent() 时，如果 current 不为 null，说明该类组件被挂载过，接下来会走更新逻辑。

```javascript
function updateClassInstance(current, workInProgress, ctor, newProps, renderExpirationTime) {
    // 类组件实例
    const instance = workInProgress.stateNode;
    // 此处的 ctor 即 类组件
    const hasNewLifecycles = typeof ctor.getDerivedStateFromProps === "function";
    // 如果不具有 getDerivedStateFromProps 生命周期
    if (!hasNewLifecycles && typeof instance.componentWillReceiveProps === "function") {
        // 浅比较 props 是否相同
        if (oldProps !== newProps || oldContext !== nextContext) {
            // 执行生命周期 componentWillReceiveProps
            instance.componentWillReceiveProps(newProps, nextContext);
        }
    }
    let newState = (instance.state = oldState);
    if (typeof getDerivedStateFromProps === "function") {
        // 执行生命周期 getDerivedStateFromProps
        ctor.getDerivedStateFromProps(nextProps, prevState);
        newState = workInProgress.memoizedState;
    }
    let shouldUpdate = true;
    if (typeof instance.shouldComponentUpdate === "function") {
        // 执行生命周期 shouldComponentUpdate
        shouldUpdate = instance.shouldComponentUpdate(newProps, newState, nextContext);
    }
    if (shouldUpdate) {
        if (typeof instance.componentWillUpdate === "function") {
            // 执行生命周期 componentWillUpdate
            instance.componentWillUpdate();
        }
    }
    return shouldUpdate;
}
```

1. 执行生命周期 UNSAFE_componentWillReceiveProps()
   1. 判断 getDerivedStateFromProps() 是否存在
   2. 如果上述声明周期不存在，就执行  UNSAFE_componentWillReceiveProps()，传入两个参数 newProps、newContext
2. 执行生命周期 getDerivedStateFromProps()
   - 该生命周期的返回值用于合并 state 以生成新的 state。
3. 执行生命周期 shouldComponentUpdate()
   1. 传入新的 props、新的 state、新的 context
   2. 返回值决定是否继续执行 render() 函数，调和子节点
   3. getDerivedStateFromProps() 的返回值可以作为新的 state，传递给 shouldComponentUpdate()
4. 执行生命周期 UNSAFE_componentWillUpdate()
   - updateClassInstance() 方法到此执行完毕
5. 执行生命周期 render()
   - 得到最新的 React element 元素，继续调和子节点
6. 执行生命周期 getSnapshotBeforeUpdate()
   - commit 阶段细分为三个阶段
     1. beforeMutation（DOM 修改前）
     2. mutation（DOM 修改）
     3. layout（DOM 修改后）
   - getSnapshotBeforeUpdate() 发生在 before Mutation 阶段
   - 该生命周期的返回值，将作为第三个参数（_reactInternalSnapshotBeforeUpdate）传递给 componentDidUpdate()
7. 执行生命周期 componentDidUpdate()
   - 此时 DOM 已经修改完成，可以修改更改之后的 DOM
   - 到此位置更新阶段的生命周期执行完毕

```javascript
function commitBeforeMutationLifeCycles(current, finishedWork) {
    switch (finishedWork.tag) {
        case ClassComponent:  {
            // 执行生命周期 getSnapshotBeforeUpdate()
            const snapshot = instance.getSnapshotBeforeUpdate(prevProps, prevState);
            // 返回值作为 __reactInternalSnapshotBeforeUpdate 传递给 componentDidUpdate() 生命周期
            instance.__reactInternalSnapshotBeforeUpdate = snaoshot;
        }
    }
}
```

![更新阶段的生命周期](../images/blog-notes/05_03%20%E6%9B%B4%E6%96%B0%E9%98%B6%E6%AE%B5%E7%9A%84%20React%20%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.awebp)

更新阶段对应的生命周期的执行顺序：

1. UNSAFE_componentWillReceiveProps( props 改变 )/ getDerivedStateFromProp
2. shouldComponentUpdate
3. UNSAFE_componentWillUpdate
4. render
5. getSnapshotBeforeUpdate
6. componentDidUpdate

## 销毁阶段

```javascript
function classComponentWillUnmountWithTimer() {
    instance.componentWillUnmount();
}
```

1. 执行生命周期 componentWillUnmount()
   1. 在一次调和更新中，如果发现元素被移除，就会为该元素打上 deletion 标签
   2. 在 commit 阶段会调用 componentWillUnmount 生命周期
   3. 统一卸载组件以及 DOM 元素

![卸载阶段的生命周期](../images/blog-notes/05_03%20%E6%9B%B4%E6%96%B0%E9%98%B6%E6%AE%B5%E7%9A%84%20React%20%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.awebp)

## 三个阶段生命周期 + 无状态组件总览图

![React 生命周期总览](../images/blog-notes/05_05%20%20React%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E6%80%BB%E8%A7%88.awebp)
