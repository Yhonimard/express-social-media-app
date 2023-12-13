import { ChatMobile } from "@/components/chat/Chat";
import useCustomMediaQuery from "@/hooks/useCustomMediaQuery";
import { Container } from "@mui/material";
import moment from "moment";

const ChatPage = () => {
  const mediaQuery = useCustomMediaQuery()

  console.log(moment("21-03-2004", "DD-MM-YYYY").toISOString());

  return (
    <>
      <Container>
        {mediaQuery.downMd && (
          <ChatMobile />
        )}
      </Container>
    </>
  );
};

export default ChatPage;