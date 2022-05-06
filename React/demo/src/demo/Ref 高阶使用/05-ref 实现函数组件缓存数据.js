import { useEffect, useRef } from "react";

const toLearn = [
  {
    type: 1,
    mes: "let us learn React!",
  },
  {
    type: 2,
    mes: "let use learn Vue3.0",
  },
];

function Index({ id }) {
  const typeInfo = useRef(toLearn[0]);

  const changeType = info => {
    // typeInfo 的改变，不需要视图更新
    typeInfo.current = info;
  };

  useEffect(() => {
    if (typeInfo.current.type === 1) {
      console.log("type === 1");
    } else {
      console.log("type === 2");
    }
  }, [id]); // 无需将 typeInfo 作为依赖项

  return (
    <div>
      {toLearn.map(item => (
        <button key={item.type} onClick={changeType.bind(null, item)}>
          {item.mes}
        </button>
      ))}
    </div>
  );
}

export default Index;
