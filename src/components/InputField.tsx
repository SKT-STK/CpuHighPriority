import Lottie from "lottie-react"
import animationData from '@/assets/animations/searchAnim.json'
import { useCallback, useEffect, useRef } from "react"
import { open } from '@tauri-apps/api/dialog'
import { Command } from "@tauri-apps/api/shell"
import { join } from "@tauri-apps/api/path"
import { ToastOptions, toast } from "react-toastify"

interface InputFieldProps {
  children: (string | null)[]
  setChildren: (children: (string | null)[]) => void
  killFunction: () => void
}

const toastOption = {
  position: 'top-center',
  autoClose: 4000,
  draggable: false,
  theme: 'dark'
} as ToastOptions<unknown>

const InputField = ({ children, setChildren, killFunction }: InputFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnClick = async () => {
    const selected = await open({
      multiple: false,
      filters: [{
        name: 'Executable',
        extensions: ['exe']
      }]
    }) as string

    if (selected === null) {
      return
    }
    const pathElements = selected.split('\\')
    const pathElementsLength = pathElements.length
    const executableName = pathElements[pathElementsLength - 1]
    inputRef.current && (inputRef.current.value = executableName)
    handleSubmit()
  }

  const handleSubmit = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    const addChildren = async (execName: string) => {
      setChildren([...children.filter(item => item !== null), execName])

      return await join(window.process.resources, 'regeditadd.bat').then(async path => {
        const output = await (new Command('run-cmd', ['/c', path, execName])).execute()
        return new Promise<string>((resolve, reject) => {
          output.code ? reject(execName) : resolve(execName)
        })
      })
    }

    if ((!!e && e.key !== 'Enter') || typeof inputRef.current?.value !== 'string') {
      return
    }

    if (inputRef.current?.value.length !== 0) {
      addChildren(
        inputRef.current?.value.toLowerCase().endsWith('.exe')
          ? inputRef.current.value
          : inputRef.current?.value + '.exe'
      )
      .then(execName => (
        toast.success(`${execName} has been added to the registry successfully!`, toastOption)
      ))
      .catch(execName => (
        toast.error(`Something went wrong... ${execName} hasn't been added to the registry`, toastOption)
      ))
    }
    killFunction()
  }
  const handleSubmitCallback = useCallback(handleSubmit, [children, killFunction, setChildren])

  useEffect(() => {
    inputRef.current?.focus()

    document.addEventListener('blank-space-clicked', () => handleSubmitCallback())

    return () => {
      document.removeEventListener('blank-space-clicked', () => handleSubmitCallback())
    }
  }, [handleSubmitCallback])

  return (<>
    <li
      className='h-[10vh] w-[90%] flex items-center justify-between px-[25px] py-3 border-purple-600
        border-b-[1px] hover:bg-[#FFF1] duration-300 [&:first-child]:rounded-t-xl'
    >
      <input
        ref={inputRef}
        onKeyUp={e => handleSubmit(e)}
        type="text"
        placeholder="CASE SENSITIVE"
        className='h-[130%] text-3xl w-[90%] text-white bg-transparent outline-none border-none'
      />
      <div
        className='relative aspect-square w-[2.4em] cursor-pointer'
        onClick={handleOnClick}
      >
        <Lottie
          animationData={animationData}
          className='scale-[1.375] absolute left-[0.375rem] top-1'
        />
      </div>
    </li>
  </>)
}
export default InputField
