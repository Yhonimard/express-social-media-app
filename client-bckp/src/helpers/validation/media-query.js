import { useMediaQuery } from "@mantine/hooks";


const mediaQueryHelper = () => {
  return {
    up750: useMediaQuery("(min-width: 750px)"),
    down750: useMediaQuery("(max-width: 750px)")
  }
}

export default mediaQueryHelper
