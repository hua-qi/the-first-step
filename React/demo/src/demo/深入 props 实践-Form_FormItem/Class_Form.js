import { Component, Children, cloneElement, isValidElement } from "react";

// Form 组件

class Form extends Component {
  state = {
    formData: {},
  };

  // 用于提交表单数据
  submitForm = cb => cb({ ...this.state.formData });

  // 重置表单数据
  resetForm = () => {
    const { formData } = this.state;

    Object.keys(formData).forEach(item => (formData[item] = ""));

    this.setState({
      formData,
    });
  };

  // 设置表单数据层
  setValue = (name, value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  render() {
    const { children } = this.props;
    const renderChildren = [];

    Children.forEach(children, child => {
      if (child.type.displayName === "FormItem") {
        const { name } = child.props;
        // 克隆 FormItem 节点，混入改变表单元素的方法
        const new_child = cloneElement(
          child,
          {
            key: name, // 加入 key，提升渲染效率
            handleChange: this.setValue, // 用户改变value
            value: this.state.formData[name] || "", // value 值
          },
          child.props.children
        );

        renderChildren.push(new_child);
      }
    });

    return renderChildren;
  }
}

// 添加组件类型 type
Form.displayName = "Form";

/* 
设计思想：
1. 考虑到 <From> 在不适用 forwardRef 的前提下，最好使用类组件，只有类组件才能获取实例；
2. 创建一个 state 下的 formData 属性，用于收集表单状态
3. 封装 重置表单、提交表单、改变表单元素 的方法
4. 过滤掉除了 FormItem 元素之外的其他元素
5. 克隆 FormItem 节点，将改变表单单元项的方法 handleChange 和表单值 value 混入 props 中
 */

/* 
如果辨别该元素是否为 FormItem？
可以给函数组件或者类组件绑定静态属性用于证明它的身份，然后在遍历 props.children 的时候就可以在 React element 的 type 属性（类或函数组件本身）上，验证这个身份
在 该 demo 中，给函数绑定了 displayName 属性，用于身份证明
 */

// ============================================

// FormItem 组件
function FormItem(props) {
  const { children, name, handleChange, value, label } = props;

  // 通知父组件 Form，value 已经改变
  const itemChange = value => handleChange(name, value);

  return (
    <div className="form">
      <span className="label">{label}: </span>
      {isValidElement(children) && children.type.displayName === "Input"
        ? cloneElement(children, { itemChange, value })
        : null}
    </div>
  );
}

FormItem.displayName = "FormItem";

/* 
设计思想：
1. FormItem 一定要绑定 displayName 属性，供 <Form> 识别 <FormItem />
2. 声明 onChange 方法，通过 props 提供给 <Input>，作为改变 value 的回调函数
3. FormItem 过滤掉除了 input 以外的其他元素
 */

// ===========================================

// Input 组件
function Input({ itemChange, value }) {
  return (
    <input
      className="input"
      value={value}
      onChange={e => itemChange && itemChange(e.target.value)}
    />
  );
}
Input.displayName = "Input";

/* 
设计思想：
1. 绑定 displayName 标识 input
2. input DOM 元素，绑定 itemChange 给 onChange 事件，用于传递 value
 */

export { Form, FormItem, Input };
