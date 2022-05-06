import { Component, forwardRef, useEffect, useRef } from "react";

import { Form } from "../深入 props 实践-Form_FormItem/Class_Form";

// index 组件
class Index extends Component {
  form = null;
  button = null;

  componentDidMount() {
    const { forwardRef } = this.props;
    forwardRef.current = {
      form: this.form,
      index: this,
      button: this.button,
    };
  }

  render() {
    return (
      <div>
        <button ref={node => (this.button = node)}>点 击</button>
        <Form ref={node => (this.form = node)} />
      </div>
    );
  }
}

const ForwardIndex = forwardRef((props, ref) => (
  <Index {...props} forwardRef={ref} />
));

// home 组件
function Home() {
  const ref = useRef(null);
  useEffect(() => {
    console.log(ref.current);
  }, []);

  return <ForwardIndex ref={ref} />;
}

export default Home;
