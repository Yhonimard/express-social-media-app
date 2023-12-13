import Icon from "@/assets/Icon"
import post from "@/config/post"
import useDisclosure from "@/hooks/useDisclosure"
import postValidation from "@/validation/post.validation"
import { Button, Divider, ListItemIcon, Menu, MenuItem, Modal, Paper, Stack, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { memo } from "react"
import { useNavigate } from "react-router-dom"


const PostDetailCardMenu = ({ open, toggle, anchorEl, postId, title, content }) => {
  const [isOpenEditModal, { toggle: toggleEditModal }] = useDisclosure(false)
  const [isOpenDeleteModal, { toggle: toggleDeleteModal }] = useDisclosure(false)

  const navigate = useNavigate()

  const editFormik = useFormik({
    initialValues: {
      title: title,
      content: content
    },
    onSubmit: data => {
      updatePost(data)
    },
    validationSchema: postValidation.updatePost
  })

  const deletePostHandler = () => {
    deletePost(null, { onSuccess: () => navigate("/") })
  }

  const handleEditModal = () => {
    toggleEditModal()
  }

  const { mutate: updatePost } = post.query.UpdatePost({ postId, toggleMenu: toggle, toggleEditModal })
  const { mutate: deletePost } = post.query.DeletePost({ postId })


  return (
    <>
      <Menu
        open={open}
        onClose={toggle}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        MenuListProps={{
          sx: {
            width: 200
          }
        }}
      >
        <MenuItem onClick={handleEditModal}>
          <ListItemIcon>
            <Icon.Edit />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={toggleDeleteModal}>
          <ListItemIcon>
            <Icon.Delete />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      <Modal open={isOpenEditModal} onClose={toggleEditModal} sx={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
        <Paper sx={{ maxWidth: "30rem", width: "100%", p: 3 }}>
          <Typography textAlign={`center`} variant="h6">Edit post</Typography>
          <Divider sx={{ my: 1 }} />
          <form onSubmit={editFormik.handleSubmit}>
            <TextField
              name="title"
              fullWidth
              variant="filled"
              size="small"
              margin="dense"
              label="title"
              value={editFormik.values.title}
              onChange={editFormik.handleChange}
              error={editFormik.touched.title && Boolean(editFormik.errors.title)}
              helperText={editFormik.touched.title && editFormik.errors.title}
            />
            <TextField
              name="content"
              fullWidth
              variant="filled"
              size="small"
              value={editFormik.values.content}
              margin="dense"
              label="content"
              onChange={editFormik.handleChange}
              error={editFormik.touched.content && Boolean(editFormik.errors.content)}
              helperText={editFormik.touched.content && editFormik.errors.content}
            />
            <Button fullWidth sx={{ mt: 1 }} variant="contained" type="submit">Edit</Button>
          </form>
        </Paper>
      </Modal>

      <Modal open={isOpenDeleteModal} onClose={toggleDeleteModal} sx={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
        <Paper sx={{ maxWidth: "30rem", width: "100%", p: 3 }}>
          <Typography variant="h6" component="h2">
            Are you sure want to delete this post?
          </Typography>


          <Stack direction={`row`} width={`100%`} justifyContent={`end`} mt={2}>
            <Button color="error" onClick={toggleDeleteModal}>No</Button>
            <Button onClick={deletePostHandler}>Yes</Button>
          </Stack>
        </Paper>
      </Modal>
    </>
  )
}

export default memo(PostDetailCardMenu)