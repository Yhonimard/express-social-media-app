import { Button, LoadingOverlay, SimpleGrid } from "@mantine/core"
import ProfileCommentCard from "./ProfileCommentCard"
import useGetCommentHasCommentedCurrentUser from "@/features/comment/useGetCommentHasCommentedCurrentUser"
import { useSelector } from "react-redux"
import { Fragment } from "react"
import moment from "moment"

const ProfileComment = () => {
  const currentUser = useSelector(state => state.auth.user)
  const { data: commentUserData, isLoading, hasNextPage, fetchNextPage } = useGetCommentHasCommentedCurrentUser(currentUser.id)
  if (isLoading) return <LoadingOverlay visible />

  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {commentUserData.pages.map((p, i) => (
          <Fragment key={i}>
            {p.data.map(p => (
              <ProfileCommentCard key={p.id} title={p.title} createdAt={moment(p.createdAt).format("DD MMMM, YYYY")} postId={p.post.id} />
            ))}
          </Fragment>
        ))}
      </SimpleGrid>
      {hasNextPage &&
        <Button fullWidth my={30} bg={`gray`} onClick={fetchNextPage}>see more youre comment!!</Button>
      }
    </>
  )
}

export default ProfileComment