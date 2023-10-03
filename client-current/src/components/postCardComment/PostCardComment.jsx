import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Group,
  Stack,
  Text,
  Tooltip
} from "@mantine/core";
import PostCardCommentMenuComponent from "../postCardCommentMenu";
import { useSelector } from "react-redux";

const PostCardCommentComponent = ({ author, createdAt, title, commentId }) => {

  const currentUser = useSelector(state => state.auth.user)

  return (
    <>
      <Group>
        <Group styles={{ root: { flexWrap: "nowrap", flexGrow: 1 } }} my={10}>
          <ActionIcon
            radius={`xl`}
            variant="subtle"
            color="gray"
            size={`xl`}
            style={{ alignSelf: "flex-start" }}
          >
            <Tooltip withArrow label={author.username}>
              <Avatar src={`${import.meta.env.VITE_API_BASE_URL}/${author.photoProfile}`} alt={author.username} radius="xl" size="md" />
            </Tooltip>
          </ActionIcon>
          <Stack>
            <Box>
              <Text>{author.username}</Text>
              <Text size="sm">{createdAt}</Text>
            </Box>
            <Text>{title}</Text>
          </Stack>
        </Group>
        {currentUser.id === author.id && (
          <PostCardCommentMenuComponent data={{ title, commentId }} />
        )}
      </Group>
      <Divider my={`sm`} />
    </>
  );
};

export default PostCardCommentComponent;
