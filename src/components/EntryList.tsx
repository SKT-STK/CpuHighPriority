import { ReactNode } from "react"
import AppEntry from "@/components/AppEntry"
import { Command } from "@tauri-apps/api/shell"
import { join } from "@tauri-apps/api/path"

interface EntryListProps {
  children: (string | null)[]
  setChildren: (children: (string | null)[]) => void
  inputFieldElement: ReactNode
}

const EntryList = ({ children, setChildren, inputFieldElement }: EntryListProps) => {
  const handleCallbackRemove = async (execName: string) => {
    setChildren(children.filter(item => item !== execName))

    return await join(window.process.resources, 'regeditremove.bat')
      .then(async path => {
        const output = await (new Command('run-cmd', ['/c', path, execName])).execute()
        return await new Promise<void>((resolve, reject) => {
          output.code ? reject() : resolve()
        })
      })
  }

  return (
    <ul className='w-full flex flex-col items-center'>
      { children.map((child, index) => (
        <AppEntry key={child || index} execName={child} callback={handleCallbackRemove} />
      )) }
      { inputFieldElement }
    </ul>
  )
}
export default EntryList
