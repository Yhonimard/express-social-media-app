import post from "@/components/Post";
import useGetAllPost from "@/features/post/useGetAllPost";
import globalReducer from "@/redux/globalReducer";
import { Button, Container, LoadingOverlay, Stack } from "@mantine/core";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const {
    data: postDatas,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isSuccess,
  } = useGetAllPost();

  if (isLoading) return <LoadingOverlay visible />

  return (
    <Container>
      <Stack gap={`sm`}>
        {isSuccess &&
          postDatas.pages.map((pages, i) => (
            <Fragment key={i}>
              {pages.data.map((p) => (
                <Fragment key={p.id}>
                  <post.card {...p} postId={p.id} />
                </Fragment>
              ))}
            </Fragment>
          ))}
        <Button
          my={100}
          onClick={fetchNextPage}
          style={{
            visibility:
              hasNextPage && !isFetchingNextPage ? "visible" : "hidden",
          }}
        >
          Load More
        </Button>
      </Stack>
      <post.create />
    </Container>
  );
};

export default HomePage;
