import api from "@/api"
import { GET_POST_HAS_LIKE_CURRENT_USER_NAME, GET_POST_LIKE_NAME } from "@/fixtures/api-query"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// get current user has like post
const GetCurrentUserHasLike = ({ pid, currentUserId }) => {
  return useQuery([GET_POST_LIKE_NAME, pid, currentUserId], async () => {
    const res = await api.request.getCurrentUserHasLike(pid)
    return res
  })
}

const LikePost = ({ pid, uid }) => {
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

// unlike post
const UnlikePost = ({ pid, uid }) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      const res = await api.request.unlikePostByCurrentUser(pid);
      return res;
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries([GET_POST_LIKE_NAME, pid, uid]);
        await queryClient.cancelQueries([GET_POST_HAS_LIKE_CURRENT_USER_NAME, uid])

        const prevData = queryClient.getQueryData([GET_POST_LIKE_NAME, pid, uid]);

        const prevPostLikedUserData = queryClient.getQueryData([GET_POST_HAS_LIKE_CURRENT_USER_NAME, uid])

        if (prevData) {
          queryClient.setQueryData([GET_POST_LIKE_NAME, pid, uid], () => {
            return {
              hasLike: false,
            };
          });
        }


        if (prevPostLikedUserData) {
          queryClient.setQueryData([GET_POST_HAS_LIKE_CURRENT_USER_NAME, uid], oldData => {
            const newPages = oldData?.pages?.map(p => ({
              ...p,
              data: p?.data?.filter(p => p.id !== pid)
            }))

            return {
              ...oldData,
              pages: newPages
            }
          })
        }


        return {
          prevData,
          prevPostLikedUserData
        };
      },
      onError: (err, _var, ctx) => {
        queryClient.setQueryData([GET_POST_LIKE_NAME, pid, uid], ctx.prevData);
        queryClient.setQueryData([GET_POST_HAS_LIKE_CURRENT_USER_NAME, uid])
      },
      onSettled: () => {
        queryClient.invalidateQueries([GET_POST_LIKE_NAME, pid, uid]);
        queryClient.invalidateQueries([GET_POST_HAS_LIKE_CURRENT_USER_NAME, uid])
      },
    }
  );
};

export default {
  GetCurrentUserHasLike,
  LikePost,
  UnlikePost
}