import animationData from '@/assets/animations/trashBinAnim.json'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { useRef } from 'react'
import { ToastOptions, toast } from 'react-toastify'

interface AppEntryProps {
  execName: string | null
  callback: (execName: string) => Promise<void>
}

const toastOption = {
  position: 'top-center',
  autoClose: 4000,
  draggable: false,
  theme: 'dark'
} as ToastOptions<unknown>

const AppEntry = ({ execName, callback }: AppEntryProps) => {
  const animRef = useRef<LottieRefCurrentProps>(null)

  const handleOnClick = () => {
    callback(execName!)
      .then(() => (
        toast.success(`${execName} has been removed from the registry successfully!`, toastOption)
      ))
      .catch(() => (
        toast.error('Something went wrong... Nothing\'s been removed from the registry', toastOption)
      ))
  }

  return (execName === null ? null :
    <li className='h-[10vh] w-[90%] flex items-center justify-between px-[25px]
      hover:bg-[#FFF1] duration-300 [&:first-child]:rounded-t-xl relative py-3
      before:absolute before:left-0 before:right-0 before:bottom-[-1px] 
      before:h-[1px] before:bg-gradient-to-r before:from-[hsl(275,81.3%,55.9%)]
      before:to-[hsl(255,81.3%,55.9%)] transition-colors'
    >
      <h1 className='text-white text-[2.6rem] pointer-events-none'>{ execName }</h1>
      <div
        className='relative aspect-square w-[2.4em] cursor-pointer hover:scale-125 duration-100'
        onMouseOver={() => animRef.current?.goToAndPlay(20, true) }
        onMouseLeave={() => animRef.current?.goToAndStop(0, true) }
        onClick={handleOnClick}
      >
        <Lottie
          lottieRef={animRef}
          className='absolute scale-150 pointer-events-none'
          animationData={animationData}
          loop={true}
          autoplay={false}
        />
      </div>
    </li>
  )
}
export default AppEntry
