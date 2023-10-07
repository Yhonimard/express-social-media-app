import PostDetailCardComponent from "./postDetailCard"
import useGetSinglePost from "@/features/post/useGetSinglePost"
import globalReducer from "@/redux/globalReducer"
import { Container } from "@mantine/core"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

const PostDetailComponent = () => {
  const params = useParams()
  const { data: postData, isLoading, isSuccess } = useGetSinglePost(params.postId)
  const dispatch = useDispatch()
  useEffect(() => {
    if (isLoading) dispatch(globalReducer.action.showLoadingOverlay(true))
    else dispatch(globalReducer.action.showLoadingOverlay(false))
  }, [isLoading, dispatch])


  return (

    <Container>
      {isSuccess && (
        <PostDetailCardComponent postData={postData?.data} postId={params?.postId} />
      )}
    </Container>
  )
}

export default PostDetailComponent