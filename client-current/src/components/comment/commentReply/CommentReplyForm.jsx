import Icon from "@/assets/icon"
import useReplyComment from "@/features/comment/useReplyComment"
import { COMMENT_REPLY_ID } from "@/fixtures/global"
import { ActionIcon, Divider, Group, TextInput, Tooltip } from "@mantine/core"
import { useFormik } from "formik"
import { useState } from "react"

const CommentReplyForm = ({ parentCommentId, setIsOpenReplyComment, postId }) => {
  const formik = useFormik({
    initialValues: {
      title: ""
    },
    onSubmit: (data) => {
      replyComment(data, {
        onSuccess: () => {
          formik.handleReset()
          setIsOpenReplyComment(state => !state)
        }
      })
    }
  })

  const { mutate: replyComment } = useReplyComment({ pcid: parentCommentId, pid: postId })
  return (
    <div id={`${COMMENT_REPLY_ID}_${parentCommentId}`} style={{ position: "relative" }}>
      <Divider mb={`lg`} />
      <form onSubmit={formik.handleSubmit}>
        <Group styles={{ root: { flexWrap: "nowrap" } }}>
          <TextInput
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            w={`100%`}
            mt={3}
            error={formik.touched.title && formik.errors.title}
          />
          <ActionIcon variant="subtle" color="gray" size={`lg`} type="submit">
            <Icon.Send />
          </ActionIcon>
          <Tooltip label={`close`} withArrow>
            <ActionIcon style={{ alignSelf: "starts", position: "absolute", right: 40, top: 15 }} variant="transparent" size={`sm`} color="gray" onClick={() => setIsOpenReplyComment((state) => !state)}>
              <Icon.Close sx={{ width: 20 }} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </form>
    </div >

  )
}

export default CommentReplyForm