import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import styles from "./ProjectSpace.module.sass";
import ProjectTable from "../ProjectTable";
import BasicTable from "../ProjectTable";
import { RootState } from "src/store/store";
import {
  useCreateRowInEntityMutation,
  useGetTreeRowsQuery,
} from "src/api/tableApi";
import GetTableColumns from "../ProjectTable/tableColumns";
import { ColumnDef } from "@tanstack/react-table";
import { TreeRowResponse } from "src/api/tableApi.types";
import { convertToTableData } from "../ProjectTable/basicTable.service";
import { addRow } from "./ProjectSpace.service";

const ProjectSpace = () => {
  const entityId = useSelector((state: RootState) => state.entityId);

  const { data: tableData = [] } = useGetTreeRowsQuery(1);

  const [data, setData] = useState(() => [...convertToTableData(tableData)]);
  const [originalData, setOriginalData] = useState(() => [
    ...convertToTableData(tableData),
  ]);

  // const addRow = (id: number) => {
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

  //   const updateData = (data: TreeRowResponse[]): TreeRowResponse[] => {
  //     return data.map((row) => {
  //       if (row.id === id) {
  //         // Если id совпадает, добавляем новую строку как дочерний элемент
  //         row.subRows = [...(row.subRows || []), newRow];
  //       } else if (row.subRows) {
  //         // Рекурсивно обновляем дочерние элементы
  //         row.subRows = updateData(row.subRows);
  //       }
  //       return row;
  //     });
  //   };

  //   setData(updateData);
  //   setOriginalData(updateData);
  // };

  useEffect(() => {
    console.log(data);
    setData(convertToTableData(tableData));
  }, [tableData]);

  return (
    <Box className={styles.workspace}>
      <Box className={styles.table_title}>Строительно-монтажные работы</Box>
      <BasicTable
        data={data as (TreeRowResponse | undefined)[]}
        columns={
          GetTableColumns({ addRow, setData, setOriginalData }) as ColumnDef<
            TreeRowResponse | undefined
          >[]
        }
      />
    </Box>
  );
};

export default ProjectSpace;
