import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import styles from "./Workspace.module.sass";

type Props = {
  children: React.ReactNode;
};
const Workspace = ({ children }: Props) => {
  return <Box className={styles.workspace}>{children}</Box>;
};

export default Workspace;
