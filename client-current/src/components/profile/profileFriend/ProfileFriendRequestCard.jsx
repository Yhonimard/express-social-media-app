import Icon from "@/assets/icon"
import { ActionIcon, Avatar, Box, Button, Card, Flex, Group, Stack, Text, Tooltip } from "@mantine/core"

const ProfileFriendRequestCard = () => {
  return (
    <Card>

      <Card.Section>
        <Group justify="space-between" px={15} py={10}>
          <ActionIcon radius={`xl`} color="gray" variant="subtle" >
            <Avatar />
          </ActionIcon>
          <Stack gap={0} style={{ flexGrow: 1 }}>
            <Text lh={1}>username</Text>
            <Text size="sm">name</Text>
          </Stack>
          <Flex gap={4}>
            <ActionIcon variant="subtle" color="gray" >
              <Tooltip withArrow label="Unconfirm">
              <Icon.Cancel />
              </Tooltip>
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
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