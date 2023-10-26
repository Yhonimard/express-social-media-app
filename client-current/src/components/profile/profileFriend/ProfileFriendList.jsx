import { Box, SimpleGrid, Title } from "@mantine/core"
import ProfileFriendCard from "./ProfileFriendCard"

const ProfileFriendList = () => {
  return (
    <>
      <Title order={4} mb={10}>List Friend</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        <ProfileFriendCard />
        <ProfileFriendCard />
        <ProfileFriendCard />
        <ProfileFriendCard />
        <ProfileFriendCard />
      </SimpleGrid>
    </>
  )
}

export default ProfileFriendList 