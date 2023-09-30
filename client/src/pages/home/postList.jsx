import PostCardComponent from '@/components/postCard'
import useGetAllPost from '@/features/post/useGetAllPost'
import global from '@/redux/global'
import { Box, Button, Stack } from '@mui/material'
import moment from 'moment'
import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const PostList = ({}) => {
  const { data: postData, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetAllPost()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isFetchingNextPage || isLoading) dispatch(global.action.showBackdrop(true))
    if (!isFetchingNextPage || isLoading) dispatch(global.action.showBackdrop(false))
  }, [isFetchingNextPage, dispatch, isLoading])

  return (
    <Stack spacing={2} justifyContent={`center`} alignItems="center">
      {postData?.pages.map((g, i) => {
        return (
          <Fragment key={i}>
            {
              g?.data?.map(i => (
                <PostCardComponent
                  key={i.id}
                  isLoading={(isLoading)}
                  author={i.author}
                  content={i.content}
                  createdAt={moment(i.createdAt).format("MMMM D, YYYY")}
                  postId={i.id}
                  image={i.image}
                  title={i.title}
                  comments={i.comments}
                />
              ))
            }
          </Fragment>
        )
      }
      )}
      {hasNextPage && (
        <Box display="flex" justifyContent="center">
          <Button
            onClick={fetchNextPage}
            sx={{ mb: 10 }}
            color="inherit"
            variant="contained"
          >
            load more
          </Button>
        </Box>
      )}
    </Stack>

  )
}

export default PostList