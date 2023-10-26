import { ActionIcon, Avatar, Button, Card, Group, Stack, Text } from "@mantine/core"

const ProfileFriendCard = () => {
  return (
    <Card >
      <Card.Section>
        <Group justify="space-between" px={15} py={10}>
          <ActionIcon radius={`xl`} color="gray" variant="subtle" >
            <Avatar />
          </ActionIcon>
          <Stack gap={0} style={{ flexGrow: 1 }}>
            <Text lh={1}>username</Text>
            <Text size="sm">name</Text>
          </Stack>
          <Button color="gray" size="xs">Unfollow</Button>
        </Group>
      </Card.Section>
    </Card>
  )
}

export default ProfileFriendCard