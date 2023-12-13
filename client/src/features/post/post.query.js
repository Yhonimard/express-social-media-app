import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"

import api from "@/api";
import { GET_CURRENT_USER_TOTAL_POST, GET_POST_BY_USER_ID_NAME, GET_POST_HAS_LIKE_CURRENT_USER_NAME, GET_POST_NAME, GET_USER_TOTAL_POST_QUERY_NAME, SEARCH_POST_QUERY_NAME } from "@/fixtures/api-query";
import globalReducer from "@/redux/globalReducer";
import { GET_SEARCH_POST_SIZE } from "@/fixtures/global";

// get posts
const GetPosts = () => {
  return useInfiniteQuery([GET_POST_NAME], async ({ pageParam = 1 }) => {
    const res = await api.request.getAllPost(pageParam)
    return res
  }, {
    getNextPageParam: (_lastPage, pages) => {
      if (!_lastPage?.isLast) return pages.length + 1
      else return undefined
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })
}

// create post
const CreatePost = (toggle) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation(async (data) => {
    const res = await api.request.createPost(data)
    return res
  },

    {
      onMutate: () => {
        toggle()
        dispatch(globalReducer.action.showLoadingOverlay())
      },
      onSuccess: (postData) => {
        queryClient.setQueryData([GET_POST_NAME], (oldData) => {
          const newData = oldData?.pages?.map(p => {
            return { ...p, data: [postData, ...p.data] }
          })
          return {
            ...oldData,
            pages: newData
          }
        })
        dispatch(globalReducer.action.closeLoadingOverlay())
        dispatch(globalReducer.action.showNotification({ message: "successfully creating new post", status: "success" }))
      },
      onError: (_err) => {
        toggle()
        const message = _err?.response?.data?.message
        dispatch(globalReducer.action.closeLoadingOverlay())
        dispatch(globalReducer.action.showNotification({ message, status: "error" }))
      }
    })
}

// update post
const UpdatePost = ({ postId, toggleMenu, toggleEditModal }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const toggle = () => {
    toggleMenu()
    toggleEditModal()
  }
  const currentUser = useSelector((state) => state.auth.user);
  return useMutation(async (data) => {
    const res = await api.request.updatePostByPostId(postId, data);
    return res;
  },
    {
      onMutate: async (updatedData) => {
        toggle()

        dispatch(globalReducer.action.showLoadingOverlay());

        const prevPostData = queryClient.getQueryData([GET_POST_NAME, postId]);
        const prevPostsdata = queryClient.getQueryData([GET_POST_NAME]);

        await queryClient.cancelQueries([GET_POST_NAME, postId]);
        await queryClient.cancelQueries([GET_POST_NAME]);

        queryClient.setQueryData([GET_POST_NAME, postId], (oldData) => {
          return {
            ...oldData,
            title: updatedData.title,
            content: updatedData.content,
          };
        });


        queryClient.setQueryData([GET_POST_NAME], (oldData) => {
          const updatedPages = oldData.pages.map((p) => {
            const dataWillUpdateIndex = p.data.findIndex(
              (i) => i.id === postId
            );
            const updatedPost = {
              ...p.data[dataWillUpdateIndex],
              title: updatedData.title,
              content: updatedData.content,
            };

            const updatedPosts = [...p.data];
            updatedPosts[dataWillUpdateIndex] = updatedPost;
            return {
              ...p,
              data: updatedPosts,
            };
          });

          return {
            ...oldData,
            pages: updatedPages,
          };
        });

        return {
          prevPostsdata,
          prevPostData
        };

      },
      onError: (err, _var, context) => {
        queryClient.setQueryData([GET_POST_NAME], context.prevPostsdata);
        queryClient.setQueryData([GET_POST_NAME, postId], context.prevPostData);
        const message = err?.response.data.message
        toggle()

        dispatch(globalReducer.action.closeLoadingOverlay());
        dispatch(globalReducer.action.showNotification({ message, status: "error" }));
      },
      onSettled: () => {
        queryClient.invalidateQueries([GET_POST_NAME]);
        // queryClient.invalidateQueries([GET_POST_NAME, postId]);
      },
      onSuccess: () => {
        dispatch(globalReducer.action.closeLoadingOverlay());
        dispatch(globalReducer.action.showNotification({
          message: `hi ${currentUser.username}, successfully update post`,
        })
        );
      },
    }
  );
};

