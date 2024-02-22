import chat from "@/config/chat";
import { chatContext } from "@/context/Chat.context";
import useFetchWhenScroll from "@/hooks/useFetchWhenScroll";
import { Avatar, Box, Button, Divider, Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { Fragment, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessageDesktop, MessageMobile } from "./message/Message";


const ChatUserCard = ({ user, last_message }) => {
  const { isLoading, } = useContext(chatContext)
  const dispatch = useDispatch()

  const openMsgLayout = () => {
    dispatch(chat.reducer.action.openMessageLayout(user))
  }

  return (
    <Paper sx={{ width: '100%', p: 2, cursor: 'pointer', maxWidth: '400px' }} onClick={openMsgLayout}>
      <Stack direction={`row`} gap={1.5}>
        <Box>
          {isLoading && <Skeleton width={40} height={40} animation="wave" variant="circular" />}
          {!isLoading && <Avatar sx={{ width: 40, height: 40 }} src={`${import.meta.env.VITE_API_BASE_URL}/${user.photo_profile}`} />}
        </Box>
        <Stack direction={`column`} width={`100%`} overflow={`hidden`} >
          <Typography variant="body1">
            {isLoading ? <Skeleton animation="wave" height={10} width={`80%`} sx={{ mb: "6px" }} /> : user.username}
          </Typography>
          <Typography
            textOverflow={`ellipsis`}
            overflow={`hidden`}
            whiteSpace={`nowrap`}
            variant="body2"
          >
            {isLoading ? <Skeleton animation="wave" height={10} width="40%" /> : last_message?.text}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

const ChatUserCardList = () => {
  const { chatsQuery } = useContext(chatContext)
  const fetchChat = useFetchWhenScroll(chatsQuery.fetchNextPage)

  return (
    <Box pt={1} width={`100%`}>
      <Grid container spacing={1} height={`100%`} >
        {chatsQuery.data.pages.map((p, i) => {
          return (
            <Fragment key={i}>
              {p.chats.map(c => (
                <Grid item xs={12} key={c.id} >
                  <ChatUserCard
                    id={c.id}
                    last_message={c.last_message}
                    user={c.user}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                {p.chats.length < 1 && <Box sx={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>please create chat</Box>}
              </Grid>
            </Fragment>
          )
        })}
      </Grid>
      {fetchChat.isShowBtn && (
        <Button fullWidth ref={fetchChat.inViewRef} style={{ visibility: 'hidden', position: 'relative' }} disabled={!chatsQuery.hasNextPage || chatsQuery.isFetchingNextPage}></Button>
      )}
    </Box>
  );
};



export const ChatMobile = () => {
  const messageState = useSelector(s => s.chat.message)

  return (
    <Box height={`100%`}>
      {messageState.isOpen && (
        <MessageMobile />
      )}
      {!messageState.isOpen && (
        <ChatUserCardList />
      )}
    </Box>
  );
};



export const ChatDesktop = () => {
  const msgState = useSelector(s => s.chat.message)
  return (
    <Box height={`100%`} width={`100%`} maxWidth={`100vw`}>
      <Stack direction={`row`} height={`100%`} gap={3} width={`100%`}>
        <Box sx={{ flex: "0 0 40%" }} maxHeight={`100%`} >
          <ChatUserCardList />
        </Box>
        <Divider orientation="vertical" />
        <Box sx={{ flex: "0 0 57%" }}>
          {msgState.isOpen && (
            <MessageDesktop />
          )}
          {!msgState.isOpen && (
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              you dont have any opened chat
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};
