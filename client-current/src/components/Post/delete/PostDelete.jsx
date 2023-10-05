import { Button, Group, Modal } from "@mantine/core";

const PostDelete = ({ openedModal, close, deletePost, postId }) => {
  return (
    <Modal
      title="are you sure want to delete this post"
      opened={openedModal}
      onClose={close}
      centered
    >
      <Group justify="end">
        <Button onClick={close} color="red">
          no
        </Button>
        <Button onClick={() => deletePost(postId)}>yes</Button>
      </Group>
    </Modal>
  );
};

export default PostDelete;
