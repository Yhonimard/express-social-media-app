import Icon from "@/assets/Icon";
import comment from "@/config/comment";
import { COMMENT_REPLY_ID } from "@/fixtures/post-comment";
import commentValidation from "@/validation/comment.validation";
import { IconButton, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { memo } from "react";
import { useDispatch } from "react-redux";

const CommentReplyInput = ({ postId, parentCommentId }) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (data) => {
      replyComment(data, {
        onSuccess: () => {
          dispatch(comment.reducer.action.closeReplyCommentInput())
          formik.handleReset()
        },
      });
    },
    validationSchema: commentValidation.createComment,
  });
  const { mutate: replyComment } = comment.query.ReplyComment({
    pcid: parentCommentId,
    pid: postId,
  });
  return (
    <form style={{ width: "100%" }} onSubmit={formik.handleSubmit} id={`${COMMENT_REPLY_ID}-${parentCommentId}`}>
      <Stack
        direction={`row`}
        gap={2}
        justifyContent={`center`}
        alignItems={`center`}
      >
        <TextField
          variant="outlined"
          size="small"
          onChange={formik.handleChange}
          name="title"
          fullWidth
          value={formik.values.title}
          margin="dense"
          label={"reply comment"}
        />
        <IconButton type="submit">
          <Icon.Send />
        </IconButton>
      </Stack>
    </form>
  );
};

export default memo(CommentReplyInput);
