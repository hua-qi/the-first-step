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
