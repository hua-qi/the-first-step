# 提供者 context

## 目录

- [提供者 context](#提供者-context)
  - [目录](#目录)
  - [为什么 React 会提供 context](#为什么-react-会提供-context)
    - [假设一个场景](#假设一个场景)
    - [解决方法一：props](#解决方法一props)
    - [解决方法二：context](#解决方法二context)
  - [context 的基本使用](#context-的基本使用)
    - [1、createContext](#1createcontext)
    - [2、Provider 以及三种 Consumer 使用](#2provider-以及三种-consumer-使用)
    - [3、动态 context](#3动态-context)
  - [暴露的问题](#暴露的问题)
    - [问题](#问题)
    - [解决方法](#解决方法)
      - [解决方法一](#解决方法一)
      - [解决方法二](#解决方法二)
  - [其他 api](#其他-api)
    - [displayName](#displayname)
  - [Q & A](#q--a)

## 为什么 React 会提供 context

### 假设一个场景

在 React 项目中有一个全局变量 theme（theme 可从初始化数据交互中获得，也可以是用于切换 UI 主题变化所得）。

有一些视图 UI 组件（表单 input 框、button 按钮），需要 theme 中的变量做对应的视图渲染。

组件结构树如下图，怎么将 theme 传递下去，并合理分配到需要 theme 的组件呢？

![组件结构树](../images/blog-notes/07_01-%E6%8F%90%E4%BE%9B%E8%80%85%20context%20-%20%E7%BB%84%E4%BB%B6%E7%BB%93%E6%9E%84%E6%A0%91.awebp)

### 解决方法一：props

使用 props 可以勉强解决上述情景，但会有两个问题。

问题一：

在设计整个项目的时候，不确定将来哪一个模块需要 theme，所以必须将 theme 在根组件 A 进行注入，如果需要给 组件 N 传递 props，则需要在组件 N 上层的所有组件手动绑定 props。

如果将来在其他分支上有更深层的组件需要 theme，还需要将其上一层的所有组件绑定传递 props，这样的维护成本可想而知。

问题二：

如果需要动态改变 theme，需要从根组件 A 开始更新。从需要 theme 的组件（比如组件 E），到根组件的一条组件链结构都需要更新，造成牵一发而动全身的影响。

### 解决方法二：context

React 在组件树 A 节点，使用 Provider（提供者）注入 theme，然后在 theme 的组件节点（比方组件 E）使用 Consumer（消费者）取出 theme，供该组件渲染即可。

React 官网：Context 提供了一个无需为每层组件手动添加 props，就能在组件间树之间进行数据传递的方法。

**Tips**：Provider 组件必须位于 Consumer 组件层级的上方，即 Provider 一定要是 Consumer 的某一父级。

## context 的基本使用

React V16.3.0，context api 正式发布，可以直接使用 createContext 创建出一个 context 上下文对象，该对象提供了两个组件：Provider、Consumer 作为新的提供者和消费者。

### 1、createContext

基本用法：

```javascript
const ThemeContext = createContext(null);    // 上下文
const ThemeProvider = ThemeContext.Provider; // 提供者
const ThemeConsumer = ThemeContext.Consumer; // 消费者
```

createContext 接受一个参数，作为初始化 context 的内容，返回一个新的 context 对象。

Context 对象的上的 Provider 作为提供者；Context 对象上的 Consumer 作为消费者。

### 2、Provider 以及三种 Consumer 使用

```javascript
function ProviderDemo() {
  const [theme, setTheme] = useState({
    color: "blue",
    background: "pink",
  });

  return (
    <ThemeProvider value={theme}>
      <h1>Provider 提供者</h1>
      {/* 类组件类型消费者 */}
      <ClassSon />
      {/* 函数组件类型消费者 */}
      <FunctionSon />
      {/* Consumer 消费者 */}
      <Son />
    </ThemeProvider>
  );
}

// 类组件消费者 ====================================

class ClassConsumerDemo extends Component {
  render() {
    const { color, background } = this.context;
    return <div style={{ color, background }}>类组件消费者</div>;
  }
}
ClassConsumerDemo.contextType = ThemeContext;

const ClassSon = () => <ClassConsumerDemo />;

// 函数组件消费者 =====================================

function FunctionConsumerDemo() {
  const theme = useContext(ThemeContext);
  const { color, background } = theme;
  return <div style={{ color, background }}>函数组件消费者</div>;
}

const FunctionSon = () => <FunctionConsumerDemo />;

// Consumer 方式 ==================================

function ConsumerDemo(props) {
  const { color, background } = props;
  return <div style={{ color, background }}>Consumer 消费者</div>;
}

const Son = () => (
  <ThemeConsumer>
    {/* 将 context 内容转化为 props */}
    {contextValue => <ConsumerDemo {...contextValue} />}
  </ThemeConsumer>
);
```

- 类组件
  - React V16.6 为类组件提供了 contextType 静态属性，用于获取 Provider 提供的 value 属性
  - contextType 指向需要获取的 context 对象（上述 demo 中为 ThemeContext），此时可以方便获取到**最近一层** Provider 提供的 contextValue
- 函数组件
  - React V16.8 提供了 useContext() hook
  - useContext()，接受一个参数，即想要获取的 context 对象
  - 返回一个 value 值，即最近的 provider 提供的 contextValue 值
- Consumer 订阅消费者模式
  - Consumer 订阅者采取 render props 方式，接受最近一层 Provider 中的 contextValue 属性，作为 render props 函数的参数
  - 可以将参数取出来，作为 props 混入 ConsumerDemo 组件，即将 context 转化为 props

### 3、动态 context

```javascript
const ThemeContext = createContext(null);
const ThemeProvider = ThemeContext.Provider;

const themeList = [
  {
    color: "blue",
    background: "pink",
  },
  {
    color: "#fff",
    background: "blue",
  },
];

function ProviderDemo() {
  const [order, setOrder] = useState(0);
  const [theme, setTheme] = useState(themeList[order]);

  useLayoutEffect(() => {
    setTheme(themeList[order]);
  }, [order]);

  return (
    <>
      <ThemeProvider value={theme}>
        <Son />
      </ThemeProvider>
      <button onClick={() => setOrder(order => (order + 1) % 2)}>
        切换 主题
      </button>
    </>
  );
}

function ConsumerDemo() {
  const { color, background } = useContext(ThemeContext);
  return <div style={{ color, background }}>消费者</div>;
}
const Son = memo(() => <ConsumerDemo />);
```

Provider 模式下的 context 有一个显著的特点：**Provider 的 value 的改变，会使所有消费 value 的组件重新渲染。**

如上述 demo，ProviderDemo 组件通过 useState 改变 theme 的值，会使 ConsumerDemo 自动更新，注意此次更新并不是父组件 render 造成的，因为 Son 组件通过 memo 处理过，此时 Son 组件并没有触发 render，而是 ConsumerDemo 组件自发的 render。

**总结：**

在 Provider 里 value 的改变，会使三种模式的消费者组件重新渲染（类组件引用 contextType、函数组件 hook useContext()、ContextConsumer 使 context 转 props），但与前两者不同的是，使用 ContextConsumer 方式，当 context 改变时，不会使引用 Consumer 的父组件重新更新。

## 暴露的问题

由上述 demo 暴露出一个问题，如果上述 Son 组件没有使用 memo 处理，父组件 ProvideDemo 使用 useState 会使其重新 render，此时 Son 会跟随父组件重新 render，如果 Son 组件还有许多子组件，就会全部 render 一次。

### 问题

如何阻止 Provider value 改变引起的 children 组件不必要的渲染？

### 解决方法

#### 解决方法一

使用 memo，使组件变化为 pureComponent，让其对子组件 props 进行浅比较处理

```javascript
const Son = memo(() => <ConsumerDemo />)
```

#### 解决方法二

利用 React 本身对 React element 对象的缓存。React 每次执行 render() 时都会调用 createElement() 形成新的 React element 对象，如果将 React element 缓存下来，下一次调和更新的时候，就会跳过该 React element 对应的 fiber 更新

```javascript
<ThemeProvider value={contextValue}>
    { useMemo(() => <Son />, [])}
</ThemeProvider>
```

## 其他 api

### displayName

context 对象接受一个名为 displayName 的 propety，类型为字符串。

React DevTools 使用该字符串确定 context 要显示的内容

```javascript
const MyContext = createContext("初始化内容");
MyContext.displayName = "MyDisplayName";

<MyContext.Provider /> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer /> // "MyDisplayName.Consumer" 在 DevTools 中
```

## Q & A

问： context 与 props 和 react-redux 的对比

答：

- context
  - 解决了 props 需要每一层都手动添加 props 的缺陷
  - 解决了改变 value，组件全部重新渲染的缺陷
- react-redux
  - 通过 Provider 模式将 redux 中的 store 注入到组件当中
