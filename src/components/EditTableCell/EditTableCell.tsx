import { useState, useEffect, ChangeEvent } from "react";

import { updateData } from "../ProjectSpace/ProjectSpace.service";
import { TreeRowResponse } from "src/api/tableApi.types";

type Props = {
  getValue: any;
  row: any;
  column: any;
  table: any;
};

const TableCell = (
  { getValue, row, column, table }: Props,
  setData: React.Dispatch<React.SetStateAction<TreeRowResponse[]>>
) => {
  const initialValue = getValue();

  const [value, setValue] = useState(initialValue);
  const tableMeta = table.options.meta;

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    updateData(row.index, column.id, value, setData);
  };

  if (tableMeta?.editedRows[row.id]) {
    return (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={column.columnDef.meta?.type || "text"}
      />
    );
  }
  return <span>{value}</span>;
};

export { TableCell };
