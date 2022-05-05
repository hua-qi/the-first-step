import { useRef } from "react";

// import { Form, FormItem, Input } from "./Class_Form";
import { Form, FormItem, Input } from "./Class_TS_Form.tsx";

const Index = () => {
  const form = useRef(null);

  const submit = () => {
    // 表单提交
    form.current.submitForm(formValue => console.log(formValue));
  };
  const reset = () => {
    // 表单重置
    form.current.resetForm();
  };

  return (
    <div className="box">
      <Form ref={form}>
        <FormItem name="name" label="我是">
          <Input />
        </FormItem>
        <FormItem name="mes" label="我想对大家说">
          <Input />
        </FormItem>
        <Input placeholder="不需要的 input" />
      </Form>
      <div className="btns">
        <button className="submit_btn" onClick={submit}>
          提 交
        </button>
        <button className="concel_btn" onClick={reset}>
          重 置
        </button>
      </div>
    </div>
  );
};

export default Index;
