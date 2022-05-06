import { PureComponent, useRef, useState } from "react";

// 子组件
class Son extends PureComponent {
  state = {
    fatherMes: "",
    sonMes: "",
  };

  // 提供给父组件的 API
  fatherSay = fatherMes => this.setState({ fatherMes });

  render() {
    const { toFather } = this.props;
    const { fatherMes, sonMes } = this.state;

    return (
      <div>
        <div>子组件</div>
        <p>父组件对我说：{fatherMes}</p>
        <div>我对父组件说：</div>
        <input onChange={e => this.setState({ sonMes: e.target.value })} />
        <button onClick={() => toFather(sonMes)}>to father</button>
      </div>
    );
  }
}

// 父组件
const Father = () => {
  const [sonMes, setSonMes] = useState("");
  const sonInstance = useRef(null);
  const [fatherMes, setFatherMes] = useState("");
  // 调用子组件实例方法
  const toSon = () => sonInstance.current.fatherSay(fatherMes);

  return (
    <div>
      <div>父组件</div>
      <p>子组件对我说：{sonMes}</p>
      <div>我对子组件说：</div>
      <input onChange={e => setFatherMes(e.target.value)} />
      <button onClick={toSon}>to son</button>
      <Son ref={sonInstance} toFather={setSonMes} />
    </div>
  );
};

export default Father;
