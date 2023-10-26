import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Stack,
  Tabs,
  Text,
  Title
} from "@mantine/core";

import UserDetailPost from "@/components/userDetail/UserDetailPost";
import UserDetailProfile from "@/components/userDetail/UserDetailProfile";
import useGetUserDetail from "@/features/user/useGetUserDetail";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import useGetUserHasFollow from "@/features/friend/useGetUserHasFollow";
import { useSelector } from "react-redux";
import useFollowUser from "@/features/friend/useFollowUser";
import useUnfollowUser from "@/features/friend/useUnfollowUser";
import useGetUserProfileByUserId from "@/features/user/useGetUserProfileByUserId";

const UserDetailPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabsLocation = searchParams.get("tabs");
  const params = useParams()

  const currentUser = useSelector(s => s.auth.user)

  const userQuery = useGetUserDetail(params.uid)
  const profileQuery = useGetUserProfileByUserId(params.uid)
  const { mutate: followUser } = useFollowUser({ currUserId: currentUser.id, receiverId: params.uid })
  const { mutate: unfollowUser } = useUnfollowUser({ currUserid: currentUser.id, receiverId: params.uid })
  const friendQuery = useGetUserHasFollow({ currUserId: currentUser.id, receiverId: params.uid })

  if (userQuery.isLoading || friendQuery.isLoading || profileQuery.isLoading) return <LoadingOverlay visible />
  if (userQuery.isError || friendQuery.isError || profileQuery.isLoading) return <Navigate to={`/`} />

  const followOrUnfollUser = (hasFollow) => {
    if (hasFollow) unfollowUser(null)
    if (!hasFollow) followUser(null)
  }


  return (
    <Container size={`md`}>
      <Flex
        justify={`flex-start`}
        mt={`xl`}
        direction={`column`}
        gap={20}
      >
        <Flex justify={`space-between`} align={`center`} direction={{ base: "column" }} gap={35}>
          <Group w={`100%`}>
            <Avatar
              src={`${import.meta.env.VITE_API_BASE_URL}/${userQuery.data.photoProfile}`}
              size={`xl`}
            />
            <Stack gap={0}>
              <Title order={3}>{userQuery.data.username}</Title>
              <Text order={4}>{profileQuery.data.name}</Text>
            </Stack>
          </Group>
          <Box w={`100%`}>
            <Button color="gray" fullWidth onClick={() => followOrUnfollUser(friendQuery.data.hasFollow)}>{friendQuery.data.hasFollow ? friendQuery.data.confirmed ? "Unfollow" : 'Requested' : "Follow"}</Button>
          </Box>
        </Flex>
        <Box>
          <Tabs
            value={tabsLocation || "post"}
            onChange={(e) => setSearchParams({ tabs: e })}>
            <Tabs.List mb={20}>
              <Tabs.Tab value="post">post</Tabs.Tab>
              <Tabs.Tab value="profile">profile</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="post">
              <UserDetailPost params={params} username={userQuery.data.username} />
            </Tabs.Panel>
            <Tabs.Panel value="profile">
              <UserDetailProfile profileData={profileQuery.data} />
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Flex>
    </Container>
  )
}

export default UserDetailPage