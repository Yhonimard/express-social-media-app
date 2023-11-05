import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

const useInfiniteScroll = (fetchNextPage) => {
  const [inViewRef, inView] = useInView({})
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
    isShowBtn
  }
}

export default useInfiniteScroll