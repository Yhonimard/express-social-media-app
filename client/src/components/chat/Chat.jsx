import { chatContext } from "@/context/Chat.context";
import { Avatar, Box, Button, Card, CardActionArea, CardHeader, Divider, Grid, Skeleton, Stack } from "@mui/material";
import { Fragment, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessageDesktop, MessageMobile } from "./Message";
import useFetchWhenScroll from "@/hooks/useFetchWhenScroll";
import chat from "@/config/chat";


const ChatUserCard = ({ user, last_message }) => {
  const { isLoading, } = useContext(chatContext)
  const dispatch = useDispatch()
  const chatCtx = useContext(chatContext)
  
  const openMsgLayout = () => {
    dispatch(chat.reducer.action.openMessageLayout(user))
  }

  return (
    <Card onClick={chatCtx.scrollIntoEndMessage}>
      <CardActionArea onClick={openMsgLayout}>
        <CardHeader
          avatar={
            <>
              {isLoading && <Skeleton width={40} height={40} animation="wave" variant="circular" />}
              {!isLoading && <Avatar sx={{ width: 40, height: 40 }} src={`${import.meta.env.VITE_API_BASE_URL}/${user.photo_profile}`} />}
            </>
          }
          title={isLoading ? <Skeleton animation="wave" height={10} width={`80%`} sx={{ mb: "6px" }} /> : user.username}
          subheader={isLoading ? <Skeleton animation="wave" height={10} width="40%" /> : last_message?.text}
        />
      </CardActionArea>
    </Card>
  );
};

const ChatUserCardList = () => {
  const { chatsQuery } = useContext(chatContext)
  const fetchChat = useFetchWhenScroll(chatsQuery.fetchNextPage)
  return (
    <Box pt={1}>
      <Grid container spacing={1} height={`100%`} >
        {chatsQuery.data.pages.map((p, i) => (
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
        ))}
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
    <Box height={`100%`}>
      <Stack direction={`row`} height={`99%`} gap={3}>
        <Box sx={{ flex: "0 0 40%" }}>
          <ChatUserCardList />
        </Box>
        <Divider orientation="vertical" />
        <Box sx={{ flex: "1 0" }}>
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
