import { Box, LoadingOverlay, SimpleGrid, Text, Title } from "@mantine/core"
import ProfileFriendRequestCard from "./ProfileFriendRequestCard"
import useGetRequestedFriendByCurrentUser from "@/features/friend/useGetRequestedFriendByCurrentUser"
import { useSelector } from "react-redux"
import { Fragment } from "react"

const ProfileFriendRequestList = () => {
  const currentUser = useSelector(state => state.auth.user)
  const requestFriendQuery = useGetRequestedFriendByCurrentUser(currentUser.id, { size: 4 })
  if (requestFriendQuery.isLoading) return <LoadingOverlay visible />

  return (
    <Box mb={20}>
      <Title order={4} mb={10}>Request Friend</Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {requestFriendQuery.data.pages.map((p, i) => (
          <Fragment key={i}>
            {p.data.length < 1 && <Text >you dont have followers request</Text>}
            {p.data.map(f => (
              <ProfileFriendRequestCard
                key={f.id}
                user={f.user}
              />
            ))}
          </Fragment>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ProfileFriendRequestList
