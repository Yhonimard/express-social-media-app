import { Button, LoadingOverlay, SimpleGrid } from "@mantine/core"
import UserDetailPostCard from "./UserDetailPostCard"
import useGetPostByUserId from "@/features/post/useGetPostByUserId"
import { Fragment } from "react"

const UserDetailPost = ({ params, username }) => {

  const postByUserIdQuery = useGetPostByUserId(params.uid)
  if (postByUserIdQuery.isLoading) return <LoadingOverlay visible />

  return (
    <>
      <SimpleGrid cols={1}>
        {postByUserIdQuery.data.pages.map((p, i) => (
          <Fragment key={i}>
            {p.data.map(p => (
              <UserDetailPostCard
                key={p.id}
                author={p.author}
                content={p.content}
                createdAt={p.createdAt}
                image={p.image}
                postId={p.id}
                title={p.title}
              />
            ))}
          </Fragment>
        ))}
      </SimpleGrid>
      {postByUserIdQuery.hasNextPage && (
        <Button
          onClick={postByUserIdQuery.fetchNextPage}
          fullWidth
          color="gray"
          variant="filled"
          my={20}>
          see more your post
        </Button>
      )}
    </>
  )
}

export default UserDetailPost