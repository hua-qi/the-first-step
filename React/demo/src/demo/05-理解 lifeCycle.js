import { useEffect, useState } from "react";

function FunctionLifeCycle(props) {
  const [num, setNum] = useState(0);

  useEffect(() => {
    // 请求数据、事件监听、操纵 DOM、增加定时器和延时器
    console.log("组件挂载完成：componentDidMount");

    return function componentWillUnmount() {
      // 去除事件监听、清除定时器和延时器
      console.log("组件销毁：componentWillUnmount");
    };
  }, []); // dep = []

  useEffect(() => {
    console.log("props 变化：componentWillReceiveProps");
  }, [props]);

  useEffect(() => {
    console.log("组件更新完成：componentDidUpdate");
  });

  return (
    <div>
      <div>props: {props.number}</div>
      <div>states: {num}</div>
      <button onClick={() => setNum(num => num + 1)}>改变 state</button>
    </div>
  );
}

function Index() {
  const [number, setNumber] = useState(0);
  const [isRender, setRender] = useState(true);

  return (
    <div>
      {isRender && <FunctionLifeCycle number={number} />}
      <button onClick={() => setNumber(number => number + 1)}>
        改变 props{" "}
      </button>
      <button onClick={() => setRender(false)}>卸载组件</button>
    </div>
  );
}

export default Index;
