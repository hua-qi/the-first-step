import { Component } from "react";

/* 
// 点击按钮，会打印 null、div 
class Index extends Component {
  state = {
    name: 0,
  };
  ref_node = null;
  
  render() {
    return (
      <>
      <div
      ref={node => {
        this.ref_node = node;
        console.log("此时的 Ref 是什么：", this.ref_node);
      }}>
      ref 元素节点
      </div>
      <button onClick={() => this.setState({ num: this.state.num + 1 })}>
      点 击
      </button>
      </>
      );
    }
  }
*/

// 此时点击按钮更新视图时，由于 ref 指向相同的函数 getDom() 并不会生成 Ref 标签，不会更新 Ref 逻辑
class Index extends Component {
  state = {
    name: 0,
  };
  ref_node = null;

  getDom = node => {
    this.ref_node = node;
    console.log("此时的参数是什么：", this.ref_node);
  };

  render() {
    return (
      <div>
        <div ref={this.getDom}>ref 元素节点</div>
        <button onClick={() => this.setState({ num: this.setState.name + 1 })}>
          点 击
        </button>
      </div>
    );
  }
}

export default Index;
