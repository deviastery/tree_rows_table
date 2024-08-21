import React, { useMemo } from "react";
import { createColumnHelper } from "@tanstack/table-core";
import { TreeRowResponse } from "src/api/tableApi.types";
import { CellContext, ColumnDef } from "@tanstack/react-table";

const columns = () => {
  return [
    {
      size: 50,
      accessorKey: "id",
      header: () => <span>Уровень</span>,
    },
    {
      size: 400,
      accessorKey: "rowName",
      header: () => <span>Наименование работ</span>,
      cell: ({ row, getValue }: CellContext<TreeRowResponse, unknown>) => (
        <div
          className="expander"
          style={{
            paddingLeft: `${row.depth * 2}rem`,
          }}
        >
          {row.getCanExpand() && (
            <button
              className="toggle-expanded"
              {...{
                onClick: row.getToggleExpandedHandler(),
              }}
            >
              {row.getIsExpanded() ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="16"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#777"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="16"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#777"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              )}
            </button>
          )}
          {getValue() as string}
        </div>
      ),
    },
    {
      size: 150,
      accessorKey: "salary",
      header: () => <span>Основная з/п</span>,
    },
    {
      size: 150,
      accessorKey: "equipmentCosts",
      header: () => <span>Оборудование</span>,
    },
    {
      size: 150,
      accessorKey: "overheads",
      header: () => <span>Накладные расходы</span>,
    },
    {
      size: 150,
      accessorKey: "estimatedProfit",
      header: () => <span>Сметная прибыль</span>,
    },
  ];
};

export default columns;
