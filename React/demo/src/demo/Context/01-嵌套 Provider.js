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
