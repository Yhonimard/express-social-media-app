import { ActionIcon, Group } from "@mantine/core"
import { Favorite } from "@mui/icons-material"

const PostCardActionComponent = ({ userHasLike, likeOrUnlike }) => {
  return <Group mt={`sm`}>
    <ActionIcon
      variant="transparent"
      color="white"
      onClick={() => likeOrUnlike(null)}
    >
      <Favorite
        color={userHasLike ? "warning" : "inherit"}
      />
    </ActionIcon>
  </Group>
}

export default PostCardActionComponent