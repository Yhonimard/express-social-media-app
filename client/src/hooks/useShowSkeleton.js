import { useEffect, useState } from "react"

const useShowSkeleton = (isLoading, ms) => {
  const [showSkl, setShowSkl] = useState(true)

  useEffect(() => {
    const loading = isLoading || false
    if (!loading) {
      const timeout = setTimeout(() => {
        setShowSkl(false)
      }, ms || 500);

      return () => {
        clearTimeout(timeout)
      }
    }

  }, [isLoading])
  
  return showSkl
}
export default useShowSkeleton