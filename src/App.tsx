import "./App.style.scss";
import React from "react";
import { Provider } from "react-redux";
import store from "src/store/store";

import { CssBaseline } from "@mui/material";

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
    </Provider>
  );
};

export default App;
