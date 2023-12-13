import { LoadingOverlay, Tabs, Title } from "@mantine/core"
import useGetCurrentUserFollowing from "@/features/friend/useGetCurrentUserFollowing"
import { useSelector } from "react-redux"
import { useState } from "react"
import ProfileFriendFollowersList from "./ProfileFriendFollowersList"
import ProfileFriendFollowingList from "./ProfileFriendFollowingList"

const ProfileFriendList = () => {
  const [tabsLocation, setTabsLocation] = useState("Following")

  const currentUser = useSelector(s => s.auth.user)
  const userFriendQuery = useGetCurrentUserFollowing(currentUser.id)
  if (userFriendQuery.isLoading) return <LoadingOverlay visible />
  return (
    <>
      <Title order={4} mb={10}>List {tabsLocation}</Title>
      <Tabs value={tabsLocation} onChange={(e) => setTabsLocation(e)}>
        <Tabs.List grow justify="center" >
          <Tabs.Tab value="Following">Following</Tabs.Tab>
          <Tabs.Tab value="Followers">Followers</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Following" >
          <ProfileFriendFollowingList />
        </Tabs.Panel>
        <Tabs.Panel value="Followers">
          <ProfileFriendFollowersList />
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default ProfileFriendList 
