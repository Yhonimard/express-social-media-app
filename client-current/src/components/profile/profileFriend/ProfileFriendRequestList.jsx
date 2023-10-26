import { Box, Title } from "@mantine/core"
import ProfileFriendRequestCard from "./ProfileFriendRequestCard"

const ProfileFriendRequestList = () => {
  return (
    <Box mb={20}>
      <Title order={4}>Request Friend</Title>
      <ProfileFriendRequestCard />
    </Box>
  )
}

export default ProfileFriendRequestList