import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/pages/App";
import "@/styles/styles.css";
import "@/styles/tailwind.css"
import { invoke } from "@tauri-apps/api/tauri";
import SplashScreen from "@/helpers/SplashScreen";

declare global {
  type OperatingSystems = 'Win10' | 'Win11'

  interface Process {
    directory: string
    operatingSystem: OperatingSystems
  }

  interface Window {
    process: Process
  }
}
window.process = {} as unknown as Process

const initApp = async () => {
  invoke('create_bat_files')
  window.process.directory = await invoke('get_process_dir') as string
  window.process.operatingSystem = await invoke('get_operating_system') as OperatingSystems
}

initApp().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
      <SplashScreen />
    </React.StrictMode>
  )
})
