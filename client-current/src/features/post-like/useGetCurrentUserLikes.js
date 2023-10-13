import api from "@/api";
import { GET_POST_LIKE_NAME } from "@/fixtures/api-query";
import { useQuery } from "@tanstack/react-query";

const useGetCurrentUserLikes = (uid) => {
  return useQuery([GET_POST_LIKE_NAME, uid], async () => {
    const res = await api.request.getCurrentUserLikes()
    return res
  });
};

export default useGetCurrentUserLikes;
