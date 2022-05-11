# 提供者 context -- 高阶实践

## 目录

- [提供者 context -- 高阶实践](#提供者-context----高阶实践)
  - [目录](#目录)
  - [嵌套 Provider](#嵌套-provider)
  - [逐层传递 Provider](#逐层传递-provider)
  - [Provider 特性总结](#provider-特性总结)

## 嵌套 Provider

多个 Provider 之间可以相互嵌套，用于保存/切换一些全局数据

```javascript
import { createContext, memo, useLayoutEffect, useState } from "react";

const ThemeContext = createContext(null);
const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;

const LanContext = createContext(null);
const LanProvider = LanContext.Provider;
const LanConsumer = LanContext.Consumer;

function ConsumerDemo() {
  return (
    <ThemeConsumer>
      {themeContextValue => (
        <LanConsumer>
          {lanContextValue => {
            const { color, background } = themeContextValue;

            return (
              <div style={{ color, background }}>
                {lanContextValue === "CN"
                  ? "大家好，让我们一起学 React"
                  : "Hello, let us learn React "}
              </div>
            );
          }}
        </LanConsumer>
      )}
    </ThemeConsumer>
  );
}

const Son = memo(() => <ConsumerDemo />);

const themeList = [
  {
    color: "blue",
    background: "pink",
  },
  {
    color: "white",
    background: "blue",
  },
];

const lanList = ["CN", "EN"];

function ProviderDemo() {
  const [themeOrder, setThemeOrder] = useState(0);
  const [themeContextValue, setThemeContextValue] = useState(
    themeList[themeOrder]
  );

  const [lanOrder, setLanOrder] = useState(0);
  const [lanContextValue, setLanContextValue] = useState(lanList[lanOrder]);

  useLayoutEffect(() => {
    console.log(themeOrder);
    setThemeContextValue(themeList[themeOrder]);
    setLanContextValue(lanList[lanOrder]);
  }, [themeOrder, lanOrder]);

  return (
    <>
      <ThemeProvider value={themeContextValue}>
        <LanProvider value={lanContextValue}>
          <Son />
        </LanProvider>
      </ThemeProvider>
      <button onClick={() => setThemeOrder((themeOrder + 1) % 2)}>
        切换 主题
      </button>
      <button onClick={() => setLanOrder((lanOrder + 1) % 2)}>切换 语言</button>
    </>
  );
}

export default ProviderDemo;

```

- ThemeContext 保存主题信息、LanContext 保存语言信息
- 使用两个 Provider 嵌套用于传递全局信息
- 使用两个 Consumer 嵌套用于接受信息

## 逐层传递 Provider

Provider 拥有一个良好的特性，即可以逐层传递 context，也就是说，一个 context 可以使用多个 Provider 传递，下一层级的 Provider 会覆盖上一层级的 Provider。

React-redux 中的 connect 就是使用的这个特性用于传递订阅器。

```javascript
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);
const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;

function Son2() {
  return (
    <ThemeConsumer>
      {themeContextValue => {
        const { color, background } = themeContextValue;
        return <div style={{ color, background }}>第二层 consumer</div>;
      }}
    </ThemeConsumer>
  );
}

function Son1() {
  const { color, background } = useContext(ThemeContext);
  const [themeContextValue2] = useState({
    color: "white",
    background: "blue",
  });

  // 第二层 Provider 传递内容
  return (
    <div style={{ color, background }}>
      <p>第一层 consumer</p>
      <ThemeProvider value={themeContextValue2}>
        <Son2 />
      </ThemeProvider>
    </div>
  );
}

function ProviderDemo() {
  const [themeContextValue] = useState({
    color: "orange",
    background: "pink",
  });

  // 第一层 Provider 传递内容
  return (
    <ThemeProvider value={themeContextValue}>
      <Son1 />
    </ThemeProvider>
  );
}

export default ProviderDemo;

```

- 全局只有一个 ThemeContext，两次使用同一个 ThemeProvider 传递不同的 context
- 组件获取 context，会获取离当前组件最近的上一层 Provider 提供的 context
- 下一层的 Provider 提供的内容会覆盖 上一层的 Provider

## Provider 特性总结

1. Provider 作为提供者传递 context，provider 中 value 属性值的改变会使所有消费该 context 的组件重新更新
2. Provider 可以逐层传递 context，下一层 Provider 会覆盖上一层 Provider