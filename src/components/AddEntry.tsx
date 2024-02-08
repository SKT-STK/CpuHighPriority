interface AddEntryProps {
  spawnInputField: () => void
}

const AddEntry = ({ spawnInputField }: AddEntryProps) => {
  return (
    <li 
      className='h-[10vh] w-[90%] flex items-center justify-center px-[25px] rounded-b-xl [&:only-child]:rounded-t-xl
        hover:bg-[#FFF1] duration-300 text-center text-white text-6xl cursor-pointer'
      onClick={spawnInputField}
    >+</li>
  )
}
export default AddEntry
