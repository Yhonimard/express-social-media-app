import message from "@/config/message";
import { chatContext } from "@/context/Chat.context";
import { rootContext } from "@/context/Root.context";
import { GET_MESSAGE_E_NAME } from "@/fixtures/socket";
import messageThunk from "@/redux/messageReducer/message.thunk";
import { useContext, useEffect } from "react";
import { InView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import MessageBuble from "./MessageBuble";
import { MsgBubleListWrapper } from "./MessageBubleList.styled";

const MessageBubleList = () => {
  const { socket } = useContext(rootContext)
  const { msgEndRef, scrollToBottomMsg } = useContext(chatContext)
  const msgState = useSelector(s => s.message)
  const userReceiverId = useSelector(s => s.chat.message.user.id)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(messageThunk.getMessages(msgState.pageNo))
  }, [dispatch])


  const inViewHandler = (inView) => {
    if (inView && !msgState.isLoading) {
      dispatch(messageThunk.getMessages(msgState.pageNo))
    }
  }

  useEffect(() => {
    socket.on(GET_MESSAGE_E_NAME, (newMsg) => {
      dispatch(message.reducer.action.addNewMsg(newMsg))
      scrollToBottomMsg()
    })
  }, [socket, dispatch])

  return (
    <MsgBubleListWrapper>
      <div ref={msgEndRef}></div>

      {msgState.chats.map(c => (
        <MessageBuble
          key={c.render_id}
          text={c.text}
          sender_id={c.sender_id}
          created_at={c.created_at}
          isLoading={msgState.isLoading}
        />
      ))
      }
      <InView onChange={inViewHandler}></InView>
    </MsgBubleListWrapper >
  );
};

export default MessageBubleList;
