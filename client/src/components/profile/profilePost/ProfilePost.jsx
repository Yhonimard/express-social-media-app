import LoadingOverlay from "@/components/loadingOverlay/LoadingOverlay"
import PostList from "@/components/post/PostList"
import post from "@/config/post"
import { Box } from "@mui/material"

const ProfilePost = () => {
  const userPostQuery = post.query.GetCurrentUserPosts()
  if (userPostQuery.isLoading) return <LoadingOverlay />
  return (
    <Box mt={1}>
      <PostList query={userPostQuery} />
    </Box>
  )
}

export default ProfilePost