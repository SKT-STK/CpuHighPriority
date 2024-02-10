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

    const command = new Command('run-cmd', ['/c', await join(window.processDir, 'regeditremove.bat'), execName])
    await command.execute()
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
