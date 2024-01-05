import Icon from "@/assets/Icon";
import chat from "@/config/chat";
import { chatContext } from "@/context/Chat.context";
import { rootContext } from "@/context/Root.context";
import { GET_CURRENT_USER_CHATS_QUERY_NAME, GET_MESSAGE_QUERY_NAME } from "@/fixtures/api-query";
import { GET_MESSAGE_E_NAME } from "@/fixtures/socket-chat-message";
import useFetchWhenScroll from "@/hooks/useFetchWhenScroll";
import { AppBar, Avatar, Box, Button, IconButton, Paper, Skeleton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Fragment, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

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
      send(data)
      formik.resetForm()
    },
    validationSchema: yup.object().shape({
      text: yup.string().required(),
    })
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


const MsgBubleList = () => {
  const { socket } = useContext(rootContext)
  const { scrollIntoEndMessage } = useContext(chatContext)

  const currentUser = useSelector(s => s.auth.user)
  const userReceiver = useSelector(s => s.chat.message.user)

  const messageQuery = chat.query.GetMessages({ currentUserId: currentUser.id, userId: userReceiver.id, size: 30 })

  const { inViewRef: refLastMsg, isShowBtn, inView } = useFetchWhenScroll(messageQuery.fetchNextPage, 300)

  const queryClient = useQueryClient()

  useEffect(() => {
    socket.on(GET_MESSAGE_E_NAME, async (newData) => {
      await queryClient.cancelQueries([GET_MESSAGE_QUERY_NAME, currentUser.id, userReceiver.id])

      queryClient.setQueryData([GET_MESSAGE_QUERY_NAME, currentUser.id, userReceiver.id], oldData => {
        const newPages = oldData.pages.map(p => {
          return {
            ...p,
            data: [newData, ...p.data]
          }
        })

        return {
          ...oldData,
          pages: newPages
        }
      })

    })
    queryClient.invalidateQueries([GET_CURRENT_USER_CHATS_QUERY_NAME, currentUser.id])

    return () => {
      socket.off(GET_MESSAGE_E_NAME)
    }
  }, [socket, currentUser.id, userReceiver.id, queryClient])

  useEffect(() => {
    if (!inView) {
      scrollIntoEndMessage()
    }
  }, [messageQuery.data, scrollIntoEndMessage, messageQuery.isFetchingNextPage, inView])

  return (
    <>
      <Stack height={`85%`} sx={{ overflowY: 'auto' }} mt={1} spacing={1} direction={`column-reverse`} >
        <div id="bottom-msg"></div>
        {!messageQuery.isLoading && messageQuery.data.pages.map((p, i) => (
          <Fragment key={i}>
            {p.data.filter((data, i, s) => i === s.findIndex(t => t.id === data.id)).map(m => (
              <MsgBuble
                key={m.id}
                created_at={m.created_at}
                sender_id={m.sender_id}
                text={m.text}
                isLoading={(messageQuery.isLoading || messageQuery.isFetchingNextPage)}
              />
            ))}
          </Fragment>
        ))}
        {!messageQuery.isLoading && isShowBtn && (
          <Button ref={refLastMsg} fullWidth style={{ visibility: 'hidden' }} disabled={!messageQuery.hasNextPage || messageQuery.isFetchingNextPage}></Button>
        )}
      </Stack>
    </>
  );
};



export const MessageMobile = () => {
  const msgState = useSelector(s => s.chat.message)
  const dispatch = useDispatch()

  const backToChat = () => {
    dispatch(chat.reducer.action.closeMessageLayout())
  }

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
        <MsgBubleList />
        <Box >
          <MessageInput />
        </Box>
      </Stack >
    </>
  );
};


export const MessageDesktop = () => {
  const msgState = useSelector(s => s.chat.message)
  const dispatch = useDispatch()
  const closeMsg = () => dispatch(chat.reducer.action.closeMessageLayout())

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Stack direction={`row`} alignItems={`center`} gap={1}>
            <IconButton onClick={closeMsg} >
              <Icon.ArrowBack />
            </IconButton>
            <Stack direction={`row`} gap={2} alignItems={`center`}>
              <IconButton size="small">
                <Avatar sx={{ width: 35, height: 35 }} src={`${import.meta.env.VITE_API_BASE_URL}/${msgState.user.photo_profile}`} />
              </IconButton>
              <Stack direction={`column`}>
                <Typography sx={{ alignSelf: 'flex-start' }} variant="body1">
                  {msgState.user.username}
                </Typography>
                <Typography sx={{ alignSelf: 'flex-start' }} variant="body2" color={`text.secondary`}>
                  {/* {msgState.user.username} */}
                  online
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box height={`79vh`}>
        <MsgBubleList />
        <MessageInput />
      </Box>
    </Box>
  );
};

const AlwaysScrollToBottom = ({ socket }) => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView(), [socket]);
  useEffect(() => elementRef.current.scrollIntoView(), []);
  return <div ref={elementRef} id="bottom-msg" />;
};