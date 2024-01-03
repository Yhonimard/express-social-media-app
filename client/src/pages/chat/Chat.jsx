import { ChatDesktop, ChatMobile } from "@/components/chat/Chat";
import ChatCreate from "@/components/chat/ChatCreate";
import useCustomMediaQuery from "@/hooks/useCustomMediaQuery";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const mediaQuery = useCustomMediaQuery()
  const msgState = useSelector(s => s.chat.message)

  return (
    <>
      <Container>
        {mediaQuery.downMd && (
          <ChatMobile />
        )}
        {mediaQuery.upMd && (
          <ChatDesktop />
        )}
      </Container>
      {!msgState.isOpen && (
        <ChatCreate />
      )}
    </>
  );
};

export default ChatPage;