import useGetAllPostByUserId from "@/features/post/useGetAllPostByUserId";
import global from "@/redux/global";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PostListComponent from "../postList";

const ProfileDetailPostList = () => {
  const {
    isFetchingNextPage,
    isLoading,
    data: postData,
    fetchNextPage,
    hasNextPage,
  } = useGetAllPostByUserId();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetchingNextPage || isLoading)
      dispatch(global.action.showBackdrop(true));
    if (!isFetchingNextPage || isLoading)
      dispatch(global.action.showBackdrop(false));
  }, [isFetchingNextPage, dispatch, isLoading]);


  return (
    <PostListComponent
      postData={postData}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
};

export default ProfileDetailPostList;
