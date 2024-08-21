import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Box } from "@mui/material";
import {
  ExpandedState,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
  getExpandedRowModel,
} from "@tanstack/react-table";
import styles from "./BasicTable.module.sass";
import { TreeRowResponse } from "src/api/tableApi.types";
import DataNotFoundBox from "../DataNotFoundBox/DataNotFoundBox";

type Props = {
  columns: ColumnDef<TreeRowResponse | undefined>[];
  data: (TreeRowResponse | undefined)[];
  setRowData?: Dispatch<SetStateAction<Row<TreeRowResponse> | null>>;
};

const BasicTable = ({ columns, data, setRowData }: Props) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    onExpandedChange: setExpanded,
    getSubRows: (row) => row?.subRows,
    getCoreRowModel: getCoreRowModel<TreeRowResponse | undefined>(),
    getExpandedRowModel: getExpandedRowModel<TreeRowResponse | undefined>(),
  });

  return (
    <Box className={styles.tableTemplate}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={styles.tableHeaderRow}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.tableHeaderCell}>
                  <Box className={styles.tableHeaderTitle}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Box>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {!data || !data?.length ? (
            <tr className={styles.tableRow}>
              <td colSpan={6} className={styles.tableCell}>
                <DataNotFoundBox title="Список заявок пуст. Приходите позже" />
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={styles.tableRow}
                // onDoubleClick={() => setRowData && setRowData(row)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                    }}
                    className={styles.tableCell}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Box>
  );
};

export default BasicTable;
