import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import styles from "./ProjectSpace.module.sass";
import ProjectTable from "../ProjectTable";
import BasicTable from "../ProjectTable";
import { RootState } from "src/store/store";
import { useGetTreeRowsQuery } from "src/api/tableApi";
// import columns from "../ProjectTable/tableColumns";
import { ColumnDef } from "@tanstack/react-table";
import { TreeRowResponse } from "src/api/tableApi.types";
import { convertToTableData } from "../ProjectTable/basicTable.service";

type TableColumnsType = Array<ColumnDef<TreeRowResponse | undefined, number>>;

const ProjectSpace = () => {
  const entityId = useSelector((state: RootState) => state.entityId);

  const { data: tableData = [] } = useGetTreeRowsQuery(1);

  // const [data, setData] = useState(
  //   useMemo(() => convertToTableData(tableData), [])
  // );

  useEffect(() => {
    console.log(tableData);
    console.log(convertToTableData(tableData));
    // setData(useMemo(() => convertToTableData(tableData), []));
  }, [tableData]);

  const columns = useMemo<ColumnDef<TreeRowResponse>[]>(() => {
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
        cell: ({ row, getValue }) => (
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
  }, []);

  return (
    <Box className={styles.workspace}>
      <Box className={styles.table_title}>Строительно-монтажные работы</Box>
      <BasicTable
        data={convertToTableData(tableData) as (TreeRowResponse | undefined)[]}
        columns={columns as ColumnDef<TreeRowResponse | undefined>[]}
      />
    </Box>
  );
};

export default ProjectSpace;
