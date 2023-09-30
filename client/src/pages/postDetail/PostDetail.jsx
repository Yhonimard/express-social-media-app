import PostDetailCardComponent from "@/components/postDetailCard"
import useGetPostById from "@/features/post/useGetPostById"
import global from "@/redux/global"
import { Box } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const PostDetail = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { data: postData, isLoading, isError, isSuccess } = useGetPostById(params?.postId)
  const navigate = useNavigate()
  if (isError) {
    navigate("../../")
    dispatch(global.action.showNotification({ message: "something went wrong, please try again to see this post detail", status: "error" }))
  }

  useEffect(() => {
    if (isLoading) dispatch(global.action.showBackdrop(true))
    if (isSuccess) dispatch(global.action.showBackdrop(false))
  }, [isLoading, isSuccess, dispatch])

  return (
    <>
      <Box minHeight="115vh">

        {isSuccess &&
          (
            <PostDetailCardComponent
              author={postData?.data?.author}
              content={postData?.data?.content}
              createdAt={postData?.data?.createdAt}
              image={postData?.data?.image}
              postId={postData?.data?.id}
              title={postData?.data?.title}
              isLoading={isLoading}
            />
          )}
      </Box>

    </>
  )
}

export default PostDetail