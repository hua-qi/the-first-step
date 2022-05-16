import Mock from "mockjs";

// 上传图片
Mock.mock("/api/uploadImg", "post", (options: any) => {
  // options 请求相关参数
  console.log(options);

  return Mock.mock({
    code: 200,
    status: "done",
    message: "上传成功",
    image_url: "@image('@integer', '#894FC4', 'huaqi', 'png', 'image')",
  });
});
