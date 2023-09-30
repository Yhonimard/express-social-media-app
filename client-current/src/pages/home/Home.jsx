import FloatingButton from "@/components/floatingButton/FloatingButton";
import PostCardComponent from "@/components/postCard";
import PostModal from "@/components/postModal/PostModal";
import post from "@/features/post";
import globalReducer from "@/redux/globalReducer";
import { Button, Container, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAdFilled, IconPlus } from "@tabler/icons-react";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const {
    data: postDatas,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage
  } = post.useGetAllPost();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFetchingNextPage || isLoading) dispatch(globalReducer.action.showLoadingOverlay(true));
    if (!isFetchingNextPage || !isLoading) dispatch(globalReducer.action.showLoadingOverlay(false))
  }, [isFetchingNextPage, isLoading, dispatch]);
  return (
    <Container pt={20}>
      <Stack gap={`sm`}>
        {postDatas?.pages.map((pages) => {
          return pages.data.map((p) => {
            return (
              <Fragment key={p.id}>
                <PostCardComponent {...p} postId={p.id} />
              </Fragment>
            );
          });
        })}
        {
          hasNextPage && !isFetchingNextPage && (
            <Button my={100} onClick={fetchNextPage}>
              Load More
            </Button>
          )}
      </Stack>
      <PostModal />
    </Container>
  );
};

export default HomePage;
