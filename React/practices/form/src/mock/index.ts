import Mock from "mockjs";

// 上传图片
Mock.mock("/api/uploadImg", "post", (options: any) => {
  // options 请求相关参数
  console.log(options);

  return Mock.mock({
    status: 200,
  });
});
