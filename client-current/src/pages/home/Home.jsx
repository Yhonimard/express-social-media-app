import post from "@/components/Post";
import useGetAllPost from "@/features/post/useGetAllPost";
import { Button, Container, LoadingOverlay, SimpleGrid } from "@mantine/core";
import { Fragment } from "react";

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
      <SimpleGrid cols={1}>
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
      </SimpleGrid>
      {hasNextPage && (

        <Button
          my={20}
          fullWidth
          onClick={fetchNextPage}
          color="gray"
        // style={{
        //   visibility:
        //     hasNextPage && !isFetchingNextPage ? "visible" : "hidden",
        // }}
        >
          Load More
        </Button>
      )}
      <post.create />
    </Container>
  );
};

export default HomePage;
