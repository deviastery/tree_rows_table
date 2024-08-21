import { TreeRowResponse } from "src/api/tableApi.types";

export const convertToTableData = (data: TreeRowResponse[]) => {
  return data.map((row) => {
    if (!row.child?.length) {
      // Оставляем исходный объект row без изменений
      return row;
    }

    const newRow: TreeRowResponse = {
      ...row,
      subRows: row.child!.map((child) => {
        if (!child.child?.length) {
          // Оставляем исходный объект child без изменений
          return child;
        }

        const newRow: TreeRowResponse = {
          ...child,
          subRows: child.child,
        };

        delete newRow.child;
        return newRow;
      }),
    };

    delete newRow.child;
    return newRow;
  });
};
