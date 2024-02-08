import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/pages/App";
import "@/styles/styles.css";
import "@/styles/tailwind.css"
import { invoke } from "@tauri-apps/api/tauri";
import SplashScreen from "@/helpers/SplashScreen";

declare global {
  interface Window {
    processDir: string
  }
}

const initApp = async () => {
  invoke('create_bat_files')
  window.processDir = await invoke('get_process_dir') as string
}

initApp().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
      <SplashScreen />
    </React.StrictMode>
  )
})
