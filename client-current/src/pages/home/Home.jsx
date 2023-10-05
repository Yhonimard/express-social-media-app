import post from "@/components/Post";
import useGetAllPost from "@/features/post/useGetAllPost";
import globalReducer from "@/redux/globalReducer";
import { Button, Container, Stack } from "@mantine/core";
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
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFetchingNextPage || isLoading)
      dispatch(globalReducer.action.showLoadingOverlay(true));
    if (!isFetchingNextPage || !isLoading)
      dispatch(globalReducer.action.showLoadingOverlay(false));
  }, [isFetchingNextPage, isLoading, dispatch]);

  return (
    <Container>
      <Stack gap={`sm`}>
        {isSuccess &&
          postDatas.pages.map((pages) => {
            return (
              isSuccess &&
              pages.data.map((p) => {
                return (
                  <Fragment key={p.id}>
                    <post.card {...p} postId={p.id} />
                  </Fragment>
                );
              })
            );
          })}
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
