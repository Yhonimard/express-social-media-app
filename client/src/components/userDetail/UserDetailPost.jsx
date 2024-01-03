import post from "@/config/post"
import { Box } from "@mui/material"
import PostList from "../post/PostList"

const UserDetailPost = ({ userId }) => {
  const userPostQuery = post.query.GetPostByUserId(userId)
  return (
    <>
      {!userPostQuery.isLoading && userPostQuery.isSuccess && (
        <Box mt={2}>
          <PostList query={userPostQuery} />
        </Box>
      )}
    </>
  )
}

export default UserDetailPost