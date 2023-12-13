import Icon from "@/assets/Icon";
import chat from "@/config/chat";
import { chatContext } from "@/context/Chat.context";
import useFetchWhenScroll from "@/hooks/useFetchWhenScroll";
import { AppBar, Avatar, Box, IconButton, Paper, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Fragment, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const MessageInput = ({ endMsgRef }) => {
  const chatCtx = useContext(chatContext)
  const scrollToEndMsg = () => {
    endMsgRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const receiver = useSelector(s => s.chat.message.user)
  const sendMessage = chatCtx.sendMessage(receiver.id)


  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: data => {
      sendMessage(data)
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
          onClick={scrollToEndMsg}
        />
        <IconButton type="submit" >
          <Icon.Send />
        </IconButton>
      </Stack>
    </form>
  );
};


const MsgBuble = ({ text, created_at, sender_id }) => {
  const currentUser = useSelector(s => s.auth.user)
  return (
    <>
      <Paper
        sx={{ maxWidth: '70%', minWidth: '50%', alignSelf: sender_id === currentUser.id ? 'flex-end' : 'flex-start', flexGrow: 0, p: 1 }}
      >
        <Stack >
          <Typography>
            {text}
          </Typography>
          <Typography variant="caption" alignSelf={`flex-end`}>
            {created_at}
          </Typography>
        </Stack>
      </Paper>
    </>
  );
};



export const MessageMobile = () => {
  const msgState = useSelector(s => s.chat.message)
  const endMsgRef = useRef()
  const dispatch = useDispatch()
  const { getMessages } = useContext(chatContext)
  const messagesQuery = getMessages(msgState.user.id)
  const fetchNextMessage = useFetchWhenScroll(messagesQuery.fetchNextPage)
  const backToChat = () => {
    dispatch(chat.reducer.action.closeMessageLayout())
  }

  useEffect(() => {
    scrollIntoEndMessage()
  }, [])

  const scrollIntoEndMessage = () => {
    const element = document.getElementById('last-msg')
    if (element) element.scrollIntoView()
  }

  if (messagesQuery.isLoading) return

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
          <div ref={endMsgRef} id="last-msg"></div>
          {messagesQuery.data.pages.map((p, i) => (
            <Fragment key={i}>
              {p.data.map(m => (
                <MsgBuble
                  key={m.id}
                  created_at={m.created_at}
                  sender_id={m.sender_id}
                  text={m.text}
                  isLast={(messagesQuery.data.length - 1) === i}
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
          )}
        </Stack>
        <Box >
          <MessageInput endMsgRef={endMsgRef} />
        </Box>
      </Stack >
    </>
  );
};



export default MessageMobile;