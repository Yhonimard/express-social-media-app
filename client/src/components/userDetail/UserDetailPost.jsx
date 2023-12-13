import post from "@/config/post"
import PostList from "../post/PostList"
import LoadingOverlay from "../loadingOverlay/LoadingOverlay"
import { Box } from "@mui/material"

const UserDetailPost = ({ userId }) => {
  const userPostQuery = post.query.GetPostByUserId(userId)
  if (userPostQuery.isLoading) return <LoadingOverlay />
  return (
    <Box mt={2}>
      <PostList query={userPostQuery} />
    </Box>
  )
}

export default UserDetailPost