/* eslint-disable react-hooks/rules-of-hooks */
import Icon from "@/assets/Icon";
import chat from "@/config/chat";
import { chatContext } from "@/context/Chat.context";
import { rootContext } from "@/context/Root.context";
import { GET_CURRENT_USER_CHATS_QUERY_NAME, GET_MESSAGE_QUERY_NAME } from "@/fixtures/api-query";
import { GET_MESSAGE_E_NAME } from "@/fixtures/socket";
import { AppBar, Avatar, Box, Button, IconButton, Paper, Skeleton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  const dispatch = useDispatch()
  const currentUser = useSelector(s => s.auth.user)
  const userReceiver = useSelector(s => s.chat.message.user)


  const messageQuery = chat.query.GetMessages({ currentUserId: currentUser.id, userId: userReceiver.id, size: 30 })

  if (messageQuery.isError) {
    dispatch(chat.reducer.action.closeMessageLayout())
  }

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

  }, [socket, currentUser.id, userReceiver.id, queryClient])

  useEffect(() => {
    if (!messageQuery.isLoading || !messageQuery.isFetching || !messageQuery.isFetchingNextPage) {
      scrollIntoEndMessage()
    }
  }, [])

  const { index, ref, isShowBtn } = useMsgInfiniteScroll()
  console.log(index);
  return (
    <>
      <Stack sx={{ overflowY: 'auto' }} mt={1} spacing={1} direction={`column-reverse`} minHeight={`100%`} maxHeight={`50%`}>
        <div id="bottom-msg"></div>
        {!messageQuery.isLoading && messageQuery.data.map(m => (
          <MsgBuble
            key={m.id}
            created_at={m.created_at}
            sender_id={m.sender_id}
            text={m.text}
            isLoading={(messageQuery.isLoading || messageQuery.isFetchingNextPage)}
          />
        ))}
        {!messageQuery.isLoading && isShowBtn && (
          <Button ref={ref} fullWidth style={{ visibility: 'hidden' }} disabled={!messageQuery.hasNextPage || messageQuery.isFetchingNextPage}></Button>
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
  const isUserOnline = useSelector(s => s.global.usersOnline)



  return (
    <Box sx={{ pt: { xs: 0, sm: 1 } }}>
      <AppBar position="static">
        <Toolbar >
          <Stack direction={`row`} alignItems={`center`} gap={1}>
            <IconButton onClick={backToChat} >
              <Icon.ArrowBack />
            </IconButton>
            <Stack direction={`row`} gap={2} alignItems={`center`}>
              <IconButton size="small" LinkComponent={Link} to={`/user/${msgState.user.id}`} >
                <Avatar sx={{ width: 35, height: 35 }} src={`${import.meta.env.VITE_API_BASE_URL}/${msgState.user.photo_profile}`} />
              </IconButton>
              <Stack direction={`column`}>
                <Typography sx={{ alignSelf: 'flex-start' }} mt={0.3} variant="body1">
                  {msgState.user.username}
                </Typography>
                <Typography sx={{ alignSelf: 'flex-start' }} variant="body2" color={`text.secondary`}>
                  {isUserOnline ? "online" : null}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Stack >
        <Box height={`70dvh`}>
          <MsgBubleList />
        </Box>
        <Box >
          <MessageInput />
        </Box>
      </Stack >
    </Box>
  );
};


export const MessageDesktop = () => {
  const msgState = useSelector(s => s.chat.message)
  const dispatch = useDispatch()
  const closeMsg = () => dispatch(chat.reducer.action.closeMessageLayout())
  const usersOnline = useSelector(s => s.global.usersOnline)
  const isUserOnline = usersOnline.some(user_id => user_id === msgState.user.id)

  return (
    <Box pt={1}>
      <AppBar position="sticky">
        <Toolbar>
          <Stack direction={`row`} alignItems={`center`} gap={1}>
            <IconButton onClick={closeMsg} >
              <Icon.ArrowBack />
            </IconButton>
            <Stack direction={`row`} gap={2} alignItems={`center`}>
              <IconButton size="small" LinkComponent={Link} to={`/user/${msgState.user.id}`} >
                <Avatar sx={{ width: 35, height: 35 }} src={`${import.meta.env.VITE_API_BASE_URL}/${msgState.user.photo_profile}`} />
              </IconButton>
              <Stack direction={`column`}>
                <Typography sx={{ alignSelf: 'flex-start' }} variant="body1">
                  {msgState.user.username}
                </Typography>
                <Typography sx={{ alignSelf: 'flex-start' }} variant="body2" color={`text.secondary`}>
                  {isUserOnline ? "online" : null}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box height={`70dvh`}>
        <MsgBubleList />
        <MessageInput />
      </Box>
    </Box>
  );
};


const useMsgInfiniteScroll = () => {
  const [index, setIndex] = useState(30)
  const [inView, ref] = useInView({})
  const [isShowBtn, setIsShowBtn] = useState(false)

  useEffect(() => {
    if (inView) setIndex(s => s + 30)
  }, [inView])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowBtn(true)
    }, 2000)
    return () => {
      timeout
    }
  }, [])

  return {
    ref,
    index,
    isShowBtn
  }
}