import { useCallback, useState } from "react"

const useOpenMenu = () => {
  const [anchorEl, setAnchor] = useState(null)
  const isOpen = Boolean(anchorEl)
  const toggle = useCallback((e) => {
    setAnchor(s => !s ? e.currentTarget : null)
  }, [])
  return new Array(
    isOpen,
    anchorEl,
    toggle
  )
}

export default useOpenMenu