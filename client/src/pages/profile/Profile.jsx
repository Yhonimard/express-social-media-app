import CustomTabPanel from "@/components/CustomTabPanel"
import LoadingOverlay from "@/components/loadingOverlay/LoadingOverlay"
import ProfileComment from "@/components/profile/ProfileComment"
import ProfileFriend from "@/components/profile/profileFriend/ProfileFriend"
import ProfileLikeList from "@/components/profile/profileLike/ProfileLikeList"
import ProfilePost from "@/components/profile/profilePost/ProfilePost"
import ProfileUpdateModal from "@/components/profile/profileUpdate/ProfileUpdateModal"
import friend from "@/config/friend"
import post from "@/config/post"
import profile from "@/config/profile/profile"
import user from "@/config/user"
import useCustomMediaQuery from "@/hooks/useCustomMediaQuery"
import useDisclosure from "@/hooks/useDisclosure"
import { Avatar, Box, Button, Container, Divider, Stack, Tab, Tabs, Typography, useMediaQuery } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import ProfileDetail from "../../components/profile/ProfileDetail"
import { useCallback } from "react"

const ProfilePage = () => {
  const [isOpenUpdateModal, { toggle: toggleUpdateModal }] = useDisclosure(false)

  const mediaQuery = useCustomMediaQuery()
  const isOnPhone = useMediaQuery('(max-width:505px)')
  const dispatch = useDispatch()
  const profileState = useSelector(s => s.profile)

  const currentUser = useSelector(s => s.auth.user)
  const userQuery = user.query.GetCurrentUser(currentUser.id)
  const userProfileQuery = user.query.GetCurrentUserProfile(currentUser.id)


  const onTabChange = (e, val) => {
    dispatch(profile.reducer.action.setTabsLocation(val))
  }

  const { data: totalPost, isLoading: totalPostQueryIsLoading } = post.query.GetCurrentuserTotalPosts(currentUser.id)
  const totalFriendQuery = friend.query.GetCurrentUserTotalFollowersAndFollowing(currentUser.id)
  const toggleFollowersModal = useCallback(() => {
    dispatch(profile.reducer.action.toggleFollowersModal())
  }, [dispatch])

  const toggleFollowingModal = useCallback(() => {
    dispatch(profile.reducer.action.toggleFollowingModal())
  }, [dispatch])

  if (userQuery.isLoading || userProfileQuery.isLoading || totalPostQueryIsLoading || totalFriendQuery.isLoading) return <LoadingOverlay />


  return (
    <>
      <Container maxWidth="sm" sx={{ height: "100%" }}>
        {mediaQuery.downMd && (
          <Stack gap>

            <Stack direction={`row`} gap={4} m={'20px 14px'}>
              <Avatar src={`${import.meta.env.VITE_API_BASE_URL}/${userQuery.data.photo_profile}`} sx={{ width: 80, height: 80 }} />

              <Stack gap={1.5} justifyItems={`center`} >
                <Typography variant="h6" fontWeight={400} ml={.5}>{userQuery.data.username}</Typography>
                <Stack direction={`row`} gap={2}>
                  <Button color="inherit" variant="contained" size="small" onClick={toggleUpdateModal}>Edit Profile</Button>
                </Stack>
              </Stack>
            </Stack>

            <Stack px={`20px`} mb={{ xs: 3, sm: 8 }}>
              {userProfileQuery.data.name && <Typography variant="body2">{userProfileQuery.data.name}</Typography>}
              {userProfileQuery.data.bio && <Typography variant="body2" >{userProfileQuery.data.bio}</Typography>}
            </Stack>

            <Box>
              <Divider />
              <Stack direction={`row`} gap={3.5} py={2} justifyContent={`space-evenly`} alignItems={`center`}>

                <Stack alignItems={`center`} gap={0}>
                  <Typography variant="body2">{totalPost}</Typography>
                  <Typography variant="body2" color={`text.secondary`}>posts</Typography>
                </Stack>

                <Stack alignItems={`center`} gap={0} sx={{ cursor: 'pointer' }} onClick={toggleFollowersModal} >
                  <Typography variant="body2">{totalFriendQuery.data.followers}</Typography>
                  <Typography variant="body2" color={`text.secondary`}>followers</Typography>
                </Stack>

                <Stack alignItems={`center`} gap={0} sx={{ cursor: 'pointer' }} onClick={toggleFollowingModal} >
                  <Typography variant="body2">{totalFriendQuery.data.following}</Typography>
                  <Typography variant="body2" color={`text.secondary`}>following</Typography>
                </Stack>

              </Stack>
              <Divider />
            </Box>

          </Stack>
        )}

        {mediaQuery.upMd && (
          <>
            <Stack gap={4} mb={5}>
              <Stack mt={7} direction={`row`} gap={7} alignItems={`flex-start`} >
                <Box>
                  <Avatar sx={{ width: 130, height: 130 }} src={`${import.meta.env.VITE_API_BASE_URL}/${userQuery.data.photo_profile}`} />
                </Box>
                <Stack gap={2.5}>
                  <Stack direction={'row'} gap={4} >
                    <Stack>
                      <Typography variant="h6">{userQuery.data.username}</Typography>
                    </Stack>
                    <Stack gap={3} direction={`row`}>
                      <Button variant="contained" size="small" color="inherit" onClick={toggleUpdateModal}>edit profile</Button>
                    </Stack >
                  </Stack>
                  <Box>
                    <Stack direction={`row`} gap={3.5} mb={2}>
                      <Typography variant="subtitle1">{totalPost} post</Typography>
                      <Typography variant="subtitle1" onClick={toggleFollowersModal} sx={{ cursor: 'pointer' }} >{totalFriendQuery.data.followers} followers</Typography>
                      <Typography variant="subtitle1" onClick={toggleFollowingModal} sx={{ cursor: 'pointer' }}>{totalFriendQuery.data.following} following</Typography>
                    </Stack>
                    {userProfileQuery.data.name && <Typography>{userProfileQuery.data.name}</Typography>}
                    {userProfileQuery.data.bio && <Typography variant="subtitle2">
                      {userProfileQuery.data.bio}
                    </Typography>}
                  </Box>
                </Stack>
              </Stack>
            </Stack>

          </>
        )}

        <Box sx={{ mt: 1 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={profileState.tabsLocation}
              onChange={onTabChange}
              variant={!isOnPhone ? 'fullWidth' : 'scrollable'}
              scrollButtons="auto"
            >
              <Tab label="Post" sx={{}} />
              <Tab label="Profile" sx={{}} />
              <Tab label="Friend" sx={{}} />
              <Tab label="Like" sx={{}} />
              <Tab label="Comment" sx={{}} />
            </Tabs>
          </Box>
          <CustomTabPanel index={0} value={profileState.tabsLocation}>
            <ProfilePost />
          </CustomTabPanel>
          <CustomTabPanel index={1} value={profileState.tabsLocation}>
            <ProfileDetail />
          </CustomTabPanel>
          <CustomTabPanel index={2} value={profileState.tabsLocation}>
            <ProfileFriend />
          </CustomTabPanel>
          <CustomTabPanel index={3} value={profileState.tabsLocation}><ProfileLikeList /></CustomTabPanel>
          <CustomTabPanel index={4} value={profileState.tabsLocation}>
            <ProfileComment />
          </CustomTabPanel>
        </Box>

      </Container >
      <ProfileUpdateModal open={isOpenUpdateModal} toggleModal={toggleUpdateModal} />
      {/* <ProfileFollowersModal open={isOpenFollowersModal} toggle={toggleFollowersModal} />
      <ProfileFollowingModal open={isOpenFollowingModal} toggle={toggleFollowingModal} /> */}
    </>
  )
}

export default ProfilePage
