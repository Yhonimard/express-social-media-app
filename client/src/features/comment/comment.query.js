import api from '@/api'
import global from '@/config/global'
import { GET_COMMENT_NAME, GET_COMMENT_REPLY_QUERY_NAME, GET_USER_HAS_LIKE_COMMENT_QUERY_NAME } from '@/fixtures/api-query'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

// get comments posts
const GetCommentsPosts = ({ postId, size }) => {
  return useInfiniteQuery([GET_COMMENT_NAME, postId], async ({ pageParam = 1 }) => {
    const res = await api.request.getAllCommentByPostId(postId, pageParam, size)
    return res
  }, {
    getNextPageParam: (_lastPage, pages) => {
      if (!_lastPage?.isLast) return pages.length + 1
      else return undefined
    }
  })
}

// create comment
const CreateCommentPost = ({ postId }) => {
  const queryClient = useQueryClient()
  const currentUser = useSelector(state => state.auth.user)
  return useMutation(async (data) => {
    const res = await api.request.createCommentByPostId(postId, data)
    return res
  }, {
    onMutate: async (newCommentData) => {
      await queryClient.cancelQueries([GET_COMMENT_NAME, postId])
      const prevData = queryClient.getQueryData([GET_COMMENT_NAME, postId])

      queryClient.setQueryData([GET_COMMENT_NAME, postId], (oldData) => {
        const newData = oldData?.pages.map(p => {
          return {
            ...p,
            data: [{ ...newCommentData, id: p.lastId, created_at: moment(Date.now()).format("DD MMMM, YYYY"), author: { username: currentUser.username, photo_profile: currentUser.photo_profile, id: currentUser.id } }, ...p.data]
          }
        })

        return {
          ...oldData,
          pages: newData
        }
      })

      return {
        prevData
      }

    },
    onError: (err, _var, context) => {
      queryClient.setQueryData([GET_COMMENT_NAME, postId], context.prevData)
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_COMMENT_NAME, postId])
    },
  })
}


