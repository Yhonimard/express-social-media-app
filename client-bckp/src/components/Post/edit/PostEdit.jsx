import { Button, Modal, TextInput } from "@mantine/core";

const PostEdit = ({ openedModal, close, formik }) => {
  return (
    <Modal centered opened={openedModal} onClose={close} title="edit post">
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
        <Button fullWidth type="submit" mt={`md`}>
          Update
        </Button>
      </form>
    </Modal>
  );
};

export default PostEdit;
