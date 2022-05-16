import { FC, memo, useState } from "react";
import { Form, Radio, Input, Button } from "antd";

import { ImageUpload } from "../../components/form";

import type { IValidator } from "../../tools";
import type { IAddData } from "../type";
import { regexpValidator } from "../../tools";
import { StyledForm } from "./styled";
const { Item } = StyledForm;

const formInitialValues = {
  type: "color",
  text: "",
  englishText: "",
  value: "",
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

const widthValidator: IValidator = regexpValidator(
  "^\\d+((px)|%)?$",
  "请输入合法的宽度值"
);
const heightValidator: IValidator = regexpValidator(
  "^\\d+((px)|%)?$",
  "请输入合法的高度值"
);

type PropsType = {
  addColorData: IAddData;
  addImageData: IAddData;
};

const DataForm: FC<PropsType> = memo(props => {
  // 获取父组件添加数据方法
  const { addColorData, addImageData } = props;
  // 获取当前组件实例（主要用于与 ImageUpload 组件做数据交互）
  const [form] = Form.useForm();
  const [type, setType] = useState("color");
  const [formatValue, setFormatValue] = useState<any>({});
  // 打印现有数据
  console.log(formatValue);

  const typeChange = (e: any) => {
    setType(e.target.value);
  };

  const onFinish = (values: any) => {
    const { englishText, type, text, value, imageUrl, width, height } = values;

    if (value) {
      addColorData({ key: Math.random(), type, text, value });
      setFormatValue({
        [englishText]: {
          type,
          text,
          value,
        },
        ...formatValue,
      });
    } else {
      addImageData({
        key: Math.random(),
        type,
        text,
        src: imageUrl,
        width,
        height,
      });
      setFormatValue({
        [englishText]: {
          type,
          text,
          value: {
            imageUrl,
            width,
            height,
          },
          ...formatValue,
        },
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed: ", errorInfo);
  };

  return (
    <StyledForm
      name="designForm"
      form={form}
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
        name="englishText"
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
          label="颜色值"
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
        <>
          <Item
            label="图片"
            name="imageUrl"
            rules={[
              {
                required: true,
                message: "请上传图片",
              },
            ]}>
            <ImageUpload />
          </Item>
          <Item
            label="宽度"
            name="width"
            rules={[
              {
                required: true,
                message: "请填写宽度值",
              },
              {
                validator: widthValidator,
              },
            ]}>
            <Input />
          </Item>
          <Item
            label="高度"
            name="height"
            rules={[
              {
                required: true,
                message: "请填写高度值",
              },
              {
                validator: heightValidator,
              },
            ]}>
            <Input />
          </Item>
        </>
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
