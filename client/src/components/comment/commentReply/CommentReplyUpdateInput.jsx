import { TextField, Stack, IconButton } from "@mui/material"
import Icon from "@/assets/Icon"
import commentValidation from "@/validation/comment.validation"
import { useFormik } from "formik"
import comment from "@/config/comment"
import { useDispatch } from "react-redux"

const CommentReplyUpdateInput = ({ postId, parentCommentId, replyCommentId, title }) => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      title: title
    },
    onSubmit: data => {
      updateReplyComment(data, { onSuccess: () => dispatch(comment.reducer.action.closeUpdateReplyCommentInput()) })
    },
    validationSchema: commentValidation.createComment
  })

  const { mutate: updateReplyComment } = comment.query.UpdateCommentReply({ pid: postId, replyCommentId, parentCommentId })

  return (
    <form style={{ marginLeft: "72px" }} onSubmit={formik.handleSubmit} >
      <Stack direction={`row`} gap={2} justifyContent={`center`} alignItems={`center`}>
        <TextField
          variant="outlined"
          size="small"
          onChange={formik.handleChange}
          name="title"
          fullWidth
          value={formik.values.title}
          margin="dense"
          label="update comment"
        />
        <IconButton type="submit">
          <Icon.Send />
        </IconButton>
      </Stack>
    </form>
  )
}

export default CommentReplyUpdateInput
