import useGetCurrentUserFollowers from "@/features/friend/useGetCurrentUserFollowers"
import { LoadingOverlay, SimpleGrid } from "@mantine/core"
import { Fragment } from "react"
import { useSelector } from "react-redux"
import ProfileFriendFollowersCard from "./ProfileFriendFollowersCard"

const ProfileFriendFollowersList = () => {
  const currentUser = useSelector(state => state.auth.user)
  const userFollowersQuery = useGetCurrentUserFollowers({ uid: currentUser.id })
  if (userFollowersQuery.isLoading) return <LoadingOverlay visible />
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt={20}>
      {userFollowersQuery.data.pages.map((p, i) => (
        <Fragment key={i}>
          {p.data.map(f => (
            <ProfileFriendFollowersCard
              key={f.id}
              user={f.user}
            />
          ))}
        </Fragment>
      ))}
    </SimpleGrid>
  )

}
export default ProfileFriendFollowersList
