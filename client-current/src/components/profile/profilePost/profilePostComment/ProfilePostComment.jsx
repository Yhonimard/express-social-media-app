import CommentMenuComponent from "@/components/comment/commentMenu";
import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Group,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const ProfilePostCommentComponent = ({
  author,
  createdAt,
  title,
  commentId,
  postId,
}) => {
  const currentUser = useSelector((state) => state.auth.user);



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
              <Avatar
                src={`${import.meta.env.VITE_API_BASE_URL}/${
                  author.photoProfile
                }`}
                alt={author.username}
                radius="xl"
                size="md"
              />
            </Tooltip>
          </ActionIcon>
          <Stack>
            <Box>
              <Text truncate="end">{author.username}</Text>
              <Text size="sm" truncate="end">
                {createdAt}
              </Text>
            </Box>
            <Text lineClamp={3}>{title}</Text>
          </Stack>
        </Group>
        {currentUser.id === author.id && (
          <CommentMenuComponent data={{ title, commentId }} postId={postId} />
        )}
      </Group>
      <Divider my={`sm`} />
    </>
  );
};

export default ProfilePostCommentComponent;
