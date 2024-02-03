import { open } from '@tauri-apps/api/dialog'

interface AddEntryProps {
  callback: (execName: string) => void
}

const AddEntry = ({ callback }: AddEntryProps) => {
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
    else {
      const pathElements = selected.split('\\')
      const pathElementsLength = pathElements.length
      const executableName = pathElements[pathElementsLength - 1]
      callback(executableName)
    }
  }

  return (
    <section 
      className='h-[10vh] w-[90%] flex items-center justify-center px-[25px] rounded-b-xl [&:only-child]:rounded-t-xl
        hover:bg-[#FFF1] duration-300 text-center text-white text-6xl cursor-pointer'
      onClick={handleOnClick}
    >+</section>
  )
}
export default AddEntry
