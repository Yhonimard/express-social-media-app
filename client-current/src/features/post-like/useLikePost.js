import api from "@/api";
import { GET_POST_LIKE_NAME } from "@/fixtures/api-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLikePost = (pid, uid) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      const res = await api.request.likePostByCurrentUser(pid);
      return res;
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries([GET_POST_LIKE_NAME, pid, uid]);

        const prevData = queryClient.getQueryData([
          GET_POST_LIKE_NAME,
          pid,
          uid,
        ]);

        queryClient.setQueryData([GET_POST_LIKE_NAME, pid, uid], () => {
          return {
            hasLike: true,
          };
        });

        return {
          prevData,
        };
      },
      onError: (err, _var, ctx) => {
        queryClient.setQueryData([GET_POST_LIKE_NAME, pid, uid], ctx.prevData);
      },
      onSettled: () => {
        queryClient.invalidateQueries([GET_POST_LIKE_NAME, pid, uid]);
      },
    }
  );
};

export default useLikePost;
