import React, {
  Children,
  cloneElement,
  Component,
  ReactElement,
  FC,
} from "react";

type ValueType = string | number;

type ReactChildrenType = {
  type: {
    displayName: string;
  };
} & ReactElement;

interface IFormState {
  formData: Record<string, string>;
}

interface IFormItem {
  name: string;
  label: string;
  value?: ValueType;
  handleChange?: (name: string, value: ValueType) => void;
  children?: ReactChildrenType;
}

interface IInput {
  itemChange?: (value: ValueType) => void;
  value?: ValueType;
}

// Input 组件 ===================================
const Input = ({ itemChange, value }: IInput) => {
  return (
    <input
      className="input"
      onChange={e => itemChange && itemChange(e.target.value)}
      value={value}
    />
  );
};
Input.displayName = "Input";

// FormItem 组件 ===============================
const FormItem: FC<IFormItem> = props => {
  const { children, name, handleChange, value, label } = props;

  const itemChange = (value: string | number) => {
    handleChange && handleChange(name, value);
  };

  return (
    <div className="form">
      <span className="label">{label}: </span>
      {React.isValidElement(children) && children.type.displayName === "Input"
        ? cloneElement(children, { itemChange, value })
        : null}
    </div>
  );
};
FormItem.displayName = "FormItem";

// Form 组件 ========================================
class Form extends Component {
  state = {
    formData: {},
  } as IFormState;

  static displayName = "Form";

  // 用于提交表单数据
  submitForm = (cb: Function) => cb({ ...this.state.formData });

  // 重置表单数据
  resetForm = () => {
    const { formData } = this.state;

    Object.keys(formData).forEach(item => (formData[item] = ""));

    this.setState({
      formData,
    });
  };

  // 设置表单数据层
  setValue = (name: string, value: ValueType) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  render() {
    const { children } = this.props;

    const renderChildren = Children.map(
      children as ReactChildrenType[],

      (child: ReactChildrenType) => {
        if (child && child.type.displayName === "FormItem") {
          const { name } = child.props;
          // 克隆 FormItem 节点，并混入改变表单元素的方法
          const Children = cloneElement(
            child,
            {
              key: name, // 加入 key，提升渲染效率
              handleChange: this.setValue, // 用于改变 value
              value: this.state.formData[name] || "", // value 值
            },
            child.props.children
          );
          return Children;
        }
      }
    );

    return renderChildren;
  }
}

export { Form, FormItem, Input };
