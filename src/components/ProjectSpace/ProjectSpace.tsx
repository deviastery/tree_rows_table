import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import styles from "./ProjectSpace.module.sass";
import ProjectTable from "../ProjectTable";
import BasicTable from "../ProjectTable";
import { RootState } from "src/store/store";
import { useGetTreeRowsQuery } from "src/api/tableApi";
import getTableColumns from "../ProjectTable/basicTable.service";
import { ColumnDef } from "@tanstack/react-table";
import { TreeRowResponse } from "src/api/tableApi.types";

type TableColumnsType = Array<ColumnDef<TreeRowResponse, number>>;

const ProjectSpace = () => {
  const entityId = useSelector((state: RootState) => state.entityId);
  const { data = [], isLoading } = useGetTreeRowsQuery(1);
  return (
    <Box className={styles.workspace}>
      <Box className={styles.table_title}>Строительно-монтажные работы</Box>
      <BasicTable data={data} columns={getTableColumns() as TableColumnsType} />
    </Box>
  );
};

export default ProjectSpace;
