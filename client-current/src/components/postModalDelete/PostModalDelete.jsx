import { Button, Group, Modal } from "@mantine/core"

const PostModalDeleteComponent = ({ openedModal, close, deletePost }) => {

  return (
    <Modal title="are you sure want to delete this post" opened={openedModal} onClose={close} centered>
      <Group justify="end">
        <Button onClick={close} color="red">no</Button>
        <Button onClick={deletePost}>yes</Button>
      </Group>
    </Modal>
  )
}

export default PostModalDeleteComponent