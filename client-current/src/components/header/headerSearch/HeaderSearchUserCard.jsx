import { ActionIcon, Avatar, Card, Group, Stack, Text } from "@mantine/core"
import { useNavigate } from "react-router-dom"

const HeaderSearchUserCard = ({ user, toggle }) => {
  const navigate = useNavigate()
  const navigateToUserDetail = (uid) => {
    navigate(`/user/${uid}`)
    toggle()
  }
  return (
    <Card style={{ cursor: "pointer" }} onClick={() => navigateToUserDetail(user.id)}>
      <Card.Section inheritPadding py={10}>
        <Group justify="space-between" >
          <ActionIcon radius={`xl`} color="gray" variant="subtle" >
            <Avatar src={`${import.meta.env.VITE_API_BASE_URL}/${user.photoProfile}`} onClick={() => navigate(`/user/${user.id}`)} />
          </ActionIcon>
          <Stack gap={0} style={{ flexGrow: 1 }}>
            <Text size="lg" fw={`bold`}>{user.username}</Text>
            <Text mt={user.name ? "0" : "20.28"} >{user.name}</Text>
          </Stack>
        </Group>
      </Card.Section>
    </Card>
  )
}

export default HeaderSearchUserCard