import { invoke } from "@tauri-apps/api/tauri";
import { ReactNode, useEffect, useRef, useState } from "react";
import AddEntry from "@/components/AddEntry";
import AppEntry from "@/components/AppEntry";
import { join } from '@tauri-apps/api/path'
import { Command } from "@tauri-apps/api/shell";
import InputField from "@/components/InputField";

export default function App() {
  const [children, setChildren] = useState<string[]>([])
  const [inputFieldElement, setInputFieldElement] = useState<ReactNode>(null)
  const regeditsDirRef = useRef<string | null>(null)
  const appconfDirRef = useRef<string | null>(null)

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

  async function setGlobalPaths() {
    if (window.processDir.endsWith('debug')) {
      regeditsDirRef.current = await join(window.processDir, '../../..')
      appconfDirRef.current = await join(regeditsDirRef.current, 'other')
    }
    else {
      regeditsDirRef.current = window.processDir
      appconfDirRef.current = window.processDir
    }
  }

  async function fetchStarterData() {
    const path = await join(appconfDirRef.current!, 'app.conf')
    const content = await invoke('read_file', { path }) as string
    const parsedContent = JSON.parse(content) as { executablesPaths: string[] }
    setChildren(parsedContent.executablesPaths)
  }

  useEffect(() => {
    setGlobalPaths()
      .then(fetchStarterData)
  }, [])

  useEffect(() => {
    appconfDirRef.current && (async () => {
      const path = await join(appconfDirRef.current!, 'app.conf')
      await invoke('write_file', { content: JSON.stringify({ executablesPaths: children }), path })
    })()
  }, [children])

  return (<>
    <ul className='w-full flex flex-col items-center'>
      { children.map((child, index) => (
        <AppEntry key={index} execName={child} callback={handleCallbackRemove} />
      )) }
      { inputFieldElement }
      <AddEntry
        spawnInputField={() => { setInputFieldElement(
          <InputField callback={handleCallbackAdd} killFunction={() => setInputFieldElement(null)} />
        ) }}
      />
    </ul>
    <section
      className='w-full flex-grow'
      onClick={() => document.dispatchEvent(new CustomEvent('blank-space-clicked'))}
    />
  </>)
}
