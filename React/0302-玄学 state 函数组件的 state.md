# 玄学 state

## 目录

- [玄学 state](#玄学-state)
  - [目录](#目录)
  - [函数组件中的 state](#函数组件中的-state)
    - [useState 用法](#usestate-用法)
    - [如何监听 state 变化](#如何监听-state-变化)
    - [dispatch 更新特点](#dispatch-更新特点)
      - [为什么会这样？](#为什么会这样)
    - [useState 注意事项](#usestate-注意事项)
  - [useState 原理解密](#usestate-原理解密)
  - [Q & A](#q--a)
    - [类组件的 setState 和函数组件的 useState 的异同](#类组件的-setstate-和函数组件的-usestate-的异同)

## 函数组件中的 state

React-hooks 发布之后，useState 可以使函数组件像类组件一样拥有 state，说明函数组件可以通过 useState 改变 UI 视图。

### useState 用法

[state, dispatch] = useState(initData)

- state：提供给 UI，作为渲染视图的数据源
- dispatch：改变 state 的函数。可以理解为推动函数组件渲染的渲染函数
  - 非函数类型值，此时将 作为新的值，赋予给 state，供下一次渲染使用
  - 函数情况，此时可以称该函数为 reducer。
    - reducer 的参数为上一次返回的的 state
    - 返回值为新的 state
- initData
  - 非函数类型值，将作为 state 初始化的值
  - 函数，函数的返回值作为 useState 初始化的值

```javascript
// initData 为非函数的情况
const [ number, setNumber ] = React.useState(0);

// initData 为函数的情况
const [ number, setNumber ] = React.useState(() => {
    if (props.a === 1) return Math.random();
    if (props.a === 2) return Math.ceil(Math.random() * 10);
    return Math.ceil(Math.random() * 100)
})

// =============================================

// dispatch 参数是一个非函数值
const [ number, setNumber ] = React.useState(0);
const handleClick = () => {
    setNumber(1);
    setNumber(2);
    setNumber(3);
}

// dispatch 参数是一个函数
const [ number, setNumber ] = React.useState(0);
const handleClick = () => {
    setNumber((state) => state + 1); // state -> 0 + 1 = 1
    setNumber(8); // state -> 8
    setNumber(state => state + 1); // state -> 8 + 1 = 9
}
```

### 如何监听 state 变化

在函数组件需要借助 useEffect() 钩子函数，以达到监听 state 变化的效果。

通常可以把 state 作为依赖项传入 useEffect() 作为第二个参数 deps。

**注**：useEffect() 初始化会默认执行一次。

```javascript
export default function Index(props) {
    const [ number, setNumber ] = React.useState(0);
    // 监听 number 变化
    React.useEffect(() => {
        console.log(`监听 number 变化，此时的 number 是：${ number }`);
    },[ number ]);

    const handleClick = () => {
        // 高优先级更新
        ReactDOM.flushSync(() => {
            setNumber(2);
        });
        // 批量更新
        setNumber(1);
        // 滞后更新，批量更新规则被打破
        setTimeout(() => {
            setNumber(3);
        })
    }
    console.log(number);

    return <div>
        <span>{ number }</span>
        <button onClick={ handleClick }>number++</button>
    </div>
}
```

### dispatch 更新特点

在上述代码中，函数组件的批量更新和 flushSync()，中状态更新效果和类组件是一样的。

**注**：useState() 使用注意点，当调用 dispatch 函数改变 state 时，在本次函数执行上下文中，获取不到最新的 state 值。

```javascript
const [ number, setNumber ] = React.useState(0);
const handleClick = () => {
    ReactDOM.flushSync(() => {
        setNumber(2);
        console.log(number);
    })
    setNumber(1);
    console.log(number);
    setTimeout(() => {
        setNumber(3);
        console.log(number);
    })
}
```

打印结果：0、0、0

#### 为什么会这样？

React 底层，函数组件的更新就是函数的一次执行，在函数的执行过程中，函数内部所有变量重新声明，所以改变的 state，只有下一次函数组件执行时才会被更新。

所以在如上代码中，同一个函数执行上下文，number 一直为 0，无论如何，都拿不到最新的 state

### useState 注意事项

在使用 useState 的 dispatchAction 更新 state 时，不能传入相同的 state，这样并不会使视图更新

```javascript
export default function Index() {
    const [ state, dispatchState ] = useState({ name: "alien" })

    // 点击按钮后，视图并没有更新
    const handleClick = () => {
        state.name = "huaqi";
        // 直接改变 state，在内存中指向的地址相同
        dispatchState(state);
    }

    return <div>
        <div>{ state.name }</div>
        <button onClick={ handleClick }>changeName</button>
    </div>
}
```

**原因**：在 useState 的 dispatchAction 处理逻辑中，会浅比较两次 state，如果新旧两个 state 相同，不会开启更新调度任务。

demo 中新旧 state 指向了相同的 内存空间，所以默认新旧 state 相等，不会发生视图更新。

**解决方法**：将 demo 中的 dispatchState 改为 dispatchState({...state})。使用扩展运算符对原 state 进行解构，即浅拷贝了原 state 对象，重新申请了一个内存空间。

## useState 原理解密

\<slot>\</slot>

## Q & A

### 类组件的 setState 和函数组件的 useState 的异同

- 相同点
  - setState 和 useState 更新视图，在底层都调用了 scheduleUpdateOnFiber() 方法
  - 在事件驱动情况下都有批量更新规则
- 不同点
  - 在非 pureComponent 组件模式下
    - setState 不会浅比较两次 state 的值，只要调用 setState，在没有其他优化手段的前提下，就会执行更新
    - useState 中的 dispatchAction 会默认比较两次 state 是否相同，然后决定是否更新组件
  - 监听 state 变化的方式不同
    - 类组件的 setState 有专门监听 state 变化的回调函数 callback，可以获取最新 state
    - 函数组件中，只能通过 useEffect() 来执行 state 变化引起的副作用
  - 对新旧状态的处理不同
    - setState 在底层处理逻辑上主要是和旧 state 进行合并处理
    - useState 更倾向于重新赋值
  