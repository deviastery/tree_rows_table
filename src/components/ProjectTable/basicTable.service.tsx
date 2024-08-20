import React from "react";
import { createColumnHelper } from "@tanstack/table-core";
import { TreeRowResponse } from "src/api/tableApi.types";

const columnHelper = createColumnHelper<TreeRowResponse>();

const getTableColumns = () => {
  return [
    columnHelper.accessor("id", {
      size: 50,
      header: () => <span>Уровень</span>,
      cell: (info) => <span>{info.getValue().toString()}</span>,
    }),
    columnHelper.accessor("rowName", {
      size: 400,
      header: () => <span>Наименование работ</span>,
      cell: (info) => <span>{info.getValue().toString()}</span>,
    }),
    columnHelper.accessor("salary", {
      size: 150,
      header: () => <span>Основная з/п</span>,
      cell: (info) => <span>{info.getValue().toString()}</span>,
    }),
    columnHelper.accessor("equipmentCosts", {
      size: 150,
      header: () => <span>Оборудование</span>,
      cell: (info) => <span>{info.getValue().toString()}</span>,
    }),
    columnHelper.accessor("overheads", {
      size: 150,
      header: () => <span>Накладные расходы</span>,
      cell: (info) => <span>{info.getValue().toString()}</span>,
    }),
    columnHelper.accessor("estimatedProfit", {
      size: 150,
      header: () => <span>Сметная прибыль</span>,
      cell: (info) => <span>{info.getValue().toString()}</span>,
    }),
  ];
};

export default getTableColumns;
