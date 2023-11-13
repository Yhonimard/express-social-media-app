import useDeleteCommentReply from "@/features/comment/useDeleteCommentReply";
import useUpdateCommentReply from "@/features/comment/useUpdateCommentReply";
import commentValidation from "@/helpers/validation/comment.validation";
import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Modal,
  TextInput,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Delete as IconDelete, Edit as IconEdit, MoreVert as IconMoreVert } from "@mui/icons-material";
import { useFormik } from "formik";

const CommentMenuReply = ({ data, parentCommentId, postId }) => {
  const [isOpenEditModal, { toggle: toggleEditModal }] = useDisclosure(false);
  const [isOpenDeleteModal, { toggle: toggleDeleteModal }] =
    useDisclosure(false);

  const updateMenu = ({ title }) => {
    updateCommentFormik.setValues({
      title,
    });
    toggleEditModal();
  };

  const updateCommentFormik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: commentValidation.updateComment,
    onSubmit: (data) => {
      updateReplyComment(data)
    },
  });

  const { mutate: updateReplyComment } = useUpdateCommentReply({ parentCommentId, replyCommentId: data.commentId, pid: postId })
  
  const { mutate: deleteReplyComment } = useDeleteCommentReply({ parentCommentId, postId, replyCommentId: data.commentId })

  const deletePost = () => {
    deleteReplyComment(null)
  };


  return (
    <>
      <Menu position="left-start">

        <Menu.Target>
          <ActionIcon
            color="gray"
            variant="subtle"
          >
            <IconMoreVert sx={{ width: 20 }} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconEdit style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => updateMenu({ title: data.title })}
          >
            Edit
          </Menu.Item>
          <Menu.Item
            onClick={toggleDeleteModal}
            leftSection={
              <IconDelete style={{ width: rem(14), height: rem(14) }} />
            }
            color="red"
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Modal
        opened={isOpenEditModal}
        onClose={toggleEditModal}
        centered
        title="update comment"
      >
        <form onSubmit={updateCommentFormik.handleSubmit}>
          <TextInput
            label="title"
            placeholder="title"
            name="title"
            value={updateCommentFormik.values.title}
            onChange={updateCommentFormik.handleChange}
            error={updateCommentFormik.touched.title && updateCommentFormik.errors.title}
            autoComplete="nope"
          />
          <Button fullWidth mt={`sm`} color="gray" type="submit">
            update
          </Button>
        </form>
      </Modal>
      <Modal
        centered
        onClose={toggleDeleteModal}
        opened={isOpenDeleteModal}
        title="are you sure want to delete this comment?"
      >
        <Group justify="end">
          <Button onClick={toggleDeleteModal} color="red">
            no
          </Button>
          <Button onClick={deletePost}>yes</Button>
        </Group>
      </Modal>
    </>
  );
};

export default CommentMenuReply;
