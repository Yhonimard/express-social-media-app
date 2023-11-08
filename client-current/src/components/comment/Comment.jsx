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
import CommentMenuComponent from "./commentMenu";
import Icon from "@/assets/icon";
import useGetCurrentUserHasLikeComment from "@/features/comment/useGetCurrentUserHasLikeComment";
import useLikeComment from "@/features/comment/useLikeComment";
import useUnlikeComment from "@/features/comment/useUnlikeComment";

const CommentComponent = ({ author, createdAt, title, commentId, postId }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const { mutate: likeComment } = useLikeComment({ cid: commentId, uid: currentUser.id })
  const { mutate: unlikeComment } = useUnlikeComment({ cid: commentId, uid: currentUser.id })

  const userHasLikeQuery = useGetCurrentUserHasLikeComment({ cid: commentId, uid: currentUser.id })
  if (userHasLikeQuery.isLoading) return

  const likeOrUnlikeComment = () => {
    if (userHasLikeQuery.data.hasLike) unlikeComment(null)
    if (!userHasLikeQuery.data.hasLike) likeComment(null)
  }

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
                src={`${import.meta.env.VITE_API_BASE_URL}/${author.photoProfile
                  }`}
                alt={author.username}
                radius="xl"
                size="md"
              />
            </Tooltip>
          </ActionIcon>
          <Stack w={`100%`}>
            <Box>
              <Group w={`100%`} justify="space-between">
                <Text truncate="end">{author.username}</Text>

                <ActionIcon variant="subtle" color="gray" onClick={likeOrUnlikeComment}>
                  <Icon.Favorite sx={{ width: 20 }} color={userHasLikeQuery.data.hasLike ? "error" : "inherit"} />
                </ActionIcon>
              </Group>
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

export default CommentComponent;
