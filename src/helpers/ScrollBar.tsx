import { useScrollBarPos } from "@/hooks/useScrollBarPos"

const ScrollBar = () => {
  const scrollBarPos = useScrollBarPos()
  
  if (scrollBarPos !== 0) {
    document.documentElement.style.setProperty('--scrollbar-border-top-radius', '0.25em')
  }
  else {
    document.documentElement.style.setProperty('--scrollbar-border-top-radius', '0em')
  }

  if (scrollBarPos !== 100) {
    document.documentElement.style.setProperty('--scrollbar-border-bottom-radius', '0.25em')
  }
  else {
    document.documentElement.style.setProperty('--scrollbar-border-bottom-radius', '0em')
  }
  
  return <></>
}
export default ScrollBar
