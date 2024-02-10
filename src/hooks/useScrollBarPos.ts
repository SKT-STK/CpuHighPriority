import { useEffect, useState } from "react";

export function useScrollBarPos() {
  const [scrollPerc, setScrollPerc] = useState<number>(0)

  useEffect(() => {
    const calculateScrollPercentage = () => {
      const totalHeight = document.body.scrollHeight
      const windowHeight = window.innerHeight
      const scrollTop = document.documentElement.scrollTop

      let scrollPercentage = (scrollTop / (totalHeight - windowHeight)) *  100

      if (scrollPercentage >  100) {
          scrollPercentage =  100
      }

      setScrollPerc(scrollPercentage)
    }

    document.addEventListener("scroll", calculateScrollPercentage)

    return () => {
      document.removeEventListener("scroll", calculateScrollPercentage)
    }
  }, [])

  return scrollPerc
}
