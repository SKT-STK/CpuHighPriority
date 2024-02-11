import { join } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

export function useFileOps() {
  const [children, setChildren] = useState<(string | null)[]>([null])

  useEffect(() => {
    (async () => {
      const path = await join(window.process.directory, 'executables.json')
      let content = await invoke('read_file', { path }) as string
      if (content.length === 0) {
        content = '{"executablesPaths":[]}'
      }
      const parsedContent = JSON.parse(content) as { executablesPaths: string[] }
      setChildren([null, ...parsedContent.executablesPaths])
    })()
  }, [])

  useEffect(() => {
    async function writeToFile() {
      const path = await join(window.process.directory, 'executables.json')
      invoke('write_file', { content: JSON.stringify({ executablesPaths: children }), path })
   }

    if (children[0] !== null) {
      writeToFile()
    }
  }, [children])

  return { children, setChildren }
}
