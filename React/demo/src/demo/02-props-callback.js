import { useState } from "react";

function Son(props) {
  const { fatherSay, sonSay } = props;

  return (
    <div>
      <div>我是子组件，我对父组件说</div>
      <input onChange={e => sonSay(e.currentTarget.value)} />
      <div>父组件对我说：{fatherSay}</div>
    </div>
  );
}

function Father() {
  const [fatherSay, setFatherSay] = useState("");
  const [sonSay, setSonSay] = useState("");

  return (
    <div>
      <div>我是父组件，我对子组件说</div>
      <input onChange={e => setFatherSay(e.currentTarget.value)} />
      <div>子组件对我说：{sonSay}</div>
      <hr />
      <Son fatherSay={fatherSay} sonSay={setSonSay} />
    </div>
  );
}

export default Father;
