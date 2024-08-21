import { useState, useEffect, ChangeEvent } from "react";
import { addRow, updateData } from "../ProjectSpace/ProjectSpace.service";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./SpecialTableCell.module.sass";

const SpecialTableCell = ({ info }: any) => {
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
          onClick={() => addRow(info?.row?.original?.id)}
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
