import { Box, Paper, SimpleGrid, Title } from "@mantine/core"
import ProfileFriendCard from "./ProfileFriendCard"
import ProfileFriendList from "./ProfileFriendList"
import ProfileFriendRequestList from "./ProfileFriendRequestList"

const ProfileFriend = () => {
  return (
    <Box>
      <Box p={5}>
        <ProfileFriendRequestList />
        <ProfileFriendList />
      </Box>
    </Box>
  )
}

export default ProfileFriend