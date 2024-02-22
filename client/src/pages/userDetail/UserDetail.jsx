import BadgeOnline from "@/components/BadgeOnline"
import CustomTabPanel from "@/components/CustomTabPanel"
import LoadingOverlay from "@/components/loadingOverlay/LoadingOverlay"
import UserDetailFollowersModal from "@/components/userDetail/UserDetailFollowersModal"
import UserDetailFollowingModal from "@/components/userDetail/UserDetailFollowingModal"
import UserDetailPost from "@/components/userDetail/UserDetailPost"
import UserDetailProfile from "@/components/userDetail/UserDetailProfile"
import friend from "@/config/friend"
import post from "@/config/post"
import user from "@/config/user"
import useCustomMediaQuery from "@/hooks/useCustomMediaQuery"
import useDisclosure from "@/hooks/useDisclosure"
import { Avatar, Box, Button, Container, Divider, Stack, Tab, Tabs, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const UserDetailPage = () => {
  const [tabsLocation, setTabsLocation] = useState(0)
  const [isOpenFollowersModal, { toggle: toggleFollowersModal }] = useDisclosure(false)
  const [isOpenFollowingModal, { toggle: toggleFollowingModal }] = useDisclosure(false)
  const params = useParams()
  const currentUser = useSelector(s => s.auth.user)

  const mediaQuery = useCustomMediaQuery()

  const onTabChange = useCallback((e, val) => {
    setTabsLocation(val)
  }, [])
  const userQuery = user.query.GetUserDetail(params.userId)
  const userProfileQuery = user.query.GetProfileByUserId(params.userId)
  const followOrUnfollow = () => {
    if (!hasFollow) follow(null)
    if (hasFollow) unfollow(null)
  }

  const { data: hasFollow, isLoading } = friend.query.GetUserHasFollow({ currUserId: currentUser.id, friendId: params.userId })
  const { mutate: follow } = friend.query.FollowUser({ currUserId: currentUser.id, friendId: params.userId })
  const { mutate: unfollow } = friend.query.UnfollowUser({ currUserid: currentUser.id, friendId: params.userId })

  const postTotalQuery = post.query.GetUserTotalPost(params.userId)
  const friendTotalQuery = friend.query.GetUserTotalFollowersAndFollowing(params.userId)


  const openChatMsg = () => {
  }
  if (userQuery.isLoading || isLoading || postTotalQuery.isLoading || friendTotalQuery.isLoading || userProfileQuery.isLoading) return <LoadingOverlay />

  return (
    <>
      <Container maxWidth={mediaQuery.upMd ? "sm" : "xl"} sx={{ px: 0 }}>
        {mediaQuery.downMd && (
          <Stack gap>

            <Stack direction={`row`} gap={5} m={'20px 14px'}>
              <BadgeOnline userId={userQuery.data.id}>
                <Avatar src={`${import.meta.env.VITE_API_BASE_URL}/${userQuery.data.photo_profile}`} sx={{ width: 80, height: 80 }} />
              </BadgeOnline>

              <Stack gap={2} justifyItems={`center`} >
                <Typography variant="h6" fontWeight={400} noWrap>{userQuery.data.username}</Typography>
                <Stack direction={`row`} gap={2}>
                  <Button color="inherit" variant="contained" size="small" onClick={followOrUnfollow} >{hasFollow ? 'unfollow' : 'follow'}</Button>
                  <Button color="inherit" variant="contained" size="small" onClick={openChatMsg} >Message</Button>
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

                <Stack alignItems={`center`} gap={0} >
                  <Typography variant="body2">{postTotalQuery.data}</Typography>
                  <Typography variant="body2" color={`text.secondary`}>posts</Typography>
                </Stack>

                <Stack alignItems={`center`} gap={0} sx={{ cursor: 'pointer' }} onClick={toggleFollowersModal}>
                  <Typography variant="body2">{friendTotalQuery.data.followers}</Typography>
                  <Typography variant="body2" color={`text.secondary`}>followers</Typography>
                </Stack>

                <Stack alignItems={`center`} gap={0} sx={{ cursor: 'pointer' }} onClick={toggleFollowingModal} >
                  <Typography variant="body2">{friendTotalQuery.data.following}</Typography>
                  <Typography variant="body2" color={`text.secondary`}>following</Typography>
                </Stack>

              </Stack>
              <Divider />
            </Box>

          </Stack>
        )}
        {mediaQuery.upMd && (
          <>
            <Stack gap={4} >
              <Stack mt={7} direction={`row`} gap={7} alignItems={`flex-start`} >
                <Box>
                  <BadgeOnline userId={userQuery.data.id}>
                    <Avatar sx={{ width: 130, height: 130 }} src={`${import.meta.env.VITE_API_BASE_URL}/${userQuery.data.photo_profile}`} />
                  </BadgeOnline>
                </Box>
                <Stack gap={2.5}>
                  <Stack direction={'row'} gap={4} >
                    <Stack>
                      <Typography variant="h6" noWrap>{userQuery.data.username}</Typography>
                      {/* <Typography sx={{ mt: userQuery.data.name ? null : "24px" }}>{userQuery.data.name}</Typography> */}
                    </Stack>
                    <Stack gap={3} direction={`row`}>
                      <Button variant="contained" size="small" color="inherit" onClick={followOrUnfollow}>{hasFollow ? 'Unfollow' : 'Follow'}</Button>
                      <Button variant="contained" size="small" color="inherit" onClick={openChatMsg} >Message</Button>
                    </Stack >
                  </Stack>
                  <Box>
                    <Stack direction={`row`} gap={3.5} mb={2}>
                      <Typography variant="subtitle1">{postTotalQuery.data} post</Typography>
                      <Typography variant="subtitle1" sx={{ cursor: 'pointer' }} onClick={toggleFollowersModal}>{friendTotalQuery.data.followers} followers</Typography>
                      <Typography variant="subtitle1" sx={{ cursor: 'pointer' }} onClick={toggleFollowingModal}>{friendTotalQuery.data.following} following</Typography>
                    </Stack>
                    {userProfileQuery.data.name && <Typography>NAME</Typography>}
                    {userProfileQuery.data.bio && <Typography variant="subtitle2">
                      {userProfileQuery.data.bio}
                    </Typography>}
                  </Box>
                </Stack>
              </Stack>
            </Stack>

          </>
        )}
        <Box mt={mediaQuery.upMd ? 3.5 : 1.5} sx={{ width: "100%" }} px={1}>
          <Tabs
            variant="fullWidth"
            scrollButtons="auto"
            onChange={onTabChange}
            value={tabsLocation}
          >
            <Tab label="Post" />
            <Tab label="Profile" />
          </Tabs>
          <CustomTabPanel index={0} value={tabsLocation}>
            <UserDetailPost userId={params.userId} />
          </CustomTabPanel>
          <CustomTabPanel index={1} value={tabsLocation}>
            <UserDetailProfile userId={params.userId} username={userQuery.data.username} />
          </CustomTabPanel>
        </Box>
      </Container>
      <UserDetailFollowersModal
        open={isOpenFollowersModal}
        toggle={toggleFollowersModal}
        userId={params.userId}
        username={userQuery.data.username}
      />
      <UserDetailFollowingModal
        open={isOpenFollowingModal}
        toggle={toggleFollowingModal}
        userId={params.userId}
        username={userQuery.data.username}
      />
    </>

  )
}

export default UserDetailPage