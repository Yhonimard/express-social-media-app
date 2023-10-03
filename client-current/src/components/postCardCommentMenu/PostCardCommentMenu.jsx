import commentReducer from "@/redux/commentReducer"
import { ActionIcon, Menu, rem } from "@mantine/core"
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react"
import { memo } from "react"
import { useDispatch } from "react-redux"

const PostCardCommentMenuComponent = ({ data }) => {
  const dispatch = useDispatch()
  const updateMenu = ({ commentId, title }) => {
    dispatch(commentReducer.action.setUpdateComment({ id: commentId, title, isUpdate: true }))
  }

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
          onClick={() => updateMenu(data)}
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


export default memo(PostCardCommentMenuComponent)