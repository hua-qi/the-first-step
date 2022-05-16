import { FC, memo, useState, useEffect } from "react";
import { Table, Space, Button, Modal } from "antd";

import { ICol, IDataItem, IAddData } from "../type";
import { DataForm } from "../index";

const color_columns: ICol[] = [
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "描述",
    dataIndex: "text",
    key: "text",
  },
  {
    title: "内容",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "操作",
    key: "index",
    render: (text: string, record: Object) => {
      return (
        <Space size="middle">
          <Button onClick={e => changeData(e, text)}>修改</Button>
          <Button>删除</Button>
        </Space>
      );
    },
  },
];

const changeData = (e: any, text: any) => {};

const color_data: IDataItem[] = [
  {
    key: 1,
    type: "color",
    text: "主题色-高亮色",
    value: "#c1422f",
  },
  {
    key: 2,
    type: "color",
    text: "背景底部⾊",
    value: "#FF752B",
  },
];

const image_columns: ICol[] = [
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "描述",
    dataIndex: "text",
    key: "text",
  },
  {
    title: "链接",
    dataIndex: "src",
    key: "src",
  },
  {
    title: "宽度值",
    dataIndex: "width",
    key: "width",
  },
  {
    title: "高度值",
    dataIndex: "height",
    key: "height",
  },
  {
    title: "操作",
    key: "index",
    render: (text: string, record: Object) => {
      return (
        <Space size="middle">
          <a href="/#">修改</a>
          <a href="/#">删除</a>
        </Space>
      );
    },
  },
];

const image_data: IDataItem[] = [
  {
    key: 1,
    type: "image",
    text: "通⽤背景a-顶部图⽚",
    src: "https://lofter.lf127.net/1650274089811/bg_a_top.png",
    width: "100%",
    height: "12px",
  },
  {
    key: 2,
    type: "image",
    text: "通⽤背景a-顶部图⽚",
    src: "https://lofter.lf127.net/1650274089811/bg_a_top.png",
    width: "100%",
    height: "12px",
  },
  {
    key: 3,
    type: "image",
    text: "通⽤背景a-顶部图⽚",
    src: "https://lofter.lf127.net/1650274089811/bg_a_top.png",
    width: "100%",
    height: "12px",
  },
];

const DataTable: FC = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
  const [isColorTable, setColorTable] = useState<boolean>(true);
  const [colorCol] = useState<ICol[]>([...color_columns]);
  const [imageCol] = useState<ICol[]>([...image_columns]);
  const [columns, setColumns] = useState<any[]>();
  const [colorData, setColorData] = useState<IDataItem[]>([...color_data]);
  const [imageData, setImageData] = useState<IDataItem[]>([...image_data]);
  const [data, setData] = useState<IDataItem[]>();

  useEffect(() => {
    if (isColorTable) {
      setColumns([...colorCol]);
      setData([...colorData]);
    } else {
      setColumns([...imageCol]);
      setData([...imageData]);
    }
  }, [colorCol, colorData, imageCol, imageData, isColorTable]);

  const addColorData: IAddData = newData => {
    setColorData([newData, ...colorData]);
  };
  const addImageData: IAddData = newData => {
    setImageData([newData, ...imageData]);
  };

  return (
    <>
      <Button onClick={() => setColorTable(!isColorTable)}>切换类型</Button>
      <Button onClick={() => setIsModalVisible(!isModalVisible)}>
        新增数据
      </Button>
      <Modal
        title="添加数据表单"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(!isModalVisible)}
        onCancel={() => setIsModalVisible(!isModalVisible)}>
        <DataForm addColorData={addColorData} addImageData={addImageData} />
      </Modal>
      <Table columns={columns} dataSource={data} />;
    </>
  );
});

export { DataTable };
