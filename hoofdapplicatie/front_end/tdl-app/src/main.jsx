import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./data/store";
import { Provider } from "react-redux";
import GeneralProvider from "./modules/providers/GeneralProvider";
    

ReactDOM.createRoot(document.getElementById("root")).render(

    <GeneralProvider>
      <App />
    </GeneralProvider>

 

);
