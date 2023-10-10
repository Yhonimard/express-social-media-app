import { ActionIcon } from "@mantine/core"

const CustomActionIcon = ({ children, color, size, }) => {
  return <ActionIcon color={color || "gray"} size={size || "xl"} >{children}</ActionIcon>

}

export default CustomActionIcon