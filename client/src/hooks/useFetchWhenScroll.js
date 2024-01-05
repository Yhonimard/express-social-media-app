import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

const useFetchWhenScroll = (fetchNextPage, delay) => {
  const [inViewRef, inView] = useInView({ delay: delay || null })
  const [isShowBtn, setIsShowBtn] = useState(false)

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowBtn(true)
    }, 2000)
    return () => {
      timeout
    }
  }, [])

  return {
    inViewRef,
    isShowBtn,
    inView
  }
}

export default useFetchWhenScroll