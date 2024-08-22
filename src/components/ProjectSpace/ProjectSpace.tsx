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

  const { data: tableData = [], isLoading } = useGetTreeRowsQuery(1);
  const [data, setData] = useState(() => [...tableData]);
  const [originalData, setOriginalData] = useState(() => [...tableData]);
  const [editedRows, setEditedRows] = useState({});

  useEffect(() => {
    if (!isLoading) {
      setData(tableData);
      setOriginalData(tableData);
    }
  }, [isLoading]);

  return (
    <Box className={styles.workspace}>
      <Box className={styles.table_title}>Строительно-монтажные работы</Box>
      <BasicTable
        data={convertToTableData(data) as (TreeRowResponse | undefined)[]}
        columns={
          GetTableColumns({
            data,
            setData,
            setOriginalData,
            setEditedRows,
          }) as ColumnDef<TreeRowResponse | undefined>[]
        }
        editedRows={editedRows}
        setEditedRows={setEditedRows}
      />
    </Box>
  );
};

export default ProjectSpace;
