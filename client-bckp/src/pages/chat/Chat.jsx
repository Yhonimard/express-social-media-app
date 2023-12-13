import ChatBox from "@/components/chat/chatBox";
import Message from "@/components/message";
import useGetUserChats from "@/features/chat/useGetUserChats";
import mediaQueryHelper from "@/helpers/validation/media-query";
import chatReducer from "@/redux/chatReducer";
import { Box, Container, Flex, SimpleGrid } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

const Chat = () => {



  const dispatch = useDispatch()
  const chatState = useSelector(s => s.chat)

  const mediaQuery = mediaQueryHelper()


  const currentUser = useSelector(s => s.auth.user)
  const userChatsQuery = useGetUserChats({ cuid: currentUser.id })

  if (userChatsQuery.isLoading) return

  const openChatMsg = (toUserId) => {
    dispatch(chatReducer.action.openChatMessage({ toUser: toUserId }))
  }


  return (
    <>
      {mediaQuery.down750 && (
        <Container>

          {!chatState.message.isOpen && (
            <SimpleGrid>
              {userChatsQuery.data.map(c => (
                <ChatBox key={c.id} to={c.to} from={c.from} onClick={() => openChatMsg(c.to)} />
              ))}
            </SimpleGrid>
          )}

          {chatState.message.isOpen && (
            <Message />
          )}

        </Container>
      )}
      {mediaQuery.up750 && (
        <Container>
          <Flex justify={`space-between`}>
            <Box style={{ flexBasis: "40%", padding: 10 }} >
              {userChatsQuery.data.map(c => (
                <ChatBox key={c.id} to={c.to} from={c.from} />
              ))}
            </Box>
            <Box>box chat</Box>
          </Flex>
        </Container>
      )}
    </>
  )

}

export default Chat

