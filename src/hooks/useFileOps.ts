import { join } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

export function useFileOps() {
  const [children, setChildren] = useState<(string | null)[]>([null])

  useEffect(() => {
    (async () => {
      const path = await join(window.process.resources, 'executables.json')
      let content = await invoke('read_file', { path }) as string
      if (content.length === 0) {
        content = '[]'
      }
      const parsedContent = JSON.parse(content) as string[]
      setChildren([null, ...parsedContent])
    })()
  }, [])

  useEffect(() => {
    async function writeToFile() {
      const path = await join(window.process.resources, 'executables.json')
      invoke('write_file', { content: JSON.stringify(children), path })
   }

    if (children[0] !== null) {
      writeToFile()
    }
  }, [children])

  return { children, setChildren }
}
