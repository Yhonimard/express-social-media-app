import Icon from "@/assets/Icon"
import comment from "@/config/comment"
import { UPDATE_COMMENT_INPUT_ID } from "@/fixtures/post-comment"
import commentValidation from "@/validation/comment.validation"
import { IconButton, Stack, TextField } from "@mui/material"
import { useFormik } from "formik"
import { memo, useEffect } from "react"
import { useDispatch } from "react-redux"

const CommentInput = ({ postId, updateCommentState, isUpdateComment, }) => {

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      title: ""
    },
    onSubmit: data => {
      if (!isUpdateComment)
        createComment(data, {
          onSuccess: () => formik.handleReset()
        })

      if (isUpdateComment) updateComment(data, { onSuccess: () => dispatch(comment.reducer.action.closeUpdateCommentInput()) })
    },
    validationSchema: commentValidation.createComment
  })

  useEffect(() => {
    if (isUpdateComment && updateCommentState.title) formik.setFieldValue("title", updateCommentState.title)
    else formik.setFieldValue("title", "")
  }, [isUpdateComment, updateCommentState])

  const { mutate: createComment } = comment.query.CreateCommentPost({ postId })
  const { mutate: updateComment } = comment.query.UpdateComment({ postId, commentId: updateCommentState.commentId })


  return (
    <form style={{ width: "100%" }} onSubmit={formik.handleSubmit} >
      <Stack direction={`row`} gap={2} justifyContent={`center`} alignItems={`center`}>
        <TextField
          id={`${UPDATE_COMMENT_INPUT_ID}-${postId}`}
          variant="outlined"
          size="small"
          onChange={formik.handleChange}
          name="title"
          fullWidth
          value={formik.values.title}
          margin="dense"
          label={isUpdateComment ? "update comment" : "your comment"}
        />
        <IconButton type="submit">
          <Icon.Send />
        </IconButton>
      </Stack>
    </form>
  )
}

export default memo(CommentInput)
