import React, { Dispatch, SetStateAction, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Box } from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./BasicTable.module.sass";

type Props<T, S> = {
  columns: Array<ColumnDef<T, S>>;
  data: T[];
  setRowData?: Dispatch<SetStateAction<Row<T> | null>>;
};

const BasicTable = <T, S>({ columns, data, setRowData }: Props<T, S>) => {
  const table = useReactTable({
    data,
    columns,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    getCoreRowModel: getCoreRowModel(),
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
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={styles.tableRow}
              onDoubleClick={() => setRowData && setRowData(row)}
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
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default BasicTable;
