import { Box, Divider } from "@mantine/core"
import ProfileFriendList from "./ProfileFriendList"
import ProfileFriendRequestList from "./ProfileFriendRequestList"

const ProfileFriend = () => {
  return (
    <Box>
      <Box p={5}>
        <ProfileFriendRequestList />
        <Divider mb={`sm`} />
        <ProfileFriendList />
      </Box>
    </Box>
  )
}

export default ProfileFriend
