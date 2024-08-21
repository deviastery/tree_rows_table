import React from "react";
import { createColumnHelper } from "@tanstack/table-core";
import { TreeRowResponse } from "src/api/tableApi.types";

const columnHelper = createColumnHelper<TreeRowResponse>();

const GetTableColumns = () => {
  return [
    columnHelper.accessor("id", {
      size: 50,
      header: () => <span>Уровень</span>,
      cell: ({ row }) => (
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
        </div>
      ),
    }),
    columnHelper.accessor("rowName", {
      size: 400,
      header: () => <span>Наименование работ</span>,
      cell: ({ row, getValue }) => (
        <div
          className="expander"
          style={{
            paddingLeft: `${row.depth * 2}rem`,
          }}
        >
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("salary", {
      size: 150,
      header: () => <span>Основная з/п</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("equipmentCosts", {
      size: 150,
      header: () => <span>Оборудование</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("overheads", {
      size: 150,
      header: () => <span>Накладные расходы</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("estimatedProfit", {
      size: 150,
      header: () => <span>Сметная прибыль</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
  ];
};

export default GetTableColumns;
