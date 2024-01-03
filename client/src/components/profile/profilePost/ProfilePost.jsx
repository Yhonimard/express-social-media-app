import PostList from "@/components/post/PostList"
import post from "@/config/post"
import { Box } from "@mui/material"

const ProfilePost = () => {
  const userPostQuery = post.query.GetCurrentUserPosts()
  return (
    <>
      <Box mt={1}>
        <PostList query={userPostQuery} />
      </Box>
    </>
  )
}

export default ProfilePost