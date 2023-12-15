import api from "@/api";
import Icon from "@/assets/Icon";
import chat from "@/config/chat";
import { chatContext } from "@/context/Chat.context";
import { rootContext } from "@/context/Root.context";
import { GET_MESSAGE_QUERY_NAME } from "@/fixtures/api-query";
import { GET_MESSAGE_E_NAME } from "@/fixtures/socket-chat-message";
import useFetchWhenScroll from "@/hooks/useFetchWhenScroll";
import chatThunk from "@/redux/chatReducer/chat.thunk";
import { AppBar, Avatar, Box, Button, IconButton, Paper, Skeleton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";

const MessageInput = () => {
  const chatCtx = useContext(chatContext)
  const receiver = useSelector(s => s.chat.message.user)
  const currentUser = useSelector(s => s.auth.user)
  const { mutate: send } = chat.query.SendMessage({ currentUserId: currentUser.id, userId: receiver.id })


  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: data => {
      chatCtx.scrollIntoEndMessage()
      send(data)
      formik.resetForm()
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack
        direction={`row`}
        alignItems={`center`}
        justifyContent={`center`}
      >
        <TextField
          name="text"
          autoComplete="off"
          onChange={formik.handleChange}
          variant="standard"
          value={formik.values.text}
          fullWidth
          label='chat'
          onClick={chatCtx.scrollIntoEndMessage}
        />
        <IconButton type="submit"  >
          <Icon.Send />
        </IconButton>
      </Stack>
    </form>
  );
};


const MsgBuble = ({ text, created_at, sender_id, isLoading }) => {
  const currentUser = useSelector(s => s.auth.user)

  return (
    <>
      <Paper
        sx={{ maxWidth: '70%', minWidth: '50%', alignSelf: sender_id === currentUser.id ? 'flex-end' : 'flex-start', flexGrow: 0, p: 1 }}
      >
        <Stack >
          {isLoading ? <Skeleton animation="wave" height={13} width={`80%`} sx={{ mb: 1 }} /> : (
            <Typography>
              {text}
            </Typography>
          )}
          {isLoading ? <Skeleton animation="wave" height={10} width={`30%`} /> : (
            <Typography variant="caption" alignSelf={`flex-end`}>
              {created_at}
            </Typography>
          )}
        </Stack>
      </Paper>
    </>
  );
};



export const MessageMobile = () => {
  const { socket } = useContext(rootContext)
  const msgState = useSelector(s => s.chat.message)
  const dispatch = useDispatch()
  const { scrollIntoEndMessage } = useContext(chatContext)

  const userReceiver = useSelector(s => s.chat.message.user)
  const currentUser = useSelector(s => s.auth.user)

  const messageData = useSelector(s => s.chat.messageData)

  const backToChat = () => {
    dispatch(chat.reducer.action.closeMessageLayout())
  }

  const [msgRef, inView] = useInView({
    delay: 300
  })

  const fetchNextPage = useCallback(async () => {
    dispatch(chat.reducer.action.fetchNextMessage())
  }, [dispatch])


  useEffect(() => {
    scrollIntoEndMessage()
  }, [scrollIntoEndMessage])


  useEffect(() => {
    dispatch(chatThunk.getMessages({ query: { pageNo: messageData.pageNo, size: 20 }, userId: userReceiver.id }))
  }, [messageData.pageNo, userReceiver.id, dispatch])


  useEffect(() => {
    socket.on('get-messages', (newMsg) => {
      dispatch(chat.reducer.action.receiveNewMessage(newMsg))
    })
  }, [socket, dispatch])


  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView, fetchNextPage])

  return (
    <>
      <AppBar position="static">
        <Toolbar >
          <Stack direction={`row`} alignItems={`center`} gap={1}>
            <IconButton onClick={backToChat}>
              <Icon.ArrowBack />
            </IconButton>
            <Stack direction={`row`} gap={2} alignItems={`center`}>
              <IconButton size="small">
                <Avatar sx={{ width: 35, height: 35 }} src={`${import.meta.env.VITE_API_BASE_URL}/${msgState.user.photo_profile}`} />
              </IconButton>
              <Typography sx={{ alignSelf: 'flex-start' }} mt={0.3} variant="body1">
                {msgState.user.username}
              </Typography>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Stack height={`100%`} >
        <Stack height={`85%`} sx={{ overflowY: 'auto' }} mt={1} spacing={1} direction={`column-reverse`} >
          <div id="last-msg" />

          {messageData.messages.map((m, i) => (
            <MsgBuble
              key={i}
              created_at={m.created_at}
              sender_id={m.sender_id}
              text={m.text}
              isLoading={false}
            />
          ))}
          {!messageData.isLast && (
            <Button ref={msgRef} disabled={messageData.isLast} sx={{ visibility: "hidden" }}></Button>
          )}

          {/* {messagesQuery.data?.pages.map((p, i) => (
            <Fragment key={i}>
              {p?.data?.map((m, i) => (
                <MsgBuble
                  key={m.id}
                  created_at={m.created_at}
                  sender_id={m.sender_id}
                  text={m.text}
                  isLoading={(messagesQuery.isLoading || messagesQuery.isFetchingNextPage)}
                />
              ))}
            </Fragment>
          ))}
          {fetchNextMessage.isShowBtn && (
            <button
              ref={fetchNextMessage.inViewRef}
              disabled={!messagesQuery.hasNextPage || messagesQuery.isFetchingNextPage}
              style={{ visibility: 'hidden' }}
            />
          )} */}

        </Stack>
        <Box >
          <MessageInput />
        </Box>
      </Stack >
    </>
  );
};



export default MessageMobile;