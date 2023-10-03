import useCreateCommentListByPostId from "@/features/comment/useCreateCommentListByPostId";
import useUpdateComment from "@/features/comment/useUpdateComment";
import commentReducer from "@/redux/commentReducer";
import { ActionIcon, CloseButton, Group, TextInput } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

const PostCardCommentCreateComponent = ({ postId, updateCommentState }) => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().notRequired().min(5).max(200),
    }),
    onSubmit: (data) => {
      if (updateCommentState.isUpdate) {
        updateComment(data, {
          onSuccess: () => {
            formik.setValues({ title: "" })
            dispatch(commentReducer.action.setUpdateComment({ title: false, id: null, isUpdate: false }))
          }
        })

      }
      if (!updateCommentState.isUpdate) {
        addComment(data, {
          onSuccess: () => {
            formik.handleReset()
          }
        })
      }

    },
  });

  if (updateCommentState.isUpdate) formik.initialValues.title = updateCommentState.title

  const { mutate: updateComment } = useUpdateComment(postId, updateCommentState.id)

  const { mutate: addComment } = useCreateCommentListByPostId(postId)

  const changeToCreateComment = () => {
    dispatch(commentReducer.action.setUpdateComment({ title: null, isUpdate: false, id: null }))
    formik.initialValues.title = ""
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Group>
        <TextInput
          placeholder="create comment"
          label={updateCommentState.isUpdate ? "update comment" : "create comment"}
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          style={{ flexGrow: 1 }}
          mt="md"
          error={formik.touched.title && formik.errors.title}
          autoComplete="nope"
        />
        <Group align="flex-end" justify="end" style={{ alignSelf: "end" }}>
          {updateCommentState.isUpdate && <CloseButton onClick={changeToCreateComment} />}
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


      </Group>
    </form>
  );
};

export default PostCardCommentCreateComponent;
