import useCreateCommentListByPostId from "@/features/comment/useCreateCommentListByPostId";
import commentValidation from "@/helpers/validation/comment.validation";
import { ActionIcon, Group, TextInput } from "@mantine/core";
import { Send as IconSend } from "@mui/icons-material";
import { useFormik } from "formik";

const CommentFormComponent = ({ postId }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: commentValidation.createComment,
    onSubmit: (data) => {
      addComment(data, {
        onSuccess: () => {
          formik.handleReset()
        }
      })

    },
  });


  const { mutate: addComment } = useCreateCommentListByPostId(postId)

  return (
    <form onSubmit={formik.handleSubmit}>
      <Group>
        <TextInput
          placeholder="create comment"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          style={{ flexGrow: 1 }}
          mt="md"
          error={formik.touched.title && formik.errors.title}
          autoComplete="nope"
        />
        <ActionIcon
          color="gray"
          mt={`md`}
          variant="subtle"
          radius={`xl`}
          size={`xl`}
          type="submit"
        >
          <IconSend />
        </ActionIcon>
      </Group>
    </form>
  );
};

export default CommentFormComponent;
