import useDeletePost from "@/features/post/useDeletePost";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Modal, Paper, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup"
import { useCallback, useState } from "react";
import PostInputComponent from "../postInput";
import useUpdatePost from "@/features/post/useUpdatePost";

const PostCardMenu = ({ postId, handleCloseMenu, anchorEl, title, content, single }) => {
  const open = Boolean(anchorEl);
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const closeMenu = () => {
    handleCloseMenu();
  };

  const { mutate: deletePost } = useDeletePost()

  const deletePostHandler = (postId) => {
    deletePost({ postId })
  };

  const openDeleteModalHandler = useCallback(() => {
    handleCloseMenu()
    setOpenDeleteModal(state => !state)
  }, [handleCloseMenu])

  const openEditModalHandler = useCallback(() => {
    handleCloseMenu()
    setOpenEditModal(state => !state)
  }, [handleCloseMenu])


  const editPostFormik = useFormik({
    initialValues: {
      title,
      content
    },
    validationSchema: yup.object().shape({
      title: yup.string().min(5).max(200).required(),
      content: yup.string().min(5).max(200).required(),
    }),
    onSubmit: (data) => {
      updatePost(data)
    }
  })

  const { mutate: updatePost } = useUpdatePost({ postId, single })

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ width: "300px" }}
      >
        <Box sx={{ width: 200 }}>
          <MenuItem onClick={openDeleteModalHandler}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            delete
          </MenuItem>
          <MenuItem onClick={openEditModalHandler}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            edit
          </MenuItem>
        </Box>
      </Menu>
      <Modal open={openDeleteModal} onClose={openDeleteModalHandler} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" textTransform={`uppercase`}>delete post</Typography>
          <Typography my={2}>are you sure want to delete the this post?</Typography>
          <Stack direction="row" justifyContent="end" width="100%" mt={2}>
            <Button color="inherit" onClick={openDeleteModalHandler}>cancel</Button>
            <Button color="error" onClick={() => deletePostHandler(postId)}>yes</Button>
          </Stack>
        </Paper>
      </Modal>
      <Modal open={openEditModal} onClose={openEditModalHandler} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Container maxWidth="xs">
          <Paper sx={{ px: 3, py: 2 }}>
            <form onSubmit={editPostFormik.handleSubmit}>
              <PostInputComponent
                errorMsg={editPostFormik.errors.title}
                handleChange={editPostFormik.handleChange}
                label="title"
                name="title"
                touched={editPostFormik.touched.title}
                value={editPostFormik.values.title}
              />
              <PostInputComponent
                errorMsg={editPostFormik.errors.content}
                handleChange={editPostFormik.handleChange}
                label="content"
                name="content"
                touched={editPostFormik.touched.content}
                value={editPostFormik.values.content}
                multiline={true}
                rows={3}
              />
              <Button fullWidth color="inherit" type="submit" sx={{ mt: 2 }}>update</Button>
            </form>
          </Paper>
        </Container>
      </Modal>
    </>

  );
};
export default PostCardMenu;
