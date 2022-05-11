import {
  createContext,
  memo,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

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

export default ProviderDemo;
