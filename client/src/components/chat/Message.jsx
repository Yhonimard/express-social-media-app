/* eslint-disable react-hooks/rules-of-hooks */
import Icon from "@/assets/Icon";
import chat from "@/config/chat";
import { chatContext } from "@/context/Chat.context";
import { rootContext } from "@/context/Root.context";
import { GET_CURRENT_USER_CHATS_QUERY_NAME, GET_MESSAGE_QUERY_NAME } from "@/fixtures/api-query";
import { GET_MESSAGE_E_NAME } from "@/fixtures/socket";
import convertToBase64Helper from "@/helper/convert-to-base64-helper";
import { AppBar, Avatar, Box, Button, IconButton, Paper, Skeleton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { slice } from "lodash";
import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import HiddenFileInput from "../HiddenFileInput";
import SwipeableMedia from "../SwiepableMedia";

const MessageInput = () => {
  const chatCtx = useContext(chatContext)
  const receiver = useSelector(s => s.chat.message.user)
  const currentUser = useSelector(s => s.auth.user)
  const [previewImg, setPreviewImg] = useState(null)
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

  const mediaHandler = async (file) => {
    const base64media = await Promise.all(file.map(async d => await convertToBase64Helper(d)))
    if (base64media) setPreviewImg(base64media)

  }


  return (
    <Box position="relative">
      {previewImg && (
        <Box position="absolute" bottom={50} left="50%" sx={{ transform: 'translateX(-50%)' }} maxWidth={400} minWidth={300}>
          <SwipeableMedia media={previewImg} />
        </Box>
      )}
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
            disabled={Boolean(previewImg)}
            onClick={chatCtx.scrollIntoEndMessage}
          />

          <HiddenFileInput onChange={mediaHandler} multiple>
            <IconButton>
              <Icon.Attachment />
            </IconButton>
          </HiddenFileInput>
          <IconButton type="submit"  >
            <Icon.Send />
          </IconButton>
        </Stack>
      </form>
    </Box>

  );
};


const MsgBuble = ({ text, created_at, sender_id, isLoading }) => {
  const currentUser = useSelector(s => s.auth.user)
  const [showSkel, setShowSkel] = useState(true)
  useEffect(() => {
    if (!isLoading)
      setTimeout(() => {
        setShowSkel(false)
      }, 500);

  }, [isLoading])

  return (
    <>
      <Paper
        sx={{ maxWidth: '70%', minWidth: '50%', alignSelf: sender_id === currentUser.id ? 'flex-end' : 'flex-start', flexGrow: 0, p: 1 }}
      >
        <Stack >
          {showSkel ? (
            <>
              <Skeleton animation="wave" height={13} width={`80%`} sx={{}} />
              <Skeleton animation="wave" height={13} width={`80%`} sx={{ mb: 1 }} />
            </>
          ) : (
            <Typography>
              {text}
            </Typography>
          )}
          {showSkel ? <Skeleton animation="wave" height={10} width={`30%`} sx={{ alignSelf: 'flex-end' }} /> : (
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
        return [newData, ...oldData]
      })

    })
    queryClient.invalidateQueries([GET_CURRENT_USER_CHATS_QUERY_NAME, currentUser.id])

  }, [socket, currentUser.id, userReceiver.id, queryClient])

  useEffect(() => {
    if (!messageQuery.isLoading || !messageQuery.isFetching || !messageQuery.isFetchingNextPage) {
      scrollIntoEndMessage()
    }
  }, [])

  const { ref, isShowBtn, data, isLoading, islast } = useMsgInfiniteScroll(messageQuery.data, messageQuery.isLoading)

  return (
    <>
      <Stack sx={{ overflowY: 'auto' }} mt={1} spacing={1} direction={`column-reverse`} minHeight={`100%`} maxHeight={`50%`}>
        <div id="bottom-msg"></div>
        {data.map(m => (
          <MsgBuble
            key={m.id}
            created_at={m.created_at}
            sender_id={m.sender_id}
            text={m.text}
            isLoading={isLoading}
          />
        ))}
        {!islast && isShowBtn && (
          <Button ref={ref} fullWidth style={{ visibility: 'hidden' }} disabled={isLoading || islast}></Button>
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


const useMsgInfiniteScroll = (dataMsg, queryIsLoading) => {
  const [index, setIndex] = useState(15)
  const [ref, inView] = useInView({})
  const [isShowBtn, setIsShowBtn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const id = useSelector(s => s.chat.message.user.id)

  useEffect(() => {
    if (inView) {
      setIsLoading(true)
      setIndex(s => s + 15)
    }

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000);

    return () => {
      timeout
    }
  }, [inView])


  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowBtn(true)
      setIsLoading(false)
    }, 1000)

    return () => {
      timeout
    }
  }, [])


  useEffect(() => {
    if (!queryIsLoading)
      setData(slice(dataMsg, 0, index))
  }, [index, dataMsg, queryIsLoading])

  useEffect(() => {
    setData([])
  }, [id])

  return {
    ref,
    isShowBtn,
    data,
    islast: dataMsg?.length === data.map(p => p.messages).length,
    isLoading: isLoading
  }
}