import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import GeneralProvider from "./modules/providers/GeneralProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GeneralProvider>
    <App />
  </GeneralProvider>
);
