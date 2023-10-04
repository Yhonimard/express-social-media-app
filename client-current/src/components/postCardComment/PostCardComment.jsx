import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Group,
  Menu,
  Stack,
  Text,
  Tooltip,
  rem
} from "@mantine/core";
import PostCardCommentMenuComponent from "../postCardCommentMenu";
import { useSelector } from "react-redux";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";

const PostCardCommentComponent = ({ author, createdAt, title, commentId, postId }) => {

  const currentUser = useSelector(state => state.auth.user)

  return (
    <>
      <Group style={{ flexWrap: "nowrap" }}>
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
              <Text truncate="end">{author.username}</Text>
              <Text size="sm" truncate="end">{createdAt}</Text>
            </Box>
            <Text lineClamp={3}>{title}</Text>
          </Stack>
        </Group>
        {currentUser.id === author.id && (
          <Menu>
            <Menu.Target>
              <ActionIcon>
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
        )}
      </Group >
      <Divider my={`sm`} />
    </>
  );
};

export default PostCardCommentComponent;
