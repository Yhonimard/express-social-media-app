import useGetAllCommentPostId from "@/features/comment/useGetAllCommentPostId"
import { Favorite, MoreVert } from "@mui/icons-material"
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Skeleton, Stack, Typography } from "@mui/material"
import { Fragment, useState } from "react"
import { useSelector } from "react-redux"
import CommentComponent from "../comment"
import CommentInputComponent from "../commentInput"
import CommentNotFoundComponent from "../commentNotFound"
import PostCardMenuComponent from "../postCardMenu"
import useGetPostLikesList from "@/features/post/useGetPostLikesList"
import useLikeOrUnlikePostList from "@/features/post/useLikeOrUnlikePostList"
const PostDetailCard = ({
  author,
  content,
  postId,
  image,
  title,
  createdAt,
  isLoading,

}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { username } = useSelector(state => state.auth.data)
  const { data: commentsData, fetchNextPage, hasNextPage } = useGetAllCommentPostId(postId, 3)
  const user = useSelector(state => state.auth.data)

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const { data: likesData } = useGetPostLikesList({ postId })

  const userHasLike = likesData?.data?.some(u => u?.user?.id === user.id)

  const { mutate: likeOrUnlike } = useLikeOrUnlikePostList({ postId })

  const likeOrUnlikeHandler = (userHasLike) => {
    likeOrUnlike(userHasLike)
  }


  return (
    <Card sx={{ mb: 5 }}>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          avatar={
            isLoading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={35}
                height={35}
              />
            ) : (
              <Avatar
                sx={{ width: 35, height: 35 }}
                src={`${import.meta.env.VITE_API_BASE_URL}/${author?.photoProfile
                  }`}
              />
            )
          }
          action={
            isLoading || author?.username !== username ? null : (
              <>
                <IconButton onClick={openMenu}>
                  <MoreVert />
                </IconButton>
                <PostCardMenuComponent
                  postId={postId}
                  anchorEl={anchorEl}
                  title={title}
                  content={content}
                  handleCloseMenu={() => setAnchorEl(null)}
                  single={true}
                />
              </>
            )
          }
          title={
            isLoading ? (
              <Skeleton animation="wave" height={10} width="80%" sx={{ mb: 1 }} />
            ) : (
              author?.username
            )
          }
          subheader={
            isLoading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              createdAt
            )
          }
        />
        {isLoading ? (
          <Skeleton sx={{ height: 400 }} animation="wave" variant="rectangular" />
        ) : (
          <CardMedia
            component="img"
            src={`${import.meta.env.VITE_API_BASE_URL}/${image}`}
            // height={400}
            sx={{ objectFit: "cover" }}
          />
        )}
        <CardContent>
          {isLoading ? (
            <>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </>
          ) : (
            <>
              <Typography variant="body1">{title}</Typography>
              <Typography
                variant="body2"
                className="text3truncate"
                color="text.secondary"
              >
                {content}
              </Typography>
            </>
          )}
        </CardContent>
        <Divider />
        <CardActions>
          <IconButton onClick={() => likeOrUnlikeHandler({ postId, userHasLike })}>
            <Favorite color={userHasLike ? "error" : ""} />
          </IconButton>
        </CardActions>
        <Divider />
        <CommentInputComponent postId={postId} />
        <Divider />
        <Box maxHeight="398px" overflow="auto" sx={{ overflowX: "hidden" }}>
          {
            commentsData?.pages?.map((g, i) => {
              return (<Fragment key={i}>
                {g.data.length < 1 && <CommentNotFoundComponent />}
                {
                  g?.data.map(i => (
                    <CommentComponent key={i.id} author={i.author} createdAt={i.createdAt} title={i.title} />
                  ))
                }

              </Fragment>
              )
            })
          }
          {hasNextPage && (
            <Stack my={2} width="100%" justifyContent="center" px={2}>
              <Button variant="contained" color="inherit" sx={{ justifySelf: "center" }} onClick={fetchNextPage}>Load more</Button>
            </Stack>
          )}
        </Box>
      </Card>
    </Card>
  )
}

export default PostDetailCard