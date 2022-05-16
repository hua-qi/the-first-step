interface ICol {
  title: string;
  dataIndex?: string;
  key: string;
  render?: Function;
}

interface IDataItem {
  key: number | Symbol;
  type: string;
  text: string;
  value?: string;
  src?: string;
  width?: string;
  height?: string;
}

interface IAddData {
  (newData: IDataItem): void;
}

export type { ICol, IDataItem, IAddData };
