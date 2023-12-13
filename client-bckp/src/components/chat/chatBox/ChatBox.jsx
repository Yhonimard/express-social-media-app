import useGetUserDetail from "@/features/user/useGetUserDetail"
import { Avatar, Box, LoadingOverlay, Text } from "@mantine/core"
import classes from "./ChatBox.module.css"

const ChatBox = ({ from, to, onClick }) => {
  
  const userQuery = useGetUserDetail(to)

  if (userQuery.isLoading) return <LoadingOverlay visible />

  return (
    <Box className={classes.wrapper} bg={`dark.6`} onClick={onClick}>
      <Box >
        <Avatar size={`md`} />
      </Box>
      <Box className={classes.username_wrapper}>
        <Text>{userQuery.data.username}</Text>
        <Text size="sm">Text Message</Text>
      </Box>
    </Box >
  )
}

export default ChatBox
