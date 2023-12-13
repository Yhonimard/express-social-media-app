import post from "@/config/post"
import usePreviewImg from "@/hooks/usePreviewImg"
import postValidation from "@/validation/post.validation"
import { Button, TextField } from "@mui/material"
import { useFormik } from "formik"
import { MuiFileInput } from "mui-file-input"
import { memo } from "react"

const PostForm = ({ toggleModal }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: ""
    },
    onSubmit: data => {
      createPost(data)
    },
    validationSchema: postValidation.createPost
  })

  const previewImg = usePreviewImg(formik.values.image)
  const { mutate: createPost } = post.query.CreatePost(toggleModal)

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        name="title"
        fullWidth
        variant="filled"
        size="small"
        margin="dense"
        label="title"
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />

      <TextField
        name="content"
        fullWidth
        variant="filled"
        size="small"
        margin="dense"
        label="content"
        onChange={formik.handleChange}
        error={formik.touched.content && Boolean(formik.errors.content)}
        helperText={formik.touched.content && formik.errors.content}
      />

      {previewImg && (
        <img
          src={previewImg}
          style={{ aspectRatio: "auto", marginTop: 10, objectFit: "cover", display: "block", maxHeight: 450 }}
          width={`100%`}
        />
      )}

      <MuiFileInput
        name="image"
        fullWidth
        variant="filled"
        size="small"
        margin="dense"
        label="image"
        onChange={e => formik.setFieldValue("image", e)}
        error={formik.touched.image && Boolean(formik.errors.image)}
        helperText={formik.touched.image && formik.errors.image}
      />

      <Button fullWidth sx={{ mt: 1 }} variant="contained" type="submit">Upload</Button>
    </form>
  )
}

export default memo(PostForm)
