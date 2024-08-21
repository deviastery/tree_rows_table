import { TreeRowResponse } from "src/api/tableApi.types";

const convertToTableData = (data: TreeRowResponse[]) => {
  return data.map((row) => {
    if (!row.child?.length) {
      return row;
    }

    const newRow: TreeRowResponse = {
      ...row,
      subRows: row.child!.map((child) => {
        if (!child.child?.length) {
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

export { convertToTableData };
