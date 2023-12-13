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
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import CommentMenuComponent from "./commentMenu";
import CommentReply from "./commentReply";
import CommentReplyForm from "./commentReply/CommentReplyForm";
import scrollIntoViewHelper from "@/helpers/scroll-into-view-helper";
import { COMMENT_REPLY_ID } from "@/fixtures/global";

const CommentComponent = ({ author, createdAt, title, commentId, postId }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const { mutate: likeComment } = useLikeComment({ cid: commentId, uid: currentUser.id })
  const { mutate: unlikeComment } = useUnlikeComment({ cid: commentId, uid: currentUser.id })
  const [isOpenReplyComment, setIsOpenReplyComment] = useState(false)

  const commentReplyQuery = useGetCommentReply({ pid: postId, cid: commentId, size: 2 })

  const userHasLikeQuery = useGetCurrentUserHasLikeComment({ cid: commentId, uid: currentUser.id })
  if (userHasLikeQuery.isLoading || commentReplyQuery.isLoading) return

  const likeOrUnlikeComment = () => {
    if (userHasLikeQuery.data.hasLike) unlikeComment(null)
    if (!userHasLikeQuery.data.hasLike) likeComment(null)
  }

  const openReplyCommentInput = () => {
    setIsOpenReplyComment((state) => !state)
    scrollIntoViewHelper(`${COMMENT_REPLY_ID}_${commentId}`)
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
              {isOpenReplyComment && (
                <Tooltip label={`close`} withArrow>
                  <ActionIcon size={`sm`} color="gray" variant="subtle" onClick={() => setIsOpenReplyComment(state => !state)}>
                    <Icon.Close sx={{ width: 20 }} color="inherit" />
                  </ActionIcon>
                </Tooltip>
              )}
              {!isOpenReplyComment && (
                <Tooltip label={`reply comment`} withArrow>
                  <ActionIcon size={`sm`} color="gray" variant="subtle" onClick={openReplyCommentInput}>
                    <Icon.Reply sx={{ width: 20 }} color="inherit" />
                  </ActionIcon>
                </Tooltip>
              )}
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
            {commentReplyQuery.hasNextPage && (
              <Text onClick={commentReplyQuery.fetchNextPage}>show more...</Text>
            )}
            {isOpenReplyComment && (
              <CommentReplyForm parentCommentId={commentId} setIsOpenReplyComment={setIsOpenReplyComment} postId={postId} />
            )}
          </Stack>
        </Group>
      </Group>
      <Divider />
    </>
  );
};

export default CommentComponent;
