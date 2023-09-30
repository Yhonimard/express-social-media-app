import useCreateComment from "@/features/comment/useCreateComment";
import { Send } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import createCommentValidation from "@/validation/createCommentValidation";
import { useEffect } from "react";
import { motion } from "framer-motion"

const CommentInput = ({ postId }) => {

  const { createComment } = useSelector((state) => state.comment);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: createCommentValidation,
    onSubmit: (data) => {
      addComment(data)
    },
  });

  const { mutate: addComment, isSuccess } = useCreateComment(postId)
  useEffect(() => {
    if (isSuccess) formik.handleReset()
  }, [isSuccess])



  return (
    <Box
      px={2.2}
      py={1.5}
      display={`flex`}
      gap={2}
      alignItems="center"
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        placeholder="create comment"
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <motion.div whileTap={{ scale: 0.9 }} >
        <IconButton type="submit">
          <Send />
        </IconButton>
      </motion.div>
      <Backdrop open={createComment.isLoading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );
};

export default CommentInput;
