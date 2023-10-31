import { ActionIcon, Avatar, Button, Card, Group, Stack, Text } from "@mantine/core"
import { useNavigate } from "react-router-dom"

const ProfileFriendCard = ({ username, name, photoProfile, userId }) => {
  const navigate = useNavigate()
  return (
    <Card onClick={() => navigate(`/user/${userId}`)}>
      <Card.Section>
        <Group justify="space-between" px={15} py={10}>
          <ActionIcon radius={`xl`} color="gray" variant="subtle" >
            <Avatar src={`${import.meta.env.VITE_API_BASE_URL}/${photoProfile}`} onClick={() => navigate(`/user/${userId}`)} />
          </ActionIcon>
          <Stack gap={0} style={{ flexGrow: 1 }}>
            <Text lh={1}>{username}</Text>
            <Text size="sm" mt={name ? "0" : "20.28"} >{name}</Text>
          </Stack>
          <Button color="gray" size="xs">Unfollow</Button>
        </Group>
      </Card.Section>
    </Card>
  )
}

export default ProfileFriendCard
