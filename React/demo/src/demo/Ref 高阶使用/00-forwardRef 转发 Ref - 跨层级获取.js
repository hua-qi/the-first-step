import { Component, forwardRef } from "react";

// 孙组件
function Son(props) {
  const { grandRef } = props;
  return (
    <div>
      <div>I am huaqi</div>
      <span ref={grandRef}>这个是 grandFather 组件想要获取的元素</span>
    </div>
  );
}

// 父组件
class Father extends Component {
  render() {
    return (
      <div>
        <Son grandRef={this.props.grandRef} />
      </div>
    );
  }
}

// 使用 forwardRef 处理 Father 组件
const ForwardFather = forwardRef((props, ref) => {
  // 将祖父组件的 Ref 混入到 父组件的 props 中
  return <Father grandRef={ref} {...props} />;
});

// 祖父组件
class GrandFather extends Component {
  forward_node = null;
  componentDidMount() {
    // 打印 span
    console.log(this.forward_node);
  }
  render() {
    return (
      <div>
        <ForwardFather ref={node => (this.forward_node = node)} />
      </div>
    );
  }
}

export default GrandFather;
