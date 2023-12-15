import { chatContext } from "@/context/Chat.context";
import { Avatar, Box, Card, CardActionArea, CardHeader, Grid, Skeleton } from "@mui/material";
import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import MessageMobile from "./Message";
import useFetchWhenScroll from "@/hooks/useFetchWhenScroll";


const ChatUserCard = ({ user, last_message }) => {
  const { isLoading, openMessageLayout } = useContext(chatContext)
  return (
    <Card>
      <CardActionArea onClick={() => openMessageLayout(user)}>
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

export const ChatMobile = () => {
  const { chatsQuery } = useContext(chatContext)
  
  const messageState = useSelector(s => s.chat.message)
  const fetchChat = useFetchWhenScroll(chatsQuery.fetchNextPage)
  
  return (
    <Box mt={1} height={`81vh`}>
      {messageState.isOpen && (
        <MessageMobile />
      )}
      {!messageState.isOpen && (
        <Grid container spacing={1}>
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
            </Fragment>
          ))}
          {fetchChat.isShowBtn && (
            <button ref={fetchChat.inViewRef} style={{ visibility: 'hidden' }} disabled={!chatsQuery.hasNextPage || chatsQuery.isFetchingNextPage}></button>
          )}
        </Grid>
      )}
    </Box>
  );
};



