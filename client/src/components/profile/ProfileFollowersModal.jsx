import friend from "@/config/friend";
import profile from "@/config/profile/profile";
import { Avatar, Button, Card, CardActionArea, CardHeader, Grid, Modal, Paper, Skeleton, TextField, Typography } from "@mui/material";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

const FollowersCard = ({ username, photo_profile, isLoading, id, name }) => {
  const navigate = useNavigate()
  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/user/${id}`)}>
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
  )
}

const ProfileFollowersModal = ({ open, toggle }) => {
  const currentUser = useSelector(s => s.auth.user)
  const dispatch = useDispatch()
  const followersState = useSelector(s => s.profile.followers)

  const onSearchInputChange = (e) => {
    dispatch(profile.reducer.action.setFollowersSearchValue(e.target.value))
  }

  const [searchValue] = useDebounce(followersState.searchValue, 500)

  const followersQuery = friend.query.GetCurrentUserFollowers({ uid: currentUser.id, search: searchValue })
  if (followersQuery.isLoading) return


  return (
    <Modal sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 1 }} open={open} onClose={toggle}>
      <Paper sx={{ maxWidth: "30rem", width: "100%", p: 3 }}>
        <TextField
          variant="filled"
          size="small"
          label='search followers'
          fullWidth
          margin="normal"
          value={followersState.searchValue}
          onChange={onSearchInputChange}
        />
      <Grid container spacing={1} sx={{ maxHeight: "372px", overflowY: 'auto' }} >
          {followersQuery.data.pages.map((p, i) => (
            <Fragment key={i}>
              {p.followers.map(f => (
                <Grid item key={f.id} xs={12} >
                  <FollowersCard
                    isLoading={followersQuery.isLoading}
                    photo_profile={f.photo_profile}
                    username={f.username}
                    id={f.id}
                    name={f.name}
                  />
                </Grid>
              ))}
              {p.followers.length < 1 && (
                <Grid item xs={12}>
                  {searchValue === '' && !followersQuery.isLoading ? (
                    <Typography
                      textAlign={`center`}
                      mt={4}
                      mb={2}
                      variant="body1"
                    >
                      you doesnt have any followers
                    </Typography>
                  ) : (
                    searchValue && (
                      <Typography textAlign={`center`} mt={4} mb={2} variant="body1">
                        no followers found by keyword {searchValue}
                      </Typography>
                    )
                  )}
                </Grid>
              )}
            </Fragment>
          ))}
          {followersQuery.hasNextPage && (
            <Grid item xs={12}>
              <Button fullWidth color="inherit" variant="contained">Show more</Button>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Modal>
  );
};

export default ProfileFollowersModal;