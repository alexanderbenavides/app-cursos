import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "typeface-roboto";

import "./index.scss";

import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import { basePath, apiVersion } from "./api/config";
window.$baseUrl = `${basePath}/${apiVersion}`;

const environment = process.env.NODE_ENV === "development" ? "dev" : "pro";
window.$environment = environment;
ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
