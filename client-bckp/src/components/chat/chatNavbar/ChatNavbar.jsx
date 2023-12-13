import { ActionIcon, Avatar, Box, Burger, Group, Stack, Text, } from "@mantine/core"
import classes from "./ChatNavbar.module.css"
import { useDisclosure } from "@mantine/hooks"
import ChatDrawerList from "./ChatDrawerList"

const ChatNavbar = () => {
  const [isOpenDrawer, { toggle }] = useDisclosure(false)

  return (
    <>
      <Box className={classes.wrapper} bg={`dark.6`}>
        <Group gap={20}>
          <Burger opened={isOpenDrawer} onClick={toggle} />
          <ActionIcon variant="transparent" radius={`xl`}>
            <Avatar />
          </ActionIcon>
        </Group>
        <Stack gap={0} >
          <Text size="md">username</Text>
          <Text className={classes.text_online} size="sm">online</Text>
        </Stack>
      </Box>

      <ChatDrawerList toggle={toggle} isOpen={isOpenDrawer} />
    </>
  )
}

export default ChatNavbar
