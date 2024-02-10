import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import animationData from '@/assets/animations/trashBinAnim.json'
import { useRef } from 'react'

interface AppEntryProps {
  execName: string | null
  callback: (execName: string) => void
}

const AppEntry = ({ execName, callback }: AppEntryProps) => {
  const animRef = useRef<LottieRefCurrentProps>(null)

  return (execName === null ? null :
    <li className='h-[10vh] w-[90%] flex items-center justify-between px-[25px] py-3 border-purple-600
      border-b-[1px] hover:bg-[#FFF1] duration-300 [&:first-child]:rounded-t-xl'
    >
      <h1 className='text-white text-[2.6rem] pointer-events-none'>{ execName }</h1>
      <div
        className='relative aspect-square w-[2.4em] cursor-pointer hover:scale-110 duration-100'
        onMouseOver={() => animRef.current?.goToAndPlay(20, true) }
        onMouseLeave={() => animRef.current?.goToAndStop(0, true) }
        onClick={() => callback(execName)}
      >
        <Lottie
          lottieRef={animRef}
          className='absolute scale-150 pointer-events-none hover:scale-[1.75]'
          animationData={animationData}
          loop={true}
          autoplay={false}
        />
      </div>
    </li>
  )
}
export default AppEntry
