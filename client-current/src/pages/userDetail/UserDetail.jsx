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

const UserDetailPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabsLocation = searchParams.get("tabs");
  const params = useParams()

  const currentUser = useSelector(s => s.auth.user)

  const friendQuery = useGetUserHasFollow({ currUserId: currentUser.id, receiverId: params.uid })
  const userQuery = useGetUserDetail(params.uid)
  const { mutate: followUser } = useFollowUser({ currUserId: currentUser.id, receiverId: params.uid })

  if (userQuery.isLoading || friendQuery.isLoading) return <LoadingOverlay visible />
  if (userQuery.isError || friendQuery.isError) return <Navigate to={`/`} />

  const followOrUnfollUser = () => {
    followUser(null)
  }


  return (
    <Container size={`md`}>
      <Flex
        justify={`flex-start`}
        mt={`xl`}
        direction={`column`}
        gap={20}
      >
        <Group justify="space-between" pr={40}>
          <Group>
            <Avatar
              src={`${import.meta.env.VITE_API_BASE_URL}/${userQuery.data.photoProfile}`}
              size={`xl`}
            />
            <Stack gap={0}>
              <Title order={3}>{userQuery.data.username}</Title>
              <Text order={4}>{userQuery.data.bio}</Text>
            </Stack>
          </Group>
          <Box>
            <Button color="gray" onClick={followOrUnfollUser}>{friendQuery.data.hasFollow ? "remove friend" : "follow"}</Button>
          </Box>
        </Group>
        <Box>
          <Tabs
            value={tabsLocation || "post"}
            onChange={(e) => setSearchParams({ tabs: e })}>
            <Tabs.List mb={20}>
              <Tabs.Tab value="post">post</Tabs.Tab>
              <Tabs.Tab value="profile">profile</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="post">
              <UserDetailPost params={params} />
            </Tabs.Panel>
            <Tabs.Panel value="profile">
              <UserDetailProfile userId={params.uid} />
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Flex>
    </Container>
  )
}

export default UserDetailPage