const BlankSpace = () => {
  return (
    <section
      className='w-full flex-grow'
      onClick={() => document.dispatchEvent(new CustomEvent('blank-space-clicked'))}
    />
  )
}
export default BlankSpace
