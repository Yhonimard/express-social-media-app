import LoadingOverlay from "@/components/loadingOverlay/LoadingOverlay"
import PostDetailCard from "@/components/postDetail/PostDetailCard"
import post from "@/config/post"
import { Container } from "@mui/material"
import { useParams } from "react-router-dom"

const PostDetailPage = () => {
  const params = useParams()

  const postDetailQuery = post.query.GetPost(params.postId)
  if (postDetailQuery.isLoading) return <LoadingOverlay />

  return (
    <Container maxWidth="sm" sx={{ mb: 2 }}>
      <PostDetailCard
        author={postDetailQuery.data.author}
        content={postDetailQuery.data.content}
        created_at={postDetailQuery.data.created_at}
        image={postDetailQuery.data.image}
        pid={params.postId}
        title={postDetailQuery.data.title}
      />
    </Container>
  )
}

export default PostDetailPage
