import { Drawer, Stack } from "@mantine/core"

const ChatDrawerList = ({ isOpen, toggle }) => {
  return (
    <Drawer opened={isOpen} onClose={toggle} size={`xs`}>
      <Stack>

      </Stack>
    </Drawer>
  )
}

export default ChatDrawerList
