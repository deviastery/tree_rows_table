import { useState, useEffect, ChangeEvent } from "react";
import { addRow, updateData } from "../ProjectSpace/ProjectSpace.service";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./EditTableCell.module.sass";
import { CellContext } from "@tanstack/react-table";
import { TreeRowResponse } from "src/api/tableApi.types";

type Props = {
  info: CellContext<TreeRowResponse, number>;
  data: TreeRowResponse[];
  setData: React.Dispatch<React.SetStateAction<TreeRowResponse[]>>;
  setOriginalData: React.Dispatch<React.SetStateAction<TreeRowResponse[]>>;
};

const SpecialTableCell = ({ info, data, setData, setOriginalData }: Props) => {
  const [showAdditionalIcons, setShowAdditionalIcons] = useState(false);
  return (
    <div
      className={styles.expander}
      style={{
        paddingLeft: `${info.row.depth * 2}rem`,
      }}
    >
      <div
        className={
          showAdditionalIcons ? styles.icon_box_hovered : styles.icon_box
        }
        onMouseEnter={() => setShowAdditionalIcons(true)}
        onMouseLeave={() => setShowAdditionalIcons(false)}
      >
        <DescriptionIcon
          className={styles.icon_doc}
          onClick={() =>
            addRow(info?.row?.original?.id, data, setData, setOriginalData)
          }
        />
        {showAdditionalIcons && (
          <div>
            <DeleteIcon className={styles.icon_delete} />
          </div>
        )}
      </div>
    </div>
  );
};

export { SpecialTableCell };
