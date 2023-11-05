import post from "@/components/Post";
import useGetAllPost from "@/features/post/useGetAllPost";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Button, Container, LoadingOverlay, SimpleGrid } from "@mantine/core";
import { Fragment } from "react";

const HomePage = () => {
  const {
    data: postDatas,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllPost();

  const { inViewRef, isShowBtn } = useInfiniteScroll(fetchNextPage)

  if (isLoading) return <LoadingOverlay visible />

  return (
    <Container>

      <SimpleGrid cols={1}>
        {postDatas.pages.map((pages, i) => (
          <Fragment key={i}>
            {pages.data.map((p) => (
              <Fragment key={p.id}>
                <post.card {...p} postId={p.id} />
              </Fragment>
            ))}
          </Fragment>
        ))}
        {isShowBtn && (
          <Button
            my={20}
            fullWidth
            onClick={fetchNextPage}
            ref={inViewRef}
            color="gray"
            disabled={!hasNextPage || isFetchingNextPage}
            style={{ visibility: "hidden" }}
          >
          </Button>
        )}
      </SimpleGrid>
      <post.create />
    </Container >
  );
};

export default HomePage;
