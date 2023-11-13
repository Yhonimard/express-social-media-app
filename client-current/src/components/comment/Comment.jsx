import Icon from "@/assets/icon";
import useGetCommentReply from "@/features/comment/useGetCommentReply";
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
import { Fragment } from "react";
import { useSelector } from "react-redux";
import CommentMenuComponent from "./commentMenu";
import CommentReply from "./commentReply";

const CommentComponent = ({ author, createdAt, title, commentId, postId }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const { mutate: likeComment } = useLikeComment({ cid: commentId, uid: currentUser.id })
  const { mutate: unlikeComment } = useUnlikeComment({ cid: commentId, uid: currentUser.id })

  const commentReplyQuery = useGetCommentReply({ pid: postId, cid: commentId, size: 2 })

  const userHasLikeQuery = useGetCurrentUserHasLikeComment({ cid: commentId, uid: currentUser.id })
  if (userHasLikeQuery.isLoading || commentReplyQuery.isLoading) return

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
          <Stack w={`100%`} gap={7}>
            <Box>
              <Group w={`100%`} justify="space-between">
                <Text truncate="end">{author.username}</Text>
                <Group gap={5}>
                  <ActionIcon variant="subtle" color="gray" onClick={likeOrUnlikeComment}>
                    <Icon.Favorite sx={{ width: 20 }} color={userHasLikeQuery.data.hasLike ? "error" : "inherit"} />
                  </ActionIcon>
                  {currentUser.id === author.id && (
                    <CommentMenuComponent data={{ title, commentId }} postId={postId} />
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
            {commentReplyQuery.data.pages.map((p, i) => (
              <Fragment key={i}>
                {p.data.length >= 1 && <Divider />}
                {p.data.map((c, i) => (
                  <CommentReply
                    key={c.id}
                    author={c.author}
                    commentId={c.id}
                    createdAt={c.createdAt}
                    postId={postId}
                    title={c.title}
                    isLast={i === p.data.length - 1}
                    parentCommentId={commentId}
                  />
                ))}
              </Fragment>
            ))}
          </Stack>
        </Group>
      </Group>
      <Divider />
    </>
  );
};

export default CommentComponent;
