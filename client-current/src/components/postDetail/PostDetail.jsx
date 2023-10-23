import useGetSinglePost from "@/features/post/useGetSinglePost";
import { Container, LoadingOverlay } from "@mantine/core";
import { useParams } from "react-router-dom";
import PostDetailCardComponent from "./postDetailCard";

const PostDetailComponent = () => {
  const params = useParams();
  const {
    data: postData,
    isLoading,
  } = useGetSinglePost(params.postId);

  if (isLoading) return <LoadingOverlay visible />;
  
  return (
    <Container>
      <PostDetailCardComponent postData={postData} postId={params.postId} />
    </Container>
  );
};

export default PostDetailComponent;
