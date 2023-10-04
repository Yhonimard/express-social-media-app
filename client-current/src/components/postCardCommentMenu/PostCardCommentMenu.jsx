import useDeleteComment from "@/features/comment/useDeleteComment"
import useUpdateComment from "@/features/comment/useUpdateComment"
import { ActionIcon, Button, Group, Menu, Modal, TextInput, rem } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react"
import { useFormik } from "formik"
import { memo } from "react"

const PostCardCommentMenuComponent = ({ data, postId }) => {
  const [isOpenEditModal, { toggle: toggleEditModal }] = useDisclosure(false)
  const [isOpenDeleteModal, { toggle: toggleDeleteModal }] = useDisclosure(false)
  const updateMenu = ({ title }) => {
    updateCommentFormik.setValues({
      title
    })
    toggleEditModal()
  }

  const updateCommentFormik = useFormik({
    initialValues: {
      title: ""
    },
    onSubmit: (data) => {
      updateComment(data, {
        onSuccess: () => {
          updateCommentFormik.handleReset()
        }
      })
    }
  })
  const { mutate: updateComment } = useUpdateComment(postId, data.commentId, toggleEditModal)

  const deletePost = (postId) => {
    deleteComment(postId)
  }

  const { mutate: deleteComment } = useDeleteComment(postId, data.commentId)
  return (
    <>
      <Menu position="left-start">
        <Menu.Target>
          <ActionIcon style={{ alignSelf: "flex-start" }} mt={`sm`} color="gray" variant="subtle">
            <IconDots />
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
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }
            color="red"
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Modal opened={isOpenEditModal} onClose={toggleEditModal} centered title="update comment">
        <form onSubmit={updateCommentFormik.handleSubmit}>
          <TextInput label="title" placeholder="title" name="title" value={updateCommentFormik.values.title} onChange={updateCommentFormik.handleChange} />
          <Button fullWidth mt={`sm`} color="gray" type="submit">update</Button>
        </form>
      </Modal>
      <Modal centered onClose={toggleDeleteModal} opened={isOpenDeleteModal} title="are you sure want to delete this comment?">
        <Group justify="end">
          <Button onClick={toggleDeleteModal} color="red">no</Button>
          <Button onClick={() => deletePost(postId)}>yes</Button>
        </Group>
      </Modal>
    </>
  )
}


export default memo(PostCardCommentMenuComponent)
