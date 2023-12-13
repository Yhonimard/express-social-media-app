import Icon from "@/assets/Icon"
import LoadingOverlay from "@/components/loadingOverlay/LoadingOverlay"
import friend from "@/config/friend"
import useFetchWhenScroll from "@/hooks/useFetchWhenScroll"
import { Avatar, Box, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { Fragment, useRef } from "react"
import { useSelector } from "react-redux"

const FollowersCard = ({ photo_profile, username, created_at, id }) => {
  const confirm = () => {
    confirmFollower(null)
  }

  const unconfirm = () => {
    unconfirmFollower(null)
  }

  const currentUser = useSelector(s => s.auth.user)
  const { mutate: confirmFollower } = friend.query.ConfirmFollower({ uid: currentUser.id, senderId: id })
  const { mutate: unconfirmFollower } = friend.query.UnconfirmFollower({ uid: currentUser.id, senderId: id })
  return (
    <ListItem secondaryAction={
      <>
        <IconButton onClick={confirm}><Icon.Check /></IconButton>
        <IconButton onClick={unconfirm}> <Icon.Cancel /></IconButton>
      </>
    }
    >
      <ListItemAvatar>
        <Avatar src={`${import.meta.env.VITE_API_BASE_URL}/${photo_profile}`} />
      </ListItemAvatar>
      <ListItemText primary={username} secondary={created_at} />
    </ListItem>
  )
}

const ProfileFriend = () => {
  const isNotHaveRequestFollower = useRef(false)
  const currentUser = useSelector(s => s.auth.user)
  const followersQuery = friend.query.GetRequestedFollowers(currentUser.id, { size: 6 })
  const { inViewRef, isShowBtn } = useFetchWhenScroll(followersQuery.fetchNextPage)
  
  if (followersQuery.isLoading) return < LoadingOverlay />
  return (
    <Box mt={2}>
      {!isNotHaveRequestFollower && <Typography variant="h6" sx={{ textDecoration: 'underline', ml: 2 }}>Request Followers</Typography>}
      <Grid container>
        {followersQuery.data.pages.map((p, i) => (
          <Fragment key={i}>
            <Grid item xs={12}>
              {p.followers.length < 1 && <Typography ref={isNotHaveRequestFollower} textAlign={'center'}>you dont have requested followers</Typography>}
            </Grid>
            {p.followers.map(f => (
              <Grid item xs={12} key={f.id}>
                <FollowersCard
                  photo_profile={f.photo_profile}
                  username={f.username}
                  created_at={f.created_at}
                  id={f.id}
                />
              </Grid>
            ))}
          </Fragment>
        ))}
        {isShowBtn && (
          <button
            ref={inViewRef}
            style={{ visibility: 'hidden' }}
            disabled={!followersQuery.hasNextPage || followersQuery.isFetchingNextPage}
            onClick={followersQuery.fetchNextPage} ></button>
        )}
      </Grid>
    </Box>
  )
}

export default ProfileFriend
