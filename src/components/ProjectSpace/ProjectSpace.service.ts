import { TreeRowResponse } from "src/api/tableApi.types";
import { convertToTableData } from "../ProjectTable/basicTable.service";
import cloneDeep from "lodash.clonedeep";
import { Row } from "@tanstack/react-table";

const setRowClick = (
  row: Row<TreeRowResponse | undefined>,
  setEditedRows: React.Dispatch<React.SetStateAction<{}>>
) => {
  setEditedRows((old: Record<number, boolean>) => ({
    ...old,
    [row.id]: typeof row.id === "number" ? !old[row.id] : {},
  }));
};

const addRow = (
  id: number,
  data: TreeRowResponse[],
  setData: React.Dispatch<React.SetStateAction<TreeRowResponse[]>>,
  setOriginalData: React.Dispatch<React.SetStateAction<TreeRowResponse[]>>
) => {
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
  let dataCopy = cloneDeep(data);

  const updateData = (data: TreeRowResponse[]): TreeRowResponse[] => {
    return convertToTableData(data).map((row) => {
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

  const updatedData = updateData(dataCopy);

  setData(updatedData);
  setOriginalData(updatedData);
};

const updateData = (
  rowIndex: number,
  columnId: string,
  value: string,
  setData: React.Dispatch<React.SetStateAction<TreeRowResponse[]>>
) => {
  setData((old) =>
    old.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...old[rowIndex],
          [columnId]: value,
        };
      }
      return row;
    })
  );
};

const revertData = (
  rowIndex: number,
  revert: boolean,
  data: TreeRowResponse[],
  originalData: TreeRowResponse[],
  setData: React.Dispatch<React.SetStateAction<TreeRowResponse[]>>,
  setOriginalData: React.Dispatch<React.SetStateAction<TreeRowResponse[]>>
) => {
  if (revert) {
    setData((old) =>
      old.map((row, index) =>
        index === rowIndex ? originalData[rowIndex] : row
      )
    );
  } else {
    setOriginalData((old) =>
      old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
    );
  }
};

export { setRowClick, addRow, updateData, revertData };
