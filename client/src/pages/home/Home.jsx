import LoadingOverlay from "@/components/loadingOverlay/LoadingOverlay"
import PostFab from "@/components/post/PostFab"
import PostList from "@/components/post/PostList"
import post from "@/config/post"
import { Container } from "@mui/material"

const HomePage = () => {
  const postsQuery = post.query.GetPosts()
  if (postsQuery.isLoading) return <LoadingOverlay />


  return (
    <>
      <Container maxWidth="sm">
        <PostList query={postsQuery} />
      </Container>
      <PostFab />
    </>
  )
}

export default HomePage
