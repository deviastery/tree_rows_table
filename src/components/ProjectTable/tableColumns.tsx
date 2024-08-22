import React, { useState } from "react";
import { createColumnHelper } from "@tanstack/table-core";
import { TreeRowResponse, OutlayRowRequest } from "src/api/tableApi.types";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./BasicTable.module.sass";
import { useCreateRowInEntityMutation } from "src/api/tableApi";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { TableCell } from "../EditTableCell/EditTableCell";
import { SpecialTableCell } from "../EditTableCell/SpecialEditTableCell";

const columnHelper = createColumnHelper<TreeRowResponse>();

type Props = {
  data: TreeRowResponse[];
  setData: React.Dispatch<React.SetStateAction<TreeRowResponse[]>>;
  setOriginalData: React.Dispatch<React.SetStateAction<TreeRowResponse[]>>;
  setEditedRows: React.Dispatch<React.SetStateAction<{}>>;
};
const GetTableColumns = ({
  data,
  setData,
  setOriginalData,
  setEditedRows,
}: Props) => {
  const entityId = useSelector((state: RootState) => state.entityId);
  const [showAdditionalIcons, setShowAdditionalIcons] = useState(false);
  const [newRows, setNewRows] = useState<OutlayRowRequest[]>([]);

  const [createRow] = useCreateRowInEntityMutation();

  const handleSubmit = (data: OutlayRowRequest) => {
    createRow({
      eID: entityId,
      request: data,
    })
      .unwrap()
      .then(() => {
        console.log("success");
      })
      .catch(() => {});
  };

  const handleCreate = (parentId: number) => {
    setNewRows([
      ...newRows,
      {
        equipmentCosts: 0,
        estimatedProfit: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        parentId: parentId,
        rowName: "",
        salary: 0,
        supportCosts: 0,
      },
    ]);
  };

  return [
    columnHelper.accessor("id", {
      size: 50,
      header: () => <span>Уровень</span>,
      cell: (info) =>
        SpecialTableCell({
          info,
          data,
          setData,
          setOriginalData,
          setEditedRows,
        }),
    }),
    columnHelper.accessor("rowName", {
      size: 400,
      header: () => <span>Наименование работ</span>,
      cell: (info) => TableCell(info, setData),
      meta: {
        type: "string",
      },
    }),
    columnHelper.accessor("salary", {
      size: 150,
      header: () => <span>Основная з/п</span>,
      cell: (info) => TableCell(info, setData),
      meta: {
        type: "number",
      },
    }),
    columnHelper.accessor("equipmentCosts", {
      size: 150,
      header: () => <span>Оборудование</span>,
      cell: (info) => TableCell(info, setData),
      meta: {
        type: "number",
      },
    }),
    columnHelper.accessor("overheads", {
      size: 150,
      header: () => <span>Накладные расходы</span>,
      cell: (info) => TableCell(info, setData),
      meta: {
        type: "number",
      },
    }),
    columnHelper.accessor("estimatedProfit", {
      size: 150,
      header: () => <span>Сметная прибыль</span>,
      cell: (info) => TableCell(info, setData),
      meta: {
        type: "number",
      },
    }),
  ];
};

export default GetTableColumns;
