import { memo, useState } from "react";

import { Upload, message, Form } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

function getBase64(img: any, callback: Function) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const ImageUpload = memo(() => {
  // 获取当前上下文所在的 form 实例
  const form = Form.useFormInstance();

  const [isLoading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setLoading(true);
        setImageUrl(imageUrl);
      });
      const { image_url } = info.file.response;
      // 将 image_url 作为属性值传递给 form.value
      form.setFieldsValue({
        imageUrl: image_url,
      });
    }
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Upload
      name="picture"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="/api/uploadImg"
      beforeUpload={beforeUpload}
      onChange={e => handleChange(e)}>
      {imageUrl ? (
        <img src={imageUrl} alt="预览图片" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
});

export { ImageUpload };
