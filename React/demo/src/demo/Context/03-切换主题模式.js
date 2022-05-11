import { createContext, PureComponent, useContext, useState } from "react";

const ThemeContext = createContext(null);
const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;

// 主题
const theme = {
  dark: {
    color: "#1890ff",
    background: "#1890ff",
    border: "1px solid blue",
    type: "dark",
  },
  light: {
    color: "#fc4838",
    background: "#fc4838",
    border: "1px solid pink",
    type: "light",
  },
};

// input 输入框 - useContext 模式
function Input(props) {
  const { color, border } = useContext(ThemeContext);
  const { label, placeholder } = props;

  return (
    <div>
      <label style={{ color }}>{label}</label>
      <input placeholder={placeholder} style={{ border }} />
    </div>
  );
}

// 容器组件 - Consumer 模式
function Box(props) {
  return (
    <ThemeConsumer>
      {ThemeContextValue => {
        const { color, border } = ThemeContextValue;
        return <div style={{ color, border }}>{props.children}</div>;
      }}
    </ThemeConsumer>
  );
}

function Checkbox(props) {
  const { type, color } = useContext(ThemeContext);
  const { label, name, onChange } = props;

  return (
    <div onClick={onChange}>
      <label htmlFor="name">{label}</label>
      <input
        type="checkbox"
        id={name}
        value={type}
        checked={type === name}
        style={{ color }}
        readOnly
      />
    </div>
  );
}

// contextType 模式
class App extends PureComponent {
  static contextType = ThemeContext;

  render() {
    const { border, setTheme, color, background } = this.context;

    return (
      <div style={{ border, color }}>
        <div>
          <span>选择主题：</span>
          <Checkbox
            label="light"
            name="light"
            onChange={() => setTheme(theme.light)}
          />
          <Checkbox
            label="dark"
            name="dark"
            onChange={() => setTheme(theme.dark)}
          />
        </div>
        <div>
          <Box>
            <Input label="姓名：" placeholder="请输入姓名" />
            <Input label="年龄：" placeholder="请输入年龄" />
            <button style={{ background }}>确 定</button>
            <button style={{ color }}>取 消</button>
          </Box>
          <Box>
            <div style={{ color: "#fff", background }}>
              I am huaqi <br />
              Let us learn React!
            </div>
          </Box>
        </div>
      </div>
    );
  }
}

function Index() {
  const [ThemeContextValue, setThemeContext] = useState(theme.dark);

  return (
    <ThemeProvider
      value={{
        ...ThemeContextValue,
        setTheme: setThemeContext,
      }}>
      <App />
    </ThemeProvider>
  );
}

export default Index;
