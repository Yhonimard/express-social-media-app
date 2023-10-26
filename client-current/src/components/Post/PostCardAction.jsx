import useGetCurrentUserHasLike from "@/features/post-like/useGetCurrentUserHasLike";
import useLikePost from "@/features/post-like/useLikePost";
import useUnlikePost from "@/features/post-like/useUnlikePost";
import { ActionIcon, Group, LoadingOverlay } from "@mantine/core";
import { Favorite } from "@mui/icons-material";
import { useSelector } from "react-redux";

const PostCardActionComponent = ({ postId }) => {
  const { id: userId } = useSelector((state) => state.auth.user);
  const { data: userHasLike, isLoading } = useGetCurrentUserHasLike(postId, userId);
  const { mutate: likePost } = useLikePost(postId, userId);
  const { mutate: unlikePost } = useUnlikePost(postId, userId);

  if (isLoading) return <LoadingOverlay visible />

  const likeOrUnlike = () => {
    const hasLike = userHasLike?.hasLike;
    if (hasLike) unlikePost(null);
    if (!hasLike) likePost(null);
  };

  return (
    <Group mt={`sm`}>
      <ActionIcon variant="transparent" color="white" onClick={likeOrUnlike}>
        <Favorite color={userHasLike?.hasLike ? "error" : "inherit"} />
      </ActionIcon>
    </Group>
  );
};

export default PostCardActionComponent;