// delete post
const DeletePost = ({ postId }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation(async () => {
    const res = await api.request.deletePostByPostId(postId)
    return res
  }, {
    onMutate: async () => {
      dispatch(globalReducer.action.showLoadingOverlay())

      await queryClient.cancelQueries([GET_POST_NAME])
      const prevPosts = queryClient.getQueryData([GET_POST_NAME])

      queryClient.setQueryData([GET_POST_NAME], (oldData) => {
        const newData = oldData?.pages.map(p => ({
          ...p,
          data: p?.data?.filter(i => i.id !== postId)
        }))

        return {
          ...oldData,
          pages: newData
        }
      })
      return {
        prevPosts
      }
    },

    onError: (err, _var, context) => {
      queryClient.setQueryData([GET_POST_NAME], context.prevPosts)
      const message = err?.response?.data?.message

      dispatch(globalReducer.action.showNotification({ message, status: "error" }))
      dispatch(globalReducer.action.closeLoadingOverlay())
    },
    onSettled: () => {
      // queryClient.invalidateQueries([GET_POST_NAME])
    },
    onSuccess: () => {
      dispatch(globalReducer.action.showNotification({ message: "success delete post" }))
      dispatch(globalReducer.action.closeLoadingOverlay())
    }
  })
}

// search post
const SearchPost = (value) => {
  return useInfiniteQuery([SEARCH_POST_QUERY_NAME, value], async ({ pageParam = 1 }) => {
    const query = {
      search: value,
      pageNo: pageParam,
      size: GET_SEARCH_POST_SIZE
    }
    const res = await api.request.searchPost(query)
    return res
  }, {
    getNextPageParam: (data, pages) => {
      if (!data.isLast) return pages.length + 1
      else return undefined
    },
    keepPreviousData: true,
    staleTime: 1000
  })
}


const GetPost = (postId) => {
  return useQuery([GET_POST_NAME, postId], async () => {
    const res = await api.request.getSinglePost(postId)
    return res
  }, {
  })
}


const GetCurrentUserPosts = () => {
  const currentUser = useSelector(state => state.auth.user)
  return useInfiniteQuery([GET_POST_NAME, currentUser.id], async ({ pageParam = 1 }) => {
    const res = await api.request.getPostByUser(pageParam)
    return res
  }, {
    getNextPageParam: (_lastPage, pages) => {
      if (!_lastPage.isLast) return pages.length + 1
      else return undefined
    }
  })
}



const GetPostByUserId = (uid) => {
  return useInfiniteQuery([GET_POST_BY_USER_ID_NAME, uid], async ({ pageParam = 1 }) => {
    const query = {
      pageNo: pageParam,
      size: 4
    }
    const res = await api.request.getPostByUserId(uid, query)
    return res
  }, {
    getNextPageParam: (_lastPage, pages) => {
      if (!_lastPage.isLast) return pages.length + 1
      else return undefined
    }
  })
}


const GetPostLikedUser = (uid) => {
  return useInfiniteQuery([GET_POST_HAS_LIKE_CURRENT_USER_NAME, uid], async ({ pageParam = 1 }) => {
    const query = { pageNo: pageParam, size: 8 }
    const res = await api.request.getPostHasLikeCurrentUser(query)
    return res
  }, {
    getNextPageParam: (_lastPage, pages) => {
      if (!_lastPage.isLast) return pages.length + 1
      else return undefined
    },
  })
}

const GetCurrentuserTotalPosts = (userId) => {
  return useQuery([GET_CURRENT_USER_TOTAL_POST, userId], async () => {
    const res = await api.request.getCurrentuserTotalPosts()
    return res
  })
}

const GetUserTotalPost = (userId) => {
  return useQuery([GET_USER_TOTAL_POST_QUERY_NAME, userId], async () => {
    const res = await api.request.getUserTotalPost(userId)
    return res
  })
}

export default {
  GetPosts,
  CreatePost,
  UpdatePost,
  DeletePost,
  SearchPost,
  GetPost,
  GetCurrentUserPosts,
  GetPostByUserId,
  GetPostLikedUser,
  GetCurrentuserTotalPosts,
  GetUserTotalPost
}
