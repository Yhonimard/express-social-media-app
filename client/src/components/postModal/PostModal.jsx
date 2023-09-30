import useCreatePost from "@/features/post/useCreatePost";
import {
  Box,
  Button,
  Container,
  Modal,
  Paper,
  Stack
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import post from "../../redux/post";
import createPostValidation from "../../validation/createPostValidation";
import ImagePreview from "../ImagePreview";
import InputFile from "../inputFile/InputFile";
import PostInputComponent from "../postInput";

const PostModal = () => {
  const dispatch = useDispatch();
  const { modal } = useSelector(
    (state) => state.post
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: "",
    },
    validationSchema: createPostValidation,
    onSubmit: (data) => {
      addPost(data)
    },
  });

  const { mutate: addPost } = useCreatePost(formik)

  return (
    <>
      <Modal
        open={modal.show}
        onClose={() => dispatch(post.action.showModal(false))}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Container maxWidth="xs">
          <Paper sx={{ px: 3, py: 2 }}>
            {/* <Typography textAlign="center" variant="h5" fontWeight="600" color="text.primary">create post</Typography>
            <Divider sx={{ my: 1 }} /> */}
            <form onSubmit={formik.handleSubmit}>
              <PostInputComponent
                errorMsg={formik.errors.title}
                handleChange={formik.handleChange}
                label="title"
                name="title"
                touched={formik.touched.title}
                value={formik.values.title}
              />
              <PostInputComponent
                errorMsg={formik.errors.content}
                handleChange={formik.handleChange}
                label="content"
                name="content"
                touched={formik.touched.content}
                value={formik.values.content}
                multiline={true}
                rows={3}
              />
              <Stack
                py={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap={2}
              >
                {formik.values.image && (
                  <Box maxWidth={350}>
                    <ImagePreview
                      file={formik.values.image}
                      name="post image"
                      width={"100%"}
                    />
                  </Box>
                )}
                <InputFile name="image" setFieldValue={formik.setFieldValue}>
                  <Button color="inherit" variant="contained">
                    upload image
                  </Button>
                </InputFile>
              </Stack>
              <Button
                fullWidth
                color="inherit"
                type="submit"
              >
                Upload
              </Button>
            </form>
          </Paper>
        </Container>
      </Modal >

    </>
  );
};

export default PostModal;
