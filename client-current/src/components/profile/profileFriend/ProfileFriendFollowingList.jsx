import { LoadingOverlay, SimpleGrid, } from "@mantine/core"
import useGetCurrentUserFollowing from "@/features/friend/useGetCurrentUserFollowing"
import { Fragment, } from "react"
import { useSelector } from "react-redux"
import ProfileFriendFollowingCard from "./ProfileFriendFollowingCard"

const ProfileFriendFollowingList = () => {
  const currentUser = useSelector(s => s.auth.user)
  const userFriendQuery = useGetCurrentUserFollowing(currentUser.id)
  if (userFriendQuery.isLoading) return <LoadingOverlay visible />
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt={20}>
      {userFriendQuery.data.pages.map((p, i) => (
        <Fragment key={i} >
          {p.data.map(f => (
            <ProfileFriendFollowingCard key={f.id}
              photoProfile={f.user.photoProfile}
              username={f.user.username}
              name={f.user.name}
              userId={f.user.id}
            />
          ))}
        </Fragment>
      ))}
    </SimpleGrid>

  )

}
export default ProfileFriendFollowingList
