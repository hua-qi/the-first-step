import {
  useImperativeHandle,
  useState,
  useRef,
  forwardRef,
  Component,
} from "react";

function Son(props, ref) {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  useImperativeHandle(
    ref,
    () => {
      const handleRefs = {
        // 声明方法用于聚焦 input 框
        onFocus() {
          inputRef.current.focus();
        },
        // 声明方法用于改变 input 的值
        onChangeValue(value) {
          setInputValue(value);
        },
      };

      return handleRefs;
    },
    []
  );

  return (
    <div>
      <input
        placeholder="请输入内容"
        ref={inputRef}
        value={inputValue}
        readOnly
      />
    </div>
  );
}

const ForwardSon = forwardRef(Son);

// 父组件
class Index extends Component {
  cur = null;
  handleClick() {
    const { onFocus, onChangeValue } = this.cur;
    onFocus();
    onChangeValue("let us learn React! ");
  }

  render() {
    return (
      <div>
        <ForwardSon ref={node => (this.cur = node)} />
        <button onClick={this.handleClick.bind(this)}>操控子组件</button>
      </div>
    );
  }
}

export default Index;
