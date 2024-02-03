import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/styles/styles.css";
import { invoke } from "@tauri-apps/api/tauri";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

(async () => {
  invoke('create_bat_files')
})()
