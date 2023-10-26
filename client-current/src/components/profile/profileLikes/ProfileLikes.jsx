import { Button, LoadingOverlay, SimpleGrid, Text } from "@mantine/core";
import ProfileLikesCard from "./ProfileLikesCard";
import useGetPostHasLikeCurrentUser from "@/features/post/useGetPostHasLikeCurrentUser";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const ProfileLikes = () => {
  const currentUser = useSelector(state => state.auth.user)
  const { data: postHasLikeCurrentUserData, isLoading, fetchNextPage, hasNextPage } = useGetPostHasLikeCurrentUser(currentUser.id)
  if (isLoading) return <LoadingOverlay visible />
  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {postHasLikeCurrentUserData.pages.map((p, i) => (
          <Fragment key={i}>
            {p.data.length < 1 && <Text>you have not like post yet</Text>}
            {p.data.map(p => (
              <ProfileLikesCard
                key={p.id}
                author={p.author}
                content={p.content}
                createdAt={p.createdAt}
                image={p.image}
                postId={p.id}
                title={p.title}
              />
            ))}
          </Fragment>
        ))}
      </SimpleGrid>
      {hasNextPage &&
        <Button fullWidth color="gray" onClick={fetchNextPage} my={20}>see more you are liked post</Button>
      }
    </>
  );
};

export default ProfileLikes;
