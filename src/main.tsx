import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/pages/App";
import "@/styles/styles.css";
import "@/styles/tailwind.css"
import { invoke } from "@tauri-apps/api/tauri";
import SplashScreen from "@/helpers/SplashScreen";
import { join } from "@tauri-apps/api/path";
import NoAdmin from "@/pages/NoAdmin";

declare global {
  type OperatingSystems = 'Win10' | 'Win11'

  interface Process {
    directory: string
    resources: string
    isAdmin: boolean
  }

  interface Window {
    process: Process
  }
}
window.process = {} as unknown as Process

const initApp = async () => {
  window.process.directory = await invoke('get_process_dir') as string
  window.process.resources = await join(window.process.directory, 'resources')
  window.process.isAdmin = await invoke('is_app_elevated') as boolean
}

initApp().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
      <NoAdmin />
      <SplashScreen />
    </React.StrictMode>
  )
})
