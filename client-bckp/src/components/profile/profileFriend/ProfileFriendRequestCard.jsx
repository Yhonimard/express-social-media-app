import Icon from "@/assets/icon"
import useConfirmUser from "@/features/friend/useConfirmUser"
import useUnconfirmUser from "@/features/friend/useUnconfirmUser"
import { ActionIcon, Avatar, Card, Flex, Group, Stack, Text, Tooltip } from "@mantine/core"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProfileFriendRequestCard = ({ user }) => {

  const currentUser = useSelector(state => state.auth.user)
  const { mutate: confirm } = useConfirmUser({ uid: currentUser.id, senderId: user.id })
  const { mutate: unconfirm } = useUnconfirmUser({ uid: currentUser.id, senderId: user.id })
  const navigate = useNavigate()

  const confirmUser = (user) => {
    confirm(user)
  }

  const unconfirmUser = () => {
    unconfirm(null)
  }

  return (
    <Card style={{ cursor: "pointer" }}>
      <Card.Section>
        <Group justify="space-between" px={15} py={10}>
          <ActionIcon radius={`xl`} color="gray" variant="subtle" onClick={() => navigate(`/user/${user.id}`)}>
            <Avatar src={`${import.meta.env.VITE_API_BASE_URL}/${user.photoProfile}`} />
          </ActionIcon>
          <Stack gap={0} style={{ flexGrow: 1 }}>
            <Text lh={1}>{user.username}</Text>
            <Text size="sm" style={{ visibility: user.name ? "visible" : "hidden" }} mt={user.name ? "0" : "20.29"}>{user.name}</Text>
          </Stack>
          <Flex gap={4}>
            <ActionIcon variant="subtle" color="gray" onClick={unconfirmUser}>
              <Tooltip withArrow label="Unconfirm">
                <Icon.Cancel />
              </Tooltip>
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray" onClick={() => confirmUser(user)}>
              <Tooltip withArrow label="Confirm">
                <Icon.Check />
              </Tooltip>
            </ActionIcon>
          </Flex>
        </Group>
      </Card.Section>
    </Card>
  )
}

export default ProfileFriendRequestCard
