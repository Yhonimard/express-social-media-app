import Icon from "@/assets/Icon";
import chat from "@/config/chat";
import user from "@/config/user";
import useCombineDataPaginateArray from "@/hooks/useCombineDataPaginateArray";
import useDisclosure from "@/hooks/useDisclosure";
import { Avatar, Button, Card, CardActionArea, CardHeader, Divider, Fab, Grid, InputBase, Modal, Paper, Skeleton, Tooltip, alpha, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";

const UserCard = ({ user_id, username, photo_profile }) => {
  const isLoading = false


  const dispatch = useDispatch()

  const openChat = () => {  
    dispatch(chat.reducer.action.openMessageLayout({ id: user_id, username, photo_profile }))
  }
  return (
    <Tooltip title={`chat with ${username}`}>
      <Card >
        <CardActionArea onClick={openChat}>
          <CardHeader
            avatar={
              <>
                {isLoading && <Skeleton width={40} height={40} animation="wave" variant="circular" />}
                {!isLoading && <Avatar sx={{ width: 40, height: 40 }} src={`${import.meta.env.VITE_API_BASE_URL}/${photo_profile}`} />}
              </>
            }
            title={isLoading ? <Skeleton animation="wave" height={10} width={`80%`} sx={{ mb: "6px" }} /> : username}
            subheader={isLoading ? <Skeleton animation="wave" height={10} width="40%" /> : name}
          />
        </CardActionArea>
      </Card>
    </Tooltip>
  )
}

const ChatCreate = () => {
  const [isOpen, { toggle }] = useDisclosure(false)
  const dispatch = useDispatch()
  const searchUserState = useSelector(s => s.chat.search)

  const [searchValue] = useDebounce(searchUserState.value, 500)

  const userQuery = user.query.SearchUser(searchValue)
  const usersData = useCombineDataPaginateArray(userQuery.data, 'users')
  return (
    <>
      <Fab sx={{ position: "fixed", bottom: 35, right: 40 }} onClick={toggle} >
        <Icon.Message />
      </Fab>
      <Modal
        open={isOpen}
        onClose={toggle}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }} >

        <Paper sx={{ width: '25rem', p: 1, }}>
          <Search sx={{ width: '100%' }}>
            <SearchIconWrapper>
              <Icon.Search />
            </SearchIconWrapper>
            <Input
              fullWidth
              onChange={(e) => dispatch(chat.reducer.action.setSearchValue(e.target.value))}
              value={searchUserState.value}
            />
          </Search>

          <Divider sx={{ my: 1 }} />

          <Grid container spacing={1} sx={{ maxHeight: "372px", overflowY: 'auto' }}>

            {!userQuery.isLoading && userQuery.isSuccess && usersData.map(u => (
              <Grid item xs={12} key={u.id}>
                <UserCard
                  user_id={u.id}
                  photo_profile={u.photo_profile}
                  username={u.username}
                />
              </Grid>
            ))}

            {userQuery.hasNextPage && (
              <Grid item xs={12}>
                <Button fullWidth color="inherit" variant="contained" onClick={userQuery.fetchNextPage}>Show more</Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Modal>
    </>
  );
};






const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '40%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Input = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));




export default ChatCreate;