import React from "react";
import {
  Box as MuiBox,
  styled,
  Typography as MuiTypography,
} from "@mui/material";

const Box = styled(MuiBox)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "80%",
});

const Typography = styled(MuiTypography)(({ theme }) => ({
  color: theme.palette.common.black,
  maxWidth: 300,
  opacity: 0.5,
  height: "fit-content",
  textAlign: "center",
  fontFamily: "InterBold",
  fontSize: 20,
}));

type Props = {
  title: string;
};

const DataNotFoundBox = ({ title }: Props) => {
  return (
    <Box>
      <Typography variant="h1">{title}</Typography>
    </Box>
  );
};

export default DataNotFoundBox;
