import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import styles from "./ProjectsList.module.sass";
import TitleBox from "../TitleBox";
import TitleIconBox from "../TitleIconBox";

const ProjectsList = () => {
  const categories = [
    "По проекту",
    "Объекты",
    "РД",
    "МТО",
    "СМР",
    "График",
    "МиМ",
    "Рабочие",
    "Капвложения",
    "Бюджет",
    "Финансирование",
    "Панорамы",
    "Камеры",
    "Поручения",
    "Контрагенты",
  ];
  return (
    <Box className={styles.workspace}>
      <TitleBox title="Название проекта" subtitle="Аббревиатура" />
      <Box>
        {categories.map((category, index) => (
          <TitleIconBox key={index} title={category} />
        ))}
      </Box>
    </Box>
  );
};

export default ProjectsList;
