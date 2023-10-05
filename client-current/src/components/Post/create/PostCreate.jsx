import useCreatePost from "@/features/post/useCreatePost";
import usePreviewImg from "@/hooks/usePreviewImg";
import postValidation from "@/utils/validation/post.validation";
import { Button, FileInput, Image, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useFormik } from "formik";
import FloatingButton from "../../floatingButton/FloatingButton";

const PostCreate = () => {
  const [isOpenModal, { open, close, toggle }] = useDisclosure(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: "",
    },
    validationSchema: postValidation.createPostValidation,
    onSubmit: (data) => {
      addPost(data, {
        onSuccess: () => {
          close();
          formik.handleReset();
        },
      });
    },
  });

  const previewImg = usePreviewImg(formik.values.image);
  const { mutate: addPost } = useCreatePost(toggle);

  return (
    <>
      <FloatingButton onClick={open} bottom={50} right={50}>
        <IconPlus />
      </FloatingButton>
      <Modal
        opened={isOpenModal}
        onClose={close}
        centered
        title="create new post"
      >
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            label="title"
            placeholder="title"
            name="title"
            onChange={formik.handleChange}
            error={formik.touched.title && formik.errors.title}
            value={formik.values.title}
          />
          <TextInput
            label="content"
            placeholder="content"
            name="content"
            onChange={formik.handleChange}
            error={formik.touched.content && formik.errors.content}
            value={formik.values.content}
          />
          {formik.values.image && (
            <Image src={previewImg} height={500} mt={`md`} />
          )}
          <FileInput
            placeholder="upload image"
            mt={`md`}
            onChange={(e) => formik.setFieldValue("image", e)}
          />
          <Button mt={`md`} fullWidth type="submit">
            Upload
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default PostCreate;
