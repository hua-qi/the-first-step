import { memo } from "react";

import { ColorTable, ImageTable } from "./data_show/data_table";
import { DataForm } from "./data_show";
import "./init.css";

export default memo(() => {
  return (
    <>
      <DataForm />
      <ColorTable />
      <ImageTable />
    </>
  );
});
