import useDeleteFollowers from "@/features/friend/useDeleteFollowers"
import { ActionIcon, Avatar, Button, Card, Group, Stack, Text } from "@mantine/core"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProfileFriendFollowersCard = ({ user }) => {
  const navigate = useNavigate()

  const currentUser = useSelector(s => s.auth.user)
  const { mutate: deleteFollowers } = useDeleteFollowers({ senderId: user.id, uid: currentUser.id })

  const handleDeleteFollowers = () => {
    deleteFollowers(null)
  }
  
  return (
    <Card>
      <Card.Section>
        <Group justify="space-between" px={15} py={10}>
          <ActionIcon radius={`xl`} color="gray" variant="subtle" >
            <Avatar src={`${import.meta.env.VITE_API_BASE_URL}/${user.photoProfile}`} onClick={() => navigate(`/user/${user.id}`)} />
          </ActionIcon>
          <Stack gap={0} style={{ flexGrow: 1 }}>
            <Text lh={1}>{user.username}</Text>
            <Text size="sm" mt={user.name ? "0" : "20.28"} >{user.name}</Text>
          </Stack>
          <Button color="gray" size="xs" onClick={handleDeleteFollowers}>Delete</Button>
        </Group>
      </Card.Section>
    </Card>
  )
}

export default ProfileFriendFollowersCard
