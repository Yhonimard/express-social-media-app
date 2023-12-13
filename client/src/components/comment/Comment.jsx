import Icon from "@/assets/Icon"
import comment from "@/config/comment"
import { COMMENT_REPLY_ID } from "@/fixtures/post-comment"
import useOpenMenu from "@/hooks/useOpenMenu"
import useScrollIntoView from "@/hooks/useScrollIntoView"
import { Avatar, Box, Collapse, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, Tooltip, Typography } from "@mui/material"
import { memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import CommentMenu from "./CommentMenu"
import CommentReplyInput from "./commentReply/CommentReplyInput"
import CommentReplyList from "./commentReply/CommentReplyList"

const Comment = ({ author, created_at, title, cid, pid, isLast }) => {
  const [isOpenCommentMenu, anchorElCommentMenu, toggleCommentMenu] = useOpenMenu()

  const scrollIntoView = useScrollIntoView()
  const currentUser = useSelector(s => s.auth.user)

  const dispatch = useDispatch()
  const replyCommentState = useSelector(s => s.comment.replyComment)

  const { data: hasLike } = comment.query.GetCurrentUserHasLikeComment({ uid: currentUser.id, cid, pid })

  const likeOrUnlike = () => {
    if (hasLike) unlikeComment(null)
    if (!hasLike) likeComment(null)
  }

  const { mutate: likeComment } = comment.query.LikeComment({ cid, uid: currentUser.id })
  const { mutate: unlikeComment } = comment.query.UnlikeComment({ cid, uid: currentUser.id })

  const isOpenReplyInp = (replyCommentState.isOpen && replyCommentState.parentId === cid)

  const isRepliedComment = (replyCommentState.repliedCommentId === cid)

  const openReplyInput = () => {
    dispatch(comment.reducer.action.openReplyCommentInput({ parentId: cid, repliedCommentId: cid }))
    scrollIntoView(`${COMMENT_REPLY_ID}-${cid}`)
  }

  const closeReplyInput = () => {
    dispatch(comment.reducer.action.closeReplyCommentInput())
  }

  
  return (
    <>
      <Box>
        <ListItem alignItems="flex-start" sx={{ py: 0 }}>
          <ListItemAvatar>
            <Tooltip title={author.username} arrow>
              <IconButton size="small">
                <Avatar src={`${import.meta.env.VITE_API_BASE_URL}/${author.photo_profile}`} sx={{ width: 37, height: 37 }} />
              </IconButton>
            </Tooltip>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Stack
                direction={`row`}
                justifyContent={`space-between`}
                alignItems={`center`}
              >
                <Stack>
                  <Typography fontWeight={500} >{author.username}</Typography>
                  <Typography variant="body2" color={`text.secondary`} >{created_at}</Typography>
                </Stack>
                {currentUser.id === author.id && (
                  <IconButton size="small" onClick={toggleCommentMenu}>
                    <Icon.MoreVert />
                  </IconButton>
                )}
              </Stack>
            }
            secondaryTypographyProps={{
              variant: "body1",
              mt: 1
            }}
            secondary={
              title
            }
          />
        </ListItem>
        <Box my={1} pl={8.1}>
          <Stack direction={`row`} gap={.3} alignItems={`center`} >
            <IconButton size="small" onClick={likeOrUnlike}>
              <Icon.Favorite fontSize="small" color={hasLike ? "error" : "inherit"} />
            </IconButton>
            {isRepliedComment && (
              <IconButton size="small" onClick={closeReplyInput}>
                <Icon.Block fontSize="small" />
              </IconButton>
            )}
            {!isRepliedComment && (
              <IconButton size="small" onClick={openReplyInput}>
                <Icon.Reply fontSize="small" />
              </IconButton>
            )}
          </Stack>
          <Box pr={2}>
            <CommentReplyList cid={cid} pid={pid} size={4} />
            <Collapse in={isOpenReplyInp}>
              <CommentReplyInput postId={pid} parentCommentId={cid} />
            </Collapse>
          </Box>
        </Box>
      </Box>
      {!isLast && (
        <Divider variant="inset" component={`li`} />
      )}
      <CommentMenu open={isOpenCommentMenu} toggleMenu={toggleCommentMenu} anchorEl={anchorElCommentMenu} commentId={cid} postId={pid} title={title} />
    </>
  )
}

export default memo(Comment)
