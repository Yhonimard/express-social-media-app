import Icon from "@/assets/Icon"
import comment from "@/config/comment"
import useDisclosure from "@/hooks/useDisclosure"
import { Button, ListItemIcon, Menu, MenuItem, Modal, Paper, Stack, Typography } from "@mui/material"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

const CommentReplyMenu = ({ open, toggleMenu, anchorEl, commentId, postId, parentCommentId }) => {
  const dispatch = useDispatch()
  const commentState = useSelector(s => s.comment)
  const [isOpenDeleteModal, { toggle: toggleDeleteModal }] = useDisclosure(false)
  const updateReplyCommentState = useSelector(s => s.comment.updateReplyComment)

  const isOpenUpdateReplyCommentInput = (updateReplyCommentState.updatedCommentId === commentId && updateReplyCommentState.isOpen)

  const handleDeleteComment = () => {
    if (commentState.updateComment.commentId === commentId && commentState.updateComment.postId == postId) {
      dispatch(comment.reducer.action.closeUpdateCommentInput())
    }
    deleteComment(null)
  }

  const { mutate: deleteComment } = comment.query.DeleteCommentReply({ postId: postId, replyCommentId: commentId, parentCommentId })

  const editReplyComment = useCallback(() => {
    toggleMenu()
    if (!isOpenUpdateReplyCommentInput)
      dispatch(comment.reducer.action.openUpdateReplyCommentInput({ updatedCommentId: commentId }))
    if (isOpenUpdateReplyCommentInput)
      dispatch(comment.reducer.action.closeUpdateReplyCommentInput())
  }, [dispatch, toggleMenu, commentId, isOpenUpdateReplyCommentInput])

  return (
    <>
      <Menu
        open={open}
        onClose={toggleMenu}
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "center" }}
        transformOrigin={{ horizontal: "right", vertical: 'top' }}
        MenuListProps={{
          sx: {
            width: 150
          }
        }}
      >
        <MenuItem onClick={editReplyComment}>
          <ListItemIcon>
            <Icon.Edit />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={toggleDeleteModal}>
          <ListItemIcon>
            <Icon.Delete />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu >
      <Modal open={isOpenDeleteModal} onClose={toggleDeleteModal} sx={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
        <Paper sx={{ maxWidth: "30rem", width: "100%", p: 3 }}>
          <Typography variant="h6" component="h2">
            Are you sure want to delete this post?
          </Typography>
          <Stack direction={`row`} width={`100%`} justifyContent={`end`} mt={2}>
            <Button color="error" onClick={toggleDeleteModal}>No</Button>
            <Button onClick={handleDeleteComment}>Yes</Button>
          </Stack>
        </Paper>
      </Modal>
    </>
  )
}

export default CommentReplyMenu
