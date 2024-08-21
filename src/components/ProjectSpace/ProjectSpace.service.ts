import { useSelector } from "react-redux";
import { TreeRowResponse } from "src/api/tableApi.types";
import useAppDispatch from "src/store/hooks/useAppDispatch";
import { setTableData } from "src/store/slices/tableData";
import { setTableOriginalData } from "src/store/slices/tableOriginalData";
import { RootState } from "src/store/store";

const addRow = (id: number) => {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.tableData);
  const newRow: TreeRowResponse = {
    equipmentCosts: 0,
    estimatedProfit: 0,
    id: Math.floor(Math.random() * 10000),
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: 0,
    rowName: "",
    salary: 0,
    supportCosts: 0,
    total: 0,
  };

  const updateData = (data: TreeRowResponse[]): TreeRowResponse[] => {
    return data.map((row) => {
      if (row.id === id) {
        // Если id совпадает, добавляем новую строку как дочерний элемент
        row.subRows = [...(row.subRows || []), newRow];
      } else if (row.subRows) {
        // Рекурсивно обновляем дочерние элементы
        row.subRows = updateData(row.subRows);
      }
      return row;
    });
  };

  dispatch(setTableData(updateData(data)));
  dispatch(setTableOriginalData(updateData(data)));
};

const updateData = (rowIndex: number, columnId: string, value: string) => {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.tableData);
  const setNewData = (data: TreeRowResponse[]) =>
    data.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...data[rowIndex],
          [columnId]: value,
        };
      }
      return row;
    });
  dispatch(setTableData(setNewData(data)));
};

// const editData = ({ table, row }: any) => {
//   const meta = table.options.meta;
//   const setEditedRows = (e: Event) => {
//     meta?.setEditedRows((old: []) => ({
//       ...old,
//       [row.id]: !old[row.id],
//     }));
//   };
// };

const editData = (e: Event, meta: any, row: any) => {
  meta?.setEditedRows((old: []) => ({
    ...old,
    [row.id]: !old[row.id],
  }));
};

export { addRow, updateData, editData };
