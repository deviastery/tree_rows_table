import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  InputBase,
  Toolbar,
  Tab,
  Tabs,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import ReplyIcon from "@mui/icons-material/Reply";
import styles from "./AppTemplate.module.sass";

const AppTemplate = () => {
  return (
    <>
      <AppBar className={styles.app_bar}>
        <Toolbar disableGutters variant="dense" className={styles.toolbar}>
          <AppsIcon className={styles.icon} />
          <ReplyIcon className={styles.icon} />
          <Box>
            <Tabs textColor="inherit" value="view">
              <Tab disableRipple label="Просмотр" value="view" />
              <Tab disableRipple label="Управление" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppTemplate;
