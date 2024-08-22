import { TreeRowResponse } from "src/api/tableApi.types";

export const addRow = (
  id: number,
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

  setData(updateData);
  setOriginalData(updateData);
};
