import Icon from "@/assets/Icon"
import CommentInput from "@/components/comment/CommentInput"
import CommentList from "@/components/comment/CommentList"
import comment from "@/config/comment"
import postLike from "@/config/post-like"
import useOpenMenu from "@/hooks/useOpenMenu"
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Collapse, Divider, IconButton, Skeleton, Typography } from "@mui/material"
import Image from "mui-image"
import { memo, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import BadgeOnline from "../BadgeOnline"
import PostDetailCardMenu from "./PostDetailCardMenu"

const PostDetailCard = ({ author, created_at, title, content, image, isFetching, pid }) => {
  const [isLoading, setIsLoading] = useState(true || isFetching)
  // const [isOpenCommentInput, setIsOpenCommentInput] = useState(false)
  const [isOpenPostCardMenu, postMenuAnchorEL, togglePostMenu] = useOpenMenu()

  const dispatch = useDispatch()
  const commentState = useSelector(s => s.comment.comment)
  const isOpenCommentInput = (commentState.isOpen && commentState.postId === pid)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const currentUser = useSelector(s => s.auth.user)

  const likeQuery = postLike.query.GetCurrentUserHasLike({ pid, currentUserId: currentUser.id })

  const { mutate: likePost } = postLike.query.LikePost({ pid, uid: currentUser.id })
  const { mutate: unlikePost } = postLike.query.UnlikePost({ pid, uid: currentUser.id })

  const likeOrUnlike = () => {
    if (likeQuery.data.hasLike) unlikePost(null)
    if (!likeQuery.data.hasLike) likePost(null)
  }

  const updateCommentState = useSelector(s => s.comment.updateComment)
  const isOpenUpdateCommentInput = updateCommentState.postId === pid

  const openCommentInput = useCallback(() => {
    dispatch(comment.reducer.action.openCommentInput({ postId: pid }))
  }, [dispatch, pid])

  const closeCommentInput = useCallback(() => {
    if (isOpenCommentInput) dispatch(comment.reducer.action.closeCommentInput())
    if (isOpenUpdateCommentInput) dispatch(comment.reducer.action.closeUpdateCommentInput())
  }, [dispatch, isOpenUpdateCommentInput, isOpenCommentInput])

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <>
              {isLoading && <Skeleton width={40} height={40} animation="wave" variant="circular" />}
              {!isLoading && (
                <IconButton to={author.id === currentUser.id ? '/profile' : `/user/${author.id}`} LinkComponent={Link}>
                  <BadgeOnline userId={author.id}>
                    <Avatar sx={{ width: 40, height: 40 }} src={`${import.meta.env.VITE_API_BASE_URL}/${author.photo_profile}`} />
                  </BadgeOnline>
                </IconButton>
              )}
            </>
          }
          action={
            <>
              {isLoading && null}
              {!isLoading && author.id === currentUser.id && (
                <IconButton onClick={togglePostMenu}>
                  <Icon.MoreVert />
                </IconButton>
              )}
            </>
          }
          title={isLoading ? <Skeleton animation="wave" height={10} width={`80%`} sx={{ mb: "6px" }} /> : author.username}
          subheader={isLoading ? <Skeleton animation="wave" height={10} width="40%" /> : created_at}
        />
        <Box sx={{ cursor: "pointer" }} >
          {isLoading ?
            <Skeleton animation="wave" variant="rectangular" height={380} />
            : (
              <Image src={`${import.meta.env.VITE_API_BASE_URL}/${image}`} showLoading errorIcon easing="ease" duration={1000} alt={title} />
            )}
          <CardContent>
            {isLoading && (
              <>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="80%" />
              </>
            )}
            {!isLoading && (
              <>
                <Typography>{title}</Typography>
                <Typography>{content}</Typography>
              </>
            )}
          </CardContent>
        </Box>
        <CardActions>
          <IconButton onClick={likeOrUnlike}>
            <Icon.Favorite color={likeQuery.data?.hasLike ? "error" : "inherit"} />
          </IconButton>

          {(isOpenUpdateCommentInput || isOpenCommentInput) && (
            <IconButton onClick={closeCommentInput}>
              <Icon.Block />
            </IconButton>
          )}
          {(!isOpenUpdateCommentInput && !isOpenCommentInput) && (
            <IconButton onClick={openCommentInput}>
              <Icon.Comment />
            </IconButton>
          )}
        </CardActions>
        <Divider />

        <Collapse in={isOpenCommentInput || isOpenUpdateCommentInput}>
          <CardActions>
            <CommentInput postId={pid}
              updateCommentState={isOpenUpdateCommentInput && updateCommentState}
              isUpdateComment={isOpenUpdateCommentInput}
            />
          </CardActions>
        </Collapse>

        <Box>
          <CommentList
            size={4}
            pid={pid}
            isOnDetailPage
          />
        </Box>
      </Card>

      <PostDetailCardMenu
        anchorEl={postMenuAnchorEL}
        open={isOpenPostCardMenu}
        toggle={togglePostMenu}
        postId={pid}
        title={title}
        content={content}
      />
    </>
  )
}

export default memo(PostDetailCard)
