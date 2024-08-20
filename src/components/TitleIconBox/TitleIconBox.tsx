import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import styles from "./TitleIconBox.module.sass";

type Props = {
  title: string;
};

const TitleIconBox = ({ title }: Props) => {
  return (
    <Box className={styles.title_box}>
      <DashboardIcon className={styles.icon} />
      <span className={styles.icon_title}>{title}</span>
    </Box>
  );
};

export default TitleIconBox;
