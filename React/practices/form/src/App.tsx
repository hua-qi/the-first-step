import { memo } from "react";

import { DataTable } from "./data_show";
import "./init.css";
import "antd/dist/antd.css";

export default memo(() => {
  return (
    <>
      <DataTable />
    </>
  );
});
