import { invoke } from "@tauri-apps/api/tauri"
import { useEffect } from "react"

const SplashScreen = () => {
  useEffect(() => {
    (async () => {
      invoke('close_splashscreen')
    })()
  }, [])

  return <></>
}
export default SplashScreen
