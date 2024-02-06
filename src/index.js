import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainRouteMap from "./control_panel/MainRouteMap";
import * as serviceWorker from "./serviceWorker.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { Notifications } from "./common/notifycations/Notifycations";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
// import { ComingSoon } from "./mind_map/ReactFlow/ComingSoon";

const theme = createTheme({
  palette: {
    background: {
      default: "#FBFCFD", //#F6F8FA
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainRouteMap />
          {/* <ComingSoon /> */}
          <Notifications />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
