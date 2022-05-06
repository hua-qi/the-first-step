import { Component, createRef } from "react";

// 类组件
class Children extends Component {
  render = () => <div>hello, world</div>;
}

/*
// TODO ref 属性值是一个字符串
class Index extends Component {
  componentDidMount() {
    console.log(this.refs);
  }
  render = () => (
    <div>
      <div ref="currentDOM">字符串模式获取元素组件</div>
      <Children ref="currentComInstance" />
    </div>
  );
}

*/

/* 
// TODO ref 属性值是一个函数
class Index extends Component {
  currentDOM = null;
  currentComInstance = null;

  componentDidMount() {
    console.log(this.currentDOM);
    console.log(this.currentComInstance);
  }

  render = () => (
    <div>
      <div ref={node => (this.currentDOM = node)}>Ref 模式获取元素或组件</div>
      <Children ref={node => (this.currentComInstance = node)} />
    </div>
  );
}

*/

// TODO ref 属性值是一个 Ref 对象
class Index extends Component {
  currentDOM = createRef(null);
  currentComInstance = createRef(null);

  componentDidMount() {
    console.log(this.currentDOM);
    console.log(this.currentComInstance);
  }
  render = () => (
    <div>
      <div ref={this.currentDOM}>Ref 对象模式获取元素或组件</div>
      <Children ref={this.currentComInstance} />
    </div>
  );
}

export default Index;
