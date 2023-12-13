import { ActionIcon } from "@mantine/core"

const FloatingButton = ({ children, bottom, right, onClick }) => {
  return (
    <ActionIcon pos={`fixed`} bottom={bottom || undefined} right={right || undefined} size={`xl`} onClick={onClick}>
      {children}
    </ActionIcon>
  )
}

export default FloatingButton