import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import composeStore from "./store";
import { Provider } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';

const store = composeStore();

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
