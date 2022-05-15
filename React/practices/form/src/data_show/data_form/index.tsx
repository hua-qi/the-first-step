import { FC, memo, useState } from "react";
import { Radio, Input, Button } from "antd";

import { ImageUpload } from "../../components/form";
import "antd/dist/antd.css";

import type { IValidator } from "../../tools";
import { regexpValidator } from "../../tools";
import { StyledForm } from "./styled";
const { Item } = StyledForm;

const formInitialValues = {
  type: "color",
  text: "汉字",
  key: "english",
  value: "#fff",
};

const CHNameValidator: IValidator = regexpValidator(
  "[^\x00-\xff]",
  "请输入合法的中文名称"
);

const ENNameValidator: IValidator = regexpValidator(
  "^[_a-zA-Z][_a-zA-Z0-9]*$",
  "请输入合法的英文名称"
);

const colorValidator: IValidator = regexpValidator(
  "^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$",
  "请输入合法的 16 进制颜色值"
);

const DataForm: FC = memo(() => {
  const [type, setType] = useState("color");

  const typeChange = (e: any) => {
    setType(e.target.value);
  };

  const onFinish = (values: any) => {
    const { key, type, text, value } = values;

    const formatValue: any = {
      [`${key}`]: {
        type,
        text,
        value,
      },
    };
    console.log("Sucess: ", formatValue);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed: ", errorInfo);
  };

  return (
    <StyledForm
      name="designForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={formInitialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <Item
        label="类型"
        name="type"
        rules={[
          {
            required: true,
            message: "请选择类型",
          },
        ]}>
        <Radio.Group
          name="type_group"
          value={type}
          onChange={e => typeChange(e)}>
          <Radio value={"color"}> color </Radio>
          <Radio value={"theme"}> theme </Radio>
        </Radio.Group>
      </Item>
      <Item
        label="中文名称"
        name="text"
        rules={[
          {
            required: true,
            message: "请填写中文名称",
          },
          {
            validator: CHNameValidator,
          },
        ]}>
        <Input />
      </Item>
      <Item
        label="英文名称"
        name="key"
        rules={[
          {
            required: true,
            message: "请填写英文名称",
          },
          {
            validator: ENNameValidator,
          },
        ]}>
        <Input />
      </Item>
      {type === "color" ? (
        <Item
          label="内容"
          name="value"
          rules={[
            {
              required: true,
              message: "请填写 16 进制颜色值",
            },
            {
              validator: colorValidator,
            },
          ]}>
          <Input />
        </Item>
      ) : (
        <Item label="内容" name="value">
          <ImageUpload />
        </Item>
      )}
      <Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}>
        <Button type="primary" htmlType="submit">
          提 交
        </Button>
      </Item>
    </StyledForm>
  );
});

export { DataForm };
