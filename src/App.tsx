import "./App.style.sass";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "src/store/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AppTemplate from "./components/AppTemplate";
import Workspace from "./components/Workspace";
import theme from "./styles/theme";
import ProjectsList from "./components/ProjectsList";
import ProjectSpace from "./components/ProjectSpace";
import useAppDispatch from "./store/hooks/useAppDispatch";
import { useCreateEntityMutation } from "./api/tableApi";
import { setEntityId } from "./store/slices/entityId";

const App = () => {
  // const dispatch = useAppDispatch();

  // const [createEntity] = useCreateEntityMutation();

  // useEffect(() => {
  //   createEntity()
  //     .unwrap()
  //     .then((data) => {
  //       // dispatch(setEntityId(data.id));
  //     })
  //     .catch(() => {});
  // });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppTemplate />
        <Workspace>
          <ProjectsList />
          <ProjectSpace />
        </Workspace>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
