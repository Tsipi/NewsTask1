import * as React from "react";
// @ts-ignore
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
