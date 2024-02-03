import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useRef, useState } from "react";
import AddEntry from "@/components/AddEntry";
import AppEntry from "@/components/AppEntry";
import { join } from '@tauri-apps/api/path'
import { Command } from "@tauri-apps/api/shell";

export default function App() {
  const [children, setChildren] = useState<string[]>([])
  const regeditsDirRef = useRef<string | null>(null)
  const appconfDirRef = useRef<string | null>(null)

  useEffect(() => {(async () => {
    // const dir = await invoke('get_main_exec_dir') as string

    if (window.processDir.endsWith('debug')) {
      regeditsDirRef.current = await join(window.processDir, '../../..')
      appconfDirRef.current = await join(regeditsDirRef.current, 'other')
    }
    else {
      regeditsDirRef.current = window.processDir
      appconfDirRef.current = window.processDir
    }

    const path = await join(appconfDirRef.current!, 'app.conf')
    const content = await invoke('read_file', { path }) as string
    const parsedContent = JSON.parse(content) as { executablesPaths: string[] }
    setChildren(parsedContent.executablesPaths)
  })()}, [])

  useEffect(() => {
    appconfDirRef.current && (async () => {
      const path = await join(appconfDirRef.current!, 'app.conf')
      await invoke('write_file', { content: JSON.stringify({ executablesPaths: children }), path })
    })()
  }, [children])

  const handleCallbackAdd = async (execName: string) => {
    setChildren([...children, execName])

    const command = new Command('run-cmd', ['/c', await join(regeditsDirRef.current!, 'regeditadd.bat'), execName])
    await command.execute()
  }

  const handleCallbackRemove = async (execName: string) => {
    setChildren(children.filter(item => item !== execName))

    const command = new Command('run-cmd', ['/c', await join(regeditsDirRef.current!, 'regeditremove.bat'), execName])
    await command.execute()
  }

  return (
    <main
      className='w-full min-h-screen bg-[#1A1A1A] flex flex-col items-center pt-1'
    >
      { children.map((child, index) => (
        <AppEntry key={index} execName={child} callback={handleCallbackRemove} />
      )) }
      <AddEntry callback={handleCallbackAdd} />
    </main>
  )
}
