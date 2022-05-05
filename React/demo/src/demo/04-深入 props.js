import React from "react";

// children
function ChildrenComponent() {
  return <div>In this chapter, let's learn about react props!</div>;
}

// props 接受处理
class PropsComponent extends React.Component {
  componentDidMount() {
    console.log(this, "_this");
  }

  render() {
    // 解构获取参数
    const { children, mes, renderName, say, Component } = this.props;

    const [renderFunction, renderComponent] = children;

    // 对于子组件，不同的 props 应怎么被处理
    return (
      <div>
        {renderFunction()}
        {mes}
        {renderName()}
        {renderComponent}
        <Component />
        <button onClick={() => say()}> change content</button>
      </div>
    );
  }
}

// props 定义绑定
class Index extends React.Component {
  state = {
    mes: "hello, React",
  };
  node = null;
  say = () => this.setState({ mes: "let us learn React!" });

  render() {
    return (
      <div>
        <PropsComponent
          mes={this.state.mes} // ① props 作为一个渲染数据源
          say={this.say} // ② props 作为一个回调函数
          Component={ChildrenComponent} // ③ props 作为一个组件
          renderName={() => <div>my name is huaqi </div>} // ④ props 作为渲染函数
        >
          {/* ⑤ render props */}
          {() => <div>hello, world</div>}
          {/* ⑥ render component */}
          <ChildrenComponent />
        </PropsComponent>
      </div>
    );
  }
}

export default Index;
