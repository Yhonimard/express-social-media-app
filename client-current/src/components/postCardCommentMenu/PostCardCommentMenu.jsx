import { ActionIcon, Menu, rem } from "@mantine/core"
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react"

const PostCardCommentMenuComponent = () => {
  return (
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
        >
          Edit
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
          color="red"
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default PostCardCommentMenuComponent