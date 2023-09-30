import useCreateCommentListByPostId from "@/features/comment/useCreateCommentListByPostId";
import { ActionIcon, Group, TextInput } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { useFormik } from "formik";
import * as yup from "yup"

const PostCardCreateCommentComponent = ({ postId }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().notRequired().min(5).max(200),
    }),
    onSubmit: (data) => {
      addComment(data, { onSuccess: () => formik.handleReset() })
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
          variant="light"
          size={`lg`}
          component="button"
          type="submit"
        >
          <IconSend />
        </ActionIcon>
      </Group>
    </form>
  );
};

export default PostCardCreateCommentComponent;
