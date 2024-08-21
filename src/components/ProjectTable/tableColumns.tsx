import React, { useState } from "react";
import { createColumnHelper } from "@tanstack/table-core";
import { TreeRowResponse } from "src/api/tableApi.types";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./BasicTable.module.sass";

const columnHelper = createColumnHelper<TreeRowResponse>();

const GetTableColumns = () => {
  const [showAdditionalIcons, setShowAdditionalIcons] = useState(false);
  return [
    columnHelper.accessor("id", {
      size: 50,
      header: () => <span>Уровень</span>,
      cell: ({ row }) => (
        <div
          className={styles.expander}
          style={{
            paddingLeft: `${row.depth * 2}rem`,
          }}
        >
          <div
            className={
              showAdditionalIcons ? styles.icon_box_hovered : styles.icon_box
            }
            onMouseEnter={() => setShowAdditionalIcons(true)}
            onMouseLeave={() => setShowAdditionalIcons(false)}
          >
            <DescriptionIcon className={styles.icon_doc} />
            {showAdditionalIcons && (
              <>
                <DeleteIcon className={styles.icon_delete} />
              </>
            )}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("rowName", {
      size: 400,
      header: () => <span>Наименование работ</span>,
      cell: ({ row, getValue }) => <div className="expander">{getValue()}</div>,
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
