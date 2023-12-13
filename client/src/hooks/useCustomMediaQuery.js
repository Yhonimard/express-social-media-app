import { useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material"

const useCustomMediaQuery = () => {
  const theme = useTheme()


  return {
    upMd: useMediaQuery(theme.breakpoints.up("md")),
    downMd: useMediaQuery(theme.breakpoints.down("md"),)
  }
}

export default useCustomMediaQuery