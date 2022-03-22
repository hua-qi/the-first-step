# 起源 Component

React 世界中，一切皆组件，组件可以分为两类

- 类（Class）组件
- 函数（Function）组件

## 目录

- [起源 Component](#起源-component)
  - [目录](#目录)
  - [什么是 React 组件](#什么是-react-组件)
  - [两种不同的 React 组件](#两种不同的-react-组件)
    - [class 类组件](#class-类组件)
      - [类组件的定义](#类组件的定义)
    - [Q&A](#qa)
    - [类组件各部分功能](#类组件各部分功能)
    - [Q & A](#q--a)
    - [Function 函数组件](#function-函数组件)
    - [函数组件和类组件的本质区别](#函数组件和类组件的本质区别)
  - [组件通信方式](#组件通信方式)
    - [props 和 callback 方式](#props-和-callback-方式)
    - [event bus 事件总线](#event-bus-事件总线)
  - [组件的强化方式](#组件的强化方式)
    - [类组件继承](#类组件继承)
    - [函数组件自定义 Hooks](#函数组件自定义-hooks)
    - [HOC 高阶组件](#hoc-高阶组件)
  - [总结](#总结)

## 什么是 React 组件

```javascript
/* 类 */
class textClass {
    sayHello=()=>console.log('hello, my name is alien')
}
/* 类组件 */
class Index extends React.Component{
    state={ message:`hello ，world!` }
    sayHello=()=> this.setState({ message : 'hello, my name is alien' })
    render(){
        return <div style={{ marginTop:'50px' }} onClick={ this.sayHello } > { this.state.message }  </div>
    }
}
/* 函数 */
function textFun (){ 
    return 'hello, world'
}
/* 函数组件 */
function FunComponent(){
    const [ message , setMessage ] = useState('hello,world')
    return <div onClick={ ()=> setMessage('hello, my name is alien')  } >{ message }</div>
```

由上述代码可知，组件本质即是**类**和**函数**，但与常规的类和函数不同的是，**组件承载了渲染视图的 UI 和更新视图的 setState、useState 等方法**。

React 底层逻辑上会像**正常实例化类**和**正常执行函数**那样处理组件。

函数与类的特性在 React 组件上同样具有，比如原型链，继承，静态属性等，不应把 React 组件和 **类、函数** 独立开来。

React 对组件的处理流程

```javascript
// 对于类组件的执行
// 在 react-reconciler/src/ReactFiberClassComponent.js 
function constructClassInstance(
    workInProgress,     // 当前正在工作的 fiber 对象
    ctor,               // 我们的类组件
    props,              // props
) {
    // 实例化我们的类组件，得到组件实例 instance
    const instance = new ctor(props, context);
}

// 对于函数组件的执行
// 在 react-reconciler/src/ReactFiberHooks.js
function renderWithHooks(
    current,            // 当前函数组件对应的 fiber，初始化
    workInProgress,     // 当前正在工作的 fiber 对象
    Component,          // 我们的函数组件
    props,              // 函数组件第一个参数 props
    secondArg,          // 函数组件其他参数
    nextRenderExpirationTime    // 下次渲染过期时间 
) {
    // 执行我们的函数组件，得到函数返回的 React element 对象
    let children = Component(props, secondArg);
}
```

React 调和渲染 fiber 节点时

如果发现 fiber tag = 1 （即是 ClassComponent），则按照类组件逻辑处理

如果发现 fiber tag = 0（即是 FunctionComponent）则按照函数组件逻辑处理

当然 React 也提供了一些内置组件，比如说 Suspense、Profiler

## 两种不同的 React 组件

### class 类组件

#### 类组件的定义

在 class 组件中，除了继承 React.Component，低层还加入了 **updater** 对象。

类组件中调用 setState() 和 forceUpdate() 方法，本质上是调用 updater 对象上的 enqueueSetState() 和 enqueueForceUpdate() 方法。

```javascript
// React 底层定义类组件
// react/src/ReactBaseClasses.js

function Component(props, context, updater) {
  this.props = props;      //绑定props
  this.context = context;  //绑定context
  this.refs = emptyObject; //绑定ref
  this.updater = updater || ReactNoopUpdateQueue; //上面所属的updater 对象
}
/* 绑定setState 方法 */
Component.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
}
/* 绑定forceupdate 方法 */
Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
}
```

如上可以看出 Class Component 底层的处理逻辑为：

- 类组件执行构造函数过程中会在实例绑定 props 和 context
- 初始化置空 refs 属性
- 原型链上绑定 setSate、forceUpdate 方法
  - 本质上是调用 this.updater 的相应方法
- 对于 updater，React 在实例化类组件之后会单独绑定 updater 对象

### Q&A

问：如果没有在类组件的 constructor 的 super 函数中传递 props，那么接下来 constructor 执行上下文中就获取不到 props，这是为什么

```javascript
// 假设在 constructor 这样写
constructor() {
    super();
    console.log(this.props) // => undefined 为什么？
}
```

答：在 Class Component 源码可见，绑定 props 是在父类 Component 构造函数中，执行 super 等于执行 Component 函数，若没有将 props 作为第一个参数传递给 super(), 在 Component 中就会找不到 props 参数，从而变成 undefined

```javascript
/* 解决问题 */
constructor(props){ 
    super(props)
}
```

### 类组件各部分功能

```javascript
class Index extends React.Component{
    constructor(...arg){
       super(...arg)                        /* 执行 react 底层 Component 函数 */
    }
    state = {}                              /* state */
    static number = 1                       /* 内置静态属性 */
    handleClick= () => console.log(111)     /* 方法： 箭头函数方法直接绑定在this实例上 */
    componentDidMount(){                    /* 生命周期 */
        console.log(Index.number,Index.number1) // 打印 1 , 2 
    }
    render(){                               /* 渲染函数 */
        return <div style={{ marginTop:'50px' }} onClick={ this.handerClick }  >hello,React!</div>
    }
}
Index.number1 = 2                           /* 外置静态属性 */
Index.prototype.handleClick = ()=> console.log(222) /* 方法: 绑定在 Index 原型链的 方法*/
```

### Q & A

问：上述绑定了两个 handleClick 方法，那么点击 div 之后会打印什么呢？

答：结果是 111

因为在 class 类内部的箭头函数是绑定在 实例对象上的，而 class 类外部的箭头函数是绑定在 prototype 原型链上的。

而 实例对象的方法会覆盖原型链上的同名方法。

### Function 函数组件

自 React V16.8 hooks 问世以来，对函数组件的功能加以强化，可以在 function 组件中，做类组件一切能做的事情，甚至完全取缔类组件。

```javascript
function Index(){
    console.log(Index.number) // 打印 1 
    const [ message , setMessage  ] = useState('hello,world') /* hooks  */
    return <div onClick={() => setMessage('let us learn React!')  } > { message } </div> /* 返回值 作为渲染ui */
 }
 Index.number = 1 /* 绑定静态属性 */
```

**注**：不要尝试给函数组件 prototype 绑定属性或方法，即是绑定了也没有任何作用，因为通过上面的源码可知，React 对函数组件的调用，是采用直接执行函数的方式，而不是通过 new 的方式。

### 函数组件和类组件的本质区别

- 对于类组件
  - 底层只需要实例化一次，实例中保存了组件的 state 等状态。对于每次一更新只需要调用 render 方法以及对应的生命周期就可以了
- 对于函数组件
  - 每一次更新都是一次新的函数执行，一次函数组件的更新，里面的变量会重新生命
  - 为了能让函数组件可以保存一些状态，执行一些副作用钩子，React Hooks 应运而生，它可以帮助记录 React 中组件的状态，处理一些额外的副作用。

## 组件通信方式

React 一共有 5 中主流的通信方式

1. props 和 callback 方式
2. ref 方式
3. React-redux 或 React-mobx 状态管理方式
4. context 上下文方式
5. event bus 事件总线

### props 和 callback 方式

props 和 callback 可以作为 React 组件最基本的通信方式，父组件可以通过 props 将信息传递给子组件，子组件可以通过执行 props 中的回调函数 callback 来触发父组件的方法，实现父与子的消息通讯。

父组件 --> 通过自身 state 改变，重新渲染，传递 props --> 通知子组件

子组件 --> 通过调用父组件的 callback 方法 --> 通知父组件

```javascript
/* 子组件 */
function Son(props){
    const {  fatherSay , sayFather  } = props
    return <div className='son' >
         我是子组件
        <div> 父组件对我说：{ fatherSay } </div>
        <input placeholder="我对父组件说" onChange={ (e)=>sayFather(e.target.value) }   />
    </div>
}
/* 父组件 */
function Father(){
    const [ childSay , setChildSay ] = useState('')
    const [ fatherSay , setFatherSay ] = useState('')
    return <div className="box father" >
        我是父组件
       <div> 子组件对我说：{ childSay } </div>
       <input placeholder="我对子组件说" onChange={ (e)=>setFatherSay(e.target.value) }   />
       <Son fatherSay={fatherSay}  sayFather={ setChildSay }  />
    </div>
}
```

### event bus 事件总线

利用 eventBus 也可以实现组件通信，但是在 React 中并不提倡用这种方式。

如果说非要用 eventBus，笔者觉得它更适合用于 React 做基础构建的小程序，比如 Taro

```javascript
import { BusService } from './eventBus'
/* event Bus  */
function Son(){
    const [ fatherSay , setFatherSay ] = useState('')
    React.useEffect(()=>{ 
        BusService.on('fatherSay',(value)=>{  /* 事件绑定 , 给父组件绑定事件 */
            setFatherSay(value)
       })
       return function(){  BusService.off('fatherSay') /* 解绑事件 */ }
    },[])
    return <div className='son' >
         我是子组件
        <div> 父组件对我说：{ fatherSay } </div>
        <input placeholder="我对父组件说" onChange={ (e)=> BusService.emit('childSay',e.target.value)  }   />
    </div>
}
/* 父组件 */
function Father(){
    const [ childSay , setChildSay ] = useState('')
    React.useEffect(()=>{    /* 事件绑定 , 给子组件绑定事件 */
        BusService.on('childSay',(value)=>{
             setChildSay(value)
        })
        return function(){  BusService.off('childSay') /* 解绑事件 */ }
    },[])
    return <div className="box father" >
        我是父组件
       <div> 子组件对我说：{ childSay } </div>
       <input placeholder="我对子组件说" onChange={ (e)=> BusService.emit('fatherSay',e.target.value) }   />
       <Son  />
    </div>
```

这样做不仅达到了和使用 props 同样的效果，还能跨层级，不会受 React 父子组件层级的影响，但是为什么很多人都不推荐这种方式呢？缺点如下

- 需要手动绑定和解绑
- 对于小型项目还好，但是对于中大型项目，这种方式的组件通信，会造成牵一发动全身的影响，而且后期难以维护，组件之间的的状态也是未知的。
- 一定程度上违背了 React 数组流向原则

## 组件的强化方式

### 类组件继承

对于类组件的强化，首先想到的是继承方式。因为 React 中类组件，有良好的继承属性，所以可以针对一些基础组件，首先实现一部分基础功能，再针对项目要求进行有方向的**改造、强化、添加额外功能**。

```javascript
/* 人类 */
class Person extends React.Component{
    constructor(props){
        super(props)
        console.log('hello , i am person')
    }
    componentDidMount(){ console.log(1111)  }
    eat(){    /* 吃饭 */ }
    sleep(){  /* 睡觉 */  }
    ddd(){   console.log('打豆豆')  /* 打豆豆 */ }
    render(){
        return <div>
            大家好，我是一个person
        </div>
    }
}
/* 程序员 */
class Programmer extends Person{
    constructor(props){
        super(props)
        console.log('hello , i am Programmer too')
    }
    componentDidMount(){  console.log(this)  }
    code(){ /* 敲代码 */ }
    render(){
        return <div style={ { marginTop:'50px' } } >
            { super.render() } { /* 让 Person 中的 render 执行 */ }
            我还是一个程序员！    { /* 添加自己的内容 */ }
        </div>
    }
}
export default Programmer
```

不难发现通过继承增强类组件的效果很优秀，优势如下：

1. 可以控制父类 render() 方法，还可以添加一下其他的渲染内容
2. 可以共享父类方法，还可以添加额外的方法和属性

**注**：state 和 生命周期会被继承后的组件修改（个人猜测应该是被覆盖了）。上述 demo 中，Person 组件中的 componentDidMount 生命周期将不会被执行。

### 函数组件自定义 Hooks

### HOC 高阶组件

## 总结

- 知道了 React 组件本质
  - UI + update + 常规的类和函数 = React 组件
  - React 对组件的底层处理逻辑
- 明白了函数组件和类组件的区别
- 掌握组件通信方式
- 掌握了组件强化方式
