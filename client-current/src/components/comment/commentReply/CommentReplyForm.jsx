import Icon from "@/assets/icon"
import { COMMENT_REPLY_ID } from "@/fixtures/global"
import { ActionIcon, Divider, Group, TextInput } from "@mantine/core"
import { useFormik } from "formik"

const CommentReplyForm = ({ parentCommentId }) => {
  const formik = useFormik({
    initialValues: {
      title: ""
    }
  })
  return (
    <div id={`${COMMENT_REPLY_ID}_${parentCommentId}`}>
      <Divider />
      <form onSubmit={formik.handleSubmit}>
        <Group styles={{ root: { flexWrap: "nowrap" } }}>
          <TextInput
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            w={`100%`}
            error={formik.touched.title && formik.errors.title}
          />
          <ActionIcon variant="subtle" color="gray" size={`xl`} radius={`xl`}>
            <Icon.Send />
          </ActionIcon>
        </Group>

      </form>
    </div>

  )
}

export default CommentReplyForm