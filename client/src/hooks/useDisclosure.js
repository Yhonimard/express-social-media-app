import { useCallback, useState } from "react"
const useDisclosure = (initialData) => {
  const [state, setState] = useState(initialData)

  const toggle = useCallback(() => {
    setState(s => !s)
  }, [])

  const open = useCallback(() => {
    setState(true)
  }, [])

  const close = useCallback(() => {
    setState(false)
  }, [])


  return [state, { toggle, open, close }]
}

export default useDisclosure
