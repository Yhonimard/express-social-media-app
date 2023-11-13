import Icon from "@/assets/icon";
import useGetCurrentUserHasLikeComment from "@/features/comment/useGetCurrentUserHasLikeComment";
import useLikeComment from "@/features/comment/useLikeComment";
import useUnlikeComment from "@/features/comment/useUnlikeComment";
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
import { useSelector } from "react-redux";
import CommentMenuComponent from "../commentMenu";
import CommentMenuReply from "./CommentReplyMenu";

const CommentReply = ({ author, createdAt, title, commentId, postId, isLast, parentCommentId }) => {
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
    <Group style={{ flexWrap: "nowrap" }}>
      <Group styles={{ root: { flexWrap: "nowrap", flexGrow: 1 } }} >
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
        <Stack w={`100%`} gap={7}>
          <Box>
            <Group w={`100%`} justify="space-between">
              <Text truncate="end">{author.username}</Text>
              <Group gap={5}>
                <ActionIcon variant="subtle" color="gray" onClick={likeOrUnlikeComment}>
                  <Icon.Favorite sx={{ width: 20 }} color={userHasLikeQuery.data.hasLike ? "error" : "inherit"} />
                </ActionIcon>
                {currentUser.id === author.id && (
                  <CommentMenuReply data={{ title, commentId }} parentCommentId={parentCommentId} postId={postId} />
                )}
              </Group>
            </Group>
            <Text size="sm" truncate="end">
              {createdAt}
            </Text>
          </Box>
          <Stack gap={7}>
            <Text lineClamp={3}>{title}</Text>
            <ActionIcon size={`sm`} color="gray" variant="subtle">
              <Icon.Reply sx={{ width: 20 }} color="inherit" />
            </ActionIcon>
          </Stack>
          {!isLast && <Divider />}
        </Stack>
      </Group>
    </Group>
  );
};

export default CommentReply;
