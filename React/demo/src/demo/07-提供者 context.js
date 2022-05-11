import { Component, createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);
const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;

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

export default ProviderDemo;
