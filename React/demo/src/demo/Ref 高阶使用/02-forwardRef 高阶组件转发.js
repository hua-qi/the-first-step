import React, { Component, forwardRef, useEffect, useRef } from "react";

function HOC(Component) {
  class Warp extends React.Component {
    render() {
      const { forwardedRef, ...ortherProps } = this.props;

      return <Component ref={forwardedRef} {...ortherProps} />;
    }
  }

  return forwardRef((props, ref) => <Warp forwardedRef={ref} {...props} />);
}

class Index extends Component {
  render() {
    return <div>hello, world</div>;
  }
}

const HocIndex = HOC(Index);

const Home = () => {
  const node = useRef(null);

  useEffect(() => {
    // 获取到 Index 组件实例，而不是 Warp 组件实例
    console.log(node.current);
  }, []);

  return (
    <div>
      <HocIndex ref={node} />
    </div>
  );
};

export default Home;
