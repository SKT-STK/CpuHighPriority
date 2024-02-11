import { invoke } from "@tauri-apps/api/tauri"
import { useEffect } from "react"

const SplashScreen = () => {
  useEffect(() => {
    (async () => {
      invoke('show_main_win')
    })()
  }, [])

  return <></>
}
export default SplashScreen
