import React from "react";

const toLearn = ["react", "vue", "webpack", "nodejs"];

const TextComponent = () => <div> hello , i am function component </div>;

class Index extends React.Component {
  status = false; /* 状态 */
  renderFoot = () => <div> i am foot</div>;
  //  控制渲染
  controlRender = () => {
    /* 以下都是常用的jsx元素节 */
    const reactElement = (
      <div style={{ marginTop: "100px" }}>
        {/* element 元素类型 */}
        <div>hello,world</div>
        {/* fragment 类型 */}
        <React.Fragment>
          <div> 👽👽 </div>
        </React.Fragment>
        {/* text 文本类型 */}
        my name is alien
        {/* 数组节点类型 */}
        {toLearn.map(item => (
          <div key={item}>let us learn {item} </div>
        ))}
        {/* 组件类型 */}
        <TextComponent />
        {/* 三元运算 */}
        {this.status ? <TextComponent /> : <div>三元运算</div>}
        {/* 函数执行 */}
        {this.renderFoot()}
        <button onClick={() => console.log(this.render())}>
          打印render后的内容
        </button>
      </div>
    );

    console.log(reactElement);
    const { children } = reactElement.props;
    // 1. 扁平化 children
    const flatChilren = React.Children.toArray(children);
    console.log(flatChilren);

    // 2. 去除文本节点
    const newChildren = [];
    React.Children.forEach(flatChilren, item => {
      if (React.isValidElement(item)) {
        newChildren.push(item);
      }
    });

    // 3. 插入新的节点
    const lastChild = React.createElement(
      "div",
      { className: "last" },
      "say goodbye"
    );
    newChildren.push(lastChild);

    // 4. 修改容器节点
    const newReactElement = React.cloneElement(
      reactElement,
      {},
      ...newChildren
    );
    return newReactElement;
  };

  render() {
    return this.controlRender();
  }
}

export { Index };
