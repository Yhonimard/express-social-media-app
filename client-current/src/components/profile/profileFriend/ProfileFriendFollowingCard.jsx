import useUnfollowUser from "@/features/friend/useUnfollowUser"
import { ActionIcon, Avatar, Button, Card, Group, Stack, Text } from "@mantine/core"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProfileFriendFollowingCard = ({ username, name, photoProfile, userId }) => {
  const navigate = useNavigate()
  const currentUser = useSelector(s => s.auth.user)
  const { mutate: unfollowUser } = useUnfollowUser({ currUserid: currentUser.id, receiverId: userId })
  const unfollowUserHandler = () => {
    unfollowUser(null)
  }
  return (
    <Card >
      <Card.Section>
        <Group justify="space-between" px={15} py={10} onClick={() => navigate(`/user/${userId}`)}>
          <ActionIcon radius={`xl`} color="gray" variant="subtle" >
            <Avatar src={`${import.meta.env.VITE_API_BASE_URL}/${photoProfile}`} onClick={() => navigate(`/user/${userId}`)} />
          </ActionIcon>
          <Stack gap={0} style={{ flexGrow: 1 }}>
            <Text lh={1}>{username}</Text>
            <Text size="sm" mt={name ? "0" : "20.28"} >{name}</Text>
          </Stack>
        </Group>
        <Button color="gray" size="xs" onClick={unfollowUserHandler}>Unfollow</Button>
      </Card.Section>
    </Card>
  )
}

export default ProfileFriendFollowingCard
