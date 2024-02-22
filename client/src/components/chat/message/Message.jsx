import Icon from "@/assets/Icon";
import chat from "@/config/chat";
import { chatContext } from "@/context/Chat.context";
import convertToBase64Helper from "@/helper/convert-to-base64-helper";
import useCustomMediaQuery from "@/hooks/useCustomMediaQuery";
import useGetUserIsOnline from "@/hooks/useGetUserOnline";
import { AppBar, Avatar, Box, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import HiddenFileInput from "../../HiddenFileInput";
import SwipeableMedia from "../../SwiepableMedia";
import MessageBubleList from "./MessageBubleList";

const MessageInput = () => {
  const receiver = useSelector(s => s.chat.message.user)
  const currentUser = useSelector(s => s.auth.user)
  const [previewImg, setPreviewImg] = useState(null)
  const { mutate: send } = chat.query.SendMessage({ currentUserId: currentUser.id, userId: receiver.id })
  const { scrollToBottomMsg } = useContext(chatContext)

  const formik = useFormik({
    initialValues: {
      text: '',
      image: null,
    },
    onSubmit: data => {
      send(data)
      formik.resetForm()
      scrollToBottomMsg()
    },
    validationSchema: yup.object().shape({
      text: yup.string().required(),
    })
  })

  const mediaHandler = async (file) => {
    const base64media = await Promise.all(file.map(async d => await convertToBase64Helper(d)))
    if (base64media) {
      setPreviewImg(base64media)
    }
  }

  return (
    <Box position="relative">
      {previewImg && (
        <Box position="absolute" bottom={50} left="50%" sx={{ transform: 'translateX(-50%)' }} maxWidth={400} minWidth={300}>
          <SwipeableMedia media={previewImg} />
        </Box>
      )}
      <form onSubmit={formik.handleSubmit} >
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
          />
          <HiddenFileInput onChange={mediaHandler} multiple>
            <IconButton>
              <Icon.Attachment />
            </IconButton>
          </HiddenFileInput>
          <IconButton type="submit"   >
            <Icon.Send />
          </IconButton>
        </Stack>
      </form>
    </Box>

  );
};




export const MessageMobile = () => {
  return (
    <Box
      sx={{ pt: { xs: 0, sm: 1 } }}
      height={`100%`}
      maxHeight={`100%`}
      display={`flex`}
      flexDirection={`column`}
    >
      <MessageHeader />
      <MessageBubleList />
      <Box mb={3}>
        <MessageInput />
      </Box>
    </Box>
  );
};


export const MessageDesktop = () => {
  return (
    <Box
      pt={1}
      sx={{ display: 'flex', flexDirection: 'column', }} maxHeight={`100%`} minHeight={`100%`}>
      <MessageHeader />
      <MessageBubleList />
      <Box mb={3}>
        <MessageInput />
      </Box>
    </Box>
  );
};


const MessageHeader = () => {
  const msgState = useSelector(s => s.chat.message)
  const dispatch = useDispatch()
  const closeMsg = () => dispatch(chat.reducer.action.closeMessageLayout())
  const mediaQuery = useCustomMediaQuery()
  const isUserOnline = useGetUserIsOnline(msgState.user.id)
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Stack direction={`row`} alignItems={`center`} gap={1}>
          <IconButton onClick={closeMsg} size={mediaQuery.upMd ? 'medium' : 'small'}>
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
  )

}


