import { useState, useEffect, ChangeEvent } from "react";

import { updateData } from "../ProjectSpace/ProjectSpace.service";

const TableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    updateData(row.index, column.id, value);
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
