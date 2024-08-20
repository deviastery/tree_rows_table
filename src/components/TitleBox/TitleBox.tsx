import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./TitleBox.module.sass";

type Props = {
  title: string;
  subtitle: string;
};

const TitleBox = ({ title, subtitle }: Props) => {
  return (
    <Box className={styles.title_box}>
      <Box className={styles.title}>
        {title}
        <span className={styles.subtitle}>{subtitle}</span>
      </Box>
      <KeyboardArrowDownIcon className={styles.icon} />
    </Box>
  );
};

export default TitleBox;
