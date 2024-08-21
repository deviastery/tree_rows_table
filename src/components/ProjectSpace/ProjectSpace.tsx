import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import styles from "./ProjectSpace.module.sass";
import ProjectTable from "../ProjectTable";
import BasicTable from "../ProjectTable";
import { RootState } from "src/store/store";
import { useGetTreeRowsQuery } from "src/api/tableApi";
import GetTableColumns from "../ProjectTable/tableColumns";
import { ColumnDef } from "@tanstack/react-table";
import { TreeRowResponse } from "src/api/tableApi.types";
import { convertToTableData } from "../ProjectTable/basicTable.service";

const ProjectSpace = () => {
  const entityId = useSelector((state: RootState) => state.entityId);

  const { data: tableData = [] } = useGetTreeRowsQuery(1);

  return (
    <Box className={styles.workspace}>
      <Box className={styles.table_title}>Строительно-монтажные работы</Box>
      <BasicTable
        data={convertToTableData(tableData) as (TreeRowResponse | undefined)[]}
        columns={GetTableColumns() as ColumnDef<TreeRowResponse | undefined>[]}
      />
    </Box>
  );
};

export default ProjectSpace;