// update comment
const UpdateComment = ({ postId, commentId }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation(async (data) => {
    const res = await api.request.updateComment(postId, commentId, data)
    return res
  }, {
    onMutate: async (newData) => {
      dispatch(global.reducer.action.showLoadingOverlay())
      const prevData = queryClient.getQueryData([GET_COMMENT_NAME, postId])
      await queryClient.cancelQueries([GET_COMMENT_NAME, postId])

      queryClient.setQueryData([GET_COMMENT_NAME, postId], (oldData) => {
        const newCommentData = oldData?.pages.map(p => {
          const dataWillUpdateIndex = p.data.findIndex(i => i.id === commentId)
          const updatedComment = {
            ...p.data[dataWillUpdateIndex],
            title: newData.title
          }
          const updatedComments = [...p.data]
          updatedComments[dataWillUpdateIndex] = updatedComment
          return {
            ...p,
            data: updatedComments
          }
        })
        return {
          ...oldData,
          pages: newCommentData
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _var, context) => {
      const message = err?.response?.data?.message
      queryClient.setQueryData([GET_COMMENT_NAME, postId], context.prevData)
      dispatch(global.reducer.action.showNotification({ message, status: "error" }))
      dispatch(global.reducer.action.closeLoadingOverlay())
    },
    onSuccess: () => {
      queryClient.invalidateQueries([GET_COMMENT_NAME, postId])
      dispatch(global.reducer.action.showNotification({ message: "success update comment" }))
      dispatch(global.reducer.action.closeLoadingOverlay())
    }
  })
}

// delete comment
const DeleteComment = ({ postId, commentId }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  return useMutation(async () => {
    const res = await api.request.deleteComment(postId, commentId)
    return res
  }, {
    onMutate: async () => {
      dispatch(global.reducer.action.showLoadingOverlay())
      await queryClient.cancelQueries([GET_COMMENT_NAME, postId])
      const prevData = queryClient.getQueryData([GET_COMMENT_NAME, postId])

      queryClient.setQueryData([GET_COMMENT_NAME, postId], (oldData) => {
        const newPagesData = oldData.pages.map(p => {
          return {
            ...p,
            data: p.data.filter(i => i.id !== commentId)
          }
        })
        return {
          ...oldData,
          pages: newPagesData
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _var, context) => {
      const message = err?.response?.data?.message
      queryClient.setQueryData([GET_COMMENT_NAME, postId], context.prevData)
      dispatch(global.reducer.action.showNotification({ message, status: "error" }))
      dispatch(global.reducer.action.closeLoadingOverlay())
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_COMMENT_NAME, postId])
    },
    onSuccess: () => {
      dispatch(global.reducer.action.showNotification({ message: "success delete this comment", status: "success" }))
      dispatch(global.reducer.action.closeLoadingOverlay())
    }
  })
}


// get current user has like
const GetCurrentUserHasLikeComment = ({ uid, cid, pid }) => {
  return useQuery([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid, cid], async () => {
    const res = await api.request.getCurrentUserHasLikeComment({ cid, pid })
    return res
  }, {
  })
}


// like comment
const LikeComment = ({ cid, uid }) => {
  const queryClient = useQueryClient()
  return useMutation(async () => {
    await api.request.likeComment({ cid })
  }, {
    onMutate: async () => {
      await queryClient.cancelQueries([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid, cid])
      const prevData = queryClient.getQueryData([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid, cid])

      queryClient.setQueryData([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid, cid], () => {
        return {
          hasLike: true
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _ctx, ctx) => {
      queryClient.setQueryData([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid, cid], ctx.prevData)
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid, cid])
    }

  })
}



const UnlikeComment = ({ cid, uid }) => {
  const queryClient = useQueryClient()
  return useMutation(async () => {
    await api.request.unlikeComment({ cid })
  }, {
    onMutate: async () => {
      await queryClient.cancelQueries([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid, cid])
      const prevData = queryClient.getQueryData([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid, cid])

      queryClient.setQueryData([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid, cid], () => {
        return {
          hasLike: false
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _ctx, ctx) => {
      queryClient.setQueryData([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid, cid], ctx.prevData)
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid, cid])
    }

  })
}

// get comment reply
const GetCommentReply = ({ pid, cid, size }) => {
  return useInfiniteQuery([GET_COMMENT_REPLY_QUERY_NAME, pid, cid], async ({ pageParam = 1 }) => {
    const query = {
      pageNo: pageParam,
      size
    }
    const res = await api.request.getCommentReply({ cid, pid }, query)
    return res
  }, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return pages.length + 1
      else return undefined
    }
  })
}

// reply comment
const ReplyComment = ({ pcid, pid }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const currentUser = useSelector(s => s.auth.user)
  return useMutation(async (data) => {
    const res = await api.request.replyComment({ pcid, pid }, data)
    return res
  }, {
    onMutate: async (newData) => {
      dispatch(global.reducer.action.showLoadingOverlay())
      await queryClient.cancelQueries([GET_COMMENT_REPLY_QUERY_NAME, pid, pcid])
      const prevData = queryClient.getQueryData([GET_COMMENT_REPLY_QUERY_NAME, pid, pcid])

      queryClient.setQueryData([GET_COMMENT_REPLY_QUERY_NAME, pid, pcid], oldData => {
        const data = {
          created_at: moment(new Date()).format("DD MMMM, YYYY"),
          title: newData.title,
          author: {
            id: currentUser.id,
            username: currentUser.username,
            photo_profile: currentUser.photo_profile
          }
        }
        const newPages = oldData.pages.map(p => ({
          ...p,
          data: [{ id: p.lastId, ...data }, ...p.data]
        }))

        return {
          ...oldData,
          pages: newPages
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _var, ctx) => {
      const msg = err?.response?.data?.message
      queryClient.setQueryData([GET_COMMENT_REPLY_QUERY_NAME, pid, pcid], ctx.prevData)
      dispatch(global.reducer.action.showNotification({ message: msg, status: "error" }))
      dispatch(global.reducer.action.closeLoadingOverlay())
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_COMMENT_REPLY_QUERY_NAME, pid, pcid])
    },
    onSuccess: () => {
      dispatch(global.reducer.action.showNotification({ message: "success reply comment" }))
      dispatch(global.reducer.action.closeLoadingOverlay())
    }
  })
}


// update comment reply
const UpdateCommentReply = ({ parentCommentId, replyCommentId, pid }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation(async (data) => {
    const res = await api.request.updateComment(pid, replyCommentId, data)
    return res
  }, {
    onMutate: async (newData) => {
      dispatch(global.reducer.action.showLoadingOverlay())
      await queryClient.cancelQueries([GET_COMMENT_REPLY_QUERY_NAME, pid, parentCommentId])
      const prevData = queryClient.getQueryData([GET_COMMENT_REPLY_QUERY_NAME, pid, parentCommentId])

      queryClient.setQueryData([GET_COMMENT_REPLY_QUERY_NAME, pid, parentCommentId], oldData => {

        const newPages = oldData.pages.map(p => {
          const replyCommentIndex = p.data.findIndex(cr => cr.id === replyCommentId)

          const updatedComment = {
            ...p.data[replyCommentIndex],
            title: newData.title
          }

          const updatedReplyComments = [...p.data]
          updatedReplyComments[replyCommentIndex] = updatedComment
          return {
            ...p,
            data: updatedReplyComments
          }
        })

        return {
          ...oldData,
          pages: newPages
        }

      })

      return {
        prevData
      }
    },
    onError: (err, _var, ctx) => {
      const msg = err?.response?.data?.message
      queryClient.setQueryData([GET_COMMENT_REPLY_QUERY_NAME, pid, parentCommentId], ctx.prevData)
      dispatch(global.reducer.action.showNotification({ message: msg, status: "error" }))
      dispatch(global.reducer.action.closeLoadingOverlay())
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_COMMENT_REPLY_QUERY_NAME, pid, parentCommentId])
    },
    onSuccess: () => {
      dispatch(global.reducer.action.showNotification({ message: "success update comment" }))
      dispatch(global.reducer.action.closeLoadingOverlay())
    }

  })
}


// delte comment reply
const DeleteCommentReply = ({ parentCommentId, postId, replyCommentId }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  return useMutation(async () => {
    await api.request.deleteComment(postId, replyCommentId)
  }, {
    onMutate: async () => {
      dispatch(global.reducer.action.showLoadingOverlay())
      await queryClient.cancelQueries([GET_COMMENT_REPLY_QUERY_NAME, postId, parentCommentId])
      const prevData = await queryClient.getQueryData([GET_COMMENT_REPLY_QUERY_NAME, postId, parentCommentId])

      queryClient.setQueryData([GET_COMMENT_REPLY_QUERY_NAME, postId, parentCommentId], oldData => {
        const newPages = oldData.pages.map(p => ({
          ...p,
          data: p.data.filter(p => p.id !== replyCommentId)
        }))

        return {
          ...oldData,
          pages: newPages
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _var, ctx) => {
      const msg = err?.response?.data?.message
      queryClient.setQueryData([GET_COMMENT_REPLY_QUERY_NAME, postId, parentCommentId], ctx.prevData)
      dispatch(global.reducer.action.showNotification({ message: msg, status: "error" }))
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_COMMENT_REPLY_QUERY_NAME, postId, parentCommentId])
      dispatch(global.reducer.action.closeLoadingOverlay())
    },
    onSuccess: () => {
      dispatch(global.reducer.action.showNotification({ message: "success delete comment" }))
      dispatch(global.reducer.action.closeLoadingOverlay())
    }
  })
}

const GetUserComment = (uid) => {
  return useInfiniteQuery([GET_COMMENT_NAME, uid], async ({ pageParam = 1 }) => {
    const query = {
      pageNo: pageParam,
      size: 6
    }
    const res = await api.request.getUserComment(query)
    return res
  }, {
    getNextPageParam: (_lastPage, pages) => {
      if (!_lastPage.isLast) return pages.length + 1
      else return undefined
    }
  })
}


export default {
  GetCommentsPosts,
  CreateCommentPost,
  UpdateComment,
  DeleteComment,
  GetCurrentUserHasLikeComment,
  LikeComment,
  UnlikeComment,
  GetCommentReply,
  ReplyComment,
  UpdateCommentReply,
  DeleteCommentReply,
  GetUserComment
}
