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
import { OutlayRowRequest, TreeRowResponse } from "src/api/tableApi.types";
import DataNotFoundBox from "../DataNotFoundBox/DataNotFoundBox";
import GetTableColumns from "./tableColumns";

type Props = {
  data: (TreeRowResponse | undefined)[];
  columns: ColumnDef<TreeRowResponse | undefined>[];
  setRowClick?: Dispatch<SetStateAction<Row<TreeRowResponse> | null>>;
};

const BasicTable = ({ data, columns, setRowClick }: Props) => {
  const [expanded, setExpanded] = useState<ExpandedState>(
    data.reduce((acc, row, index) => ({ ...acc, [row?.id || index]: true }), {})
  );
  // const [rowsData, setRowsData] = useState(() => [...data]);
  // const [originalData, setOriginalData] = useState(() => [...data]);

  // const addRow = () => {
  //   console.log("Click");

  //   const newRow: TreeRowResponse = {
  //     equipmentCosts: 0,
  //     estimatedProfit: 0,
  //     id: Math.floor(Math.random() * 10000),
  //     machineOperatorSalary: 0,
  //     mainCosts: 0,
  //     materials: 0,
  //     mimExploitation: 0,
  //     overheads: 0,
  //     rowName: "",
  //     salary: 0,
  //     supportCosts: 0,
  //     total: 0,
  //   };
  //   const setFunc = (old: (TreeRowResponse | undefined)[]) => [...old, newRow];
  //   setRowsData(setFunc);
  //   setOriginalData(setFunc);
  // };

  // const columns = GetTableColumns({ addRow }) as ColumnDef<
  //   TreeRowResponse | undefined
  // >[];

  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    onExpandedChange: setExpanded,
    getSubRows: (row) => row?.subRows,
    getCoreRowModel: getCoreRowModel<TreeRowResponse | undefined>(),
    getExpandedRowModel: getExpandedRowModel<TreeRowResponse | undefined>(),
  });

  useEffect(() => {
    table.toggleAllRowsExpanded(true);
  }, []);

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
                {row.getAllCells().map((cell) => (
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
