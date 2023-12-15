
import api from "@/api"
import global from "@/config/global"
import {
  FRIEND_QUERY_NAME,
  GET_CURRENT_USER_FOLLOWERS_QUERY_NAME,
  GET_CURRENT_USER_FOLLOWING,
  GET_CURRENT_USER_TOTAL_FOLLOWERS_AND_FOLLOWING_QUERY_NAME,
  GET_USER_FOLLOWERS_QUERY_NAME,
  GET_USER_FOLLOWING_QUERY_NAME,
  GET_USER_TOTAL_FOLLOWING_AND_FOLLOWERS_QUERY_NAME
} from "@/fixtures/api-query"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

const FollowUser = ({ currUserId, friendId }) => {
  const query = useQueryClient()
  const d = useDispatch()
  return useMutation(async () => {
    const res = await api.request.followUser(friendId)
    return res
  }, {
    onMutate: async () => {
      await query.cancelQueries([FRIEND_QUERY_NAME, currUserId, friendId])
      const prevData = query.getQueryData([FRIEND_QUERY_NAME, currUserId, friendId])

      query.setQueryData([FRIEND_QUERY_NAME, currUserId, friendId], (oldData) => {
        return true
      })

      return {
        prevData
      }
    },
    onError: (err, _var, ctx) => {
      const message = err?.response?.data?.message

      d(global.reducer.action.showNotification({ message: message || "something went wrong, please follow again", status: "error" }))
      query.setQueryData([FRIEND_QUERY_NAME, currUserId, friendId], ctx.prevData)
    },
    onSettled: () => {
      query.invalidateQueries([FRIEND_QUERY_NAME, currUserId, friendId])
    },
    onSuccess: () => {
      d(global.reducer.action.showNotification({ message: "success following this user" }))
    }
  })
}

const GetUserHasFollow = ({ currUserId, friendId }) => {
  return useQuery([FRIEND_QUERY_NAME, currUserId, friendId], async () => {
    const res = await api.request.getUserHasFollow(friendId)
    return res
  }, {})
}

const UnfollowUser = ({ currUserid, friendId }) => {
  const query = useQueryClient()
  const d = useDispatch()
  return useMutation(async () => {
    await api.request.unfollowUser(friendId)
  }, {
    onMutate: async () => {
      await query.cancelQueries([FRIEND_QUERY_NAME, currUserid, friendId])
      const prevUserReqData = query.getQueryData([FRIEND_QUERY_NAME, currUserid, friendId])

      await query.cancelQueries([GET_CURRENT_USER_FOLLOWING, currUserid])
      const prevUserFollowingData = query.getQueryData([GET_CURRENT_USER_FOLLOWING, currUserid])

      query.setQueryData([FRIEND_QUERY_NAME, currUserid, friendId], () => {
        return false
      })

      // query.setQueryData([GET_CURRENT_USER_FOLLOWING, currUserid], (oldData) => {
      //   const newPagesData = oldData.pages.map(p => ({
      //     ...p,
      //     data: p.data.filter(f => f.id !== friendId)
      //   }))

      //   return {
      //     ...oldData,
      //     pages: newPagesData
      //   }
      // })

      return {
        prevUserReqData,
        prevUserFollowingData
      }
    },
    onError: (err, _var, ctx) => {
      const msg = err?.response?.data?.message
      query.setQueryData([FRIEND_QUERY_NAME, currUserid, friendId], ctx.prevUserReqData)
      d(global.reducer.action.showNotification({ message: msg || "something went wrong, please try again to unfollow user" }))
    },
    onSettled: () => {
      query.invalidateQueries([FRIEND_QUERY_NAME, currUserid, friendId])
    },
    onSuccess: () => {
      d(global.reducer.action.showNotification({ message: "success unfollowing user" }))
    }

  })
}


const GetRequestedFollowers = (uid, { size }) => {
  return useInfiniteQuery([FRIEND_QUERY_NAME, uid], async ({ pageParam = 1 }) => {
    const query = {
      pageNo: pageParam,
      size
    }
    const res = await api.request.getRequestedFollowers(query)
    return res
  }, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return pages.length + 1
      else return undefined
    }
  })
}


const ConfirmFollower = ({ uid, senderId }) => {
  const queryClient = useQueryClient()
  const d = useDispatch()
  return useMutation(async () => {
    const res = await api.request.confirmFollower(senderId)
    return res
  }, {
    onMutate: async (newUser) => {
      await queryClient.cancelQueries([FRIEND_QUERY_NAME, uid])
      const prevReqFriendsData = queryClient.getQueryData([FRIEND_QUERY_NAME, uid])

      await queryClient.cancelQueries([GET_CURRENT_USER_FOLLOWERS_QUERY_NAME, uid])
      const prevFollowersData = queryClient.getQueryData([GET_CURRENT_USER_FOLLOWERS_QUERY_NAME, uid])


      queryClient.setQueryData([FRIEND_QUERY_NAME, uid], (oldData) => {
        const newPagesData = oldData.pages.map(p => ({
          ...p,
          data: p.followers.filter(f => f.id !== senderId)
        }))
        return {
          ...oldData,
          pages: newPagesData
        }
      })

      // queryClient.setQueryData([GET_CURRENT_USER_FOLLOWERS_QUERY_NAME, uid], oldData => {
      //   const newPages = oldData.pages.map(p => ({
      //     ...p,
      //     data: [...p.data, { id: Date.now().toString(), user: newUser }]
      //   }))
      //   return {
      //     ...oldData,
      //     pages: newPages
      //   }
      // })

      return {
        prevReqFriendsData,
        prevFollowersData
      }
    },
    onError: (err, _var, ctx) => {
      const msg = err?.response?.data?.message
      queryClient.setQueryData([FRIEND_QUERY_NAME, uid], ctx.prevReqFriendsData)
      queryClient.setQueryData([GET_CURRENT_USER_FOLLOWERS_QUERY_NAME, uid], ctx.prevFollowersData)
      d(global.reducer.action.showNotification({ message: msg || "something went wrong, try again to confirm this user", status: "error" }))
    },
    onSettled: () => {
      queryClient.invalidateQueries([FRIEND_QUERY_NAME, uid])
      queryClient.invalidateQueries([GET_CURRENT_USER_FOLLOWERS_QUERY_NAME, uid])
    },
    onSuccess: () => {
      d(global.reducer.action.showNotification({ message: "success confirm user" }))
    }
  })
}


const UnconfirmFollower = ({ uid, senderId }) => {
  const qc = useQueryClient()
  const d = useDispatch()
  return useMutation(async () => {
    const res = await api.request.unconfirmFollower(senderId)
    return res
  }, {
    onMutate: async () => {
      await qc.cancelQueries([FRIEND_QUERY_NAME, uid])
      const prevReqFrienddata = await qc.getQueryData([FRIEND_QUERY_NAME, uid])

      qc.setQueryData([FRIEND_QUERY_NAME, uid], (oldData) => {
        return {
          ...oldData,
          pages: oldData.pages.map(p => ({
            ...p,
            data: p.followers.filter(f => f.id !== senderId)
          }))
        }
      })

      return {
        prevReqFrienddata,
      }
    },
    onError: (err, _var, ctx) => {
      const msg = err?.response?.data?.message
      qc.setQueryData([FRIEND_QUERY_NAME, uid], ctx.prevReqFrienddata)
      d(global.reducer.action.showNotification({ message: msg || "something went wrong, please try again", status: "error" }))
    },
    onSettled: () => {
      qc.invalidateQueries([FRIEND_QUERY_NAME, uid])
    },
    onSuccess: () => {
      d(global.reducer.action.showNotification({ message: "succes unfollow user", status: "default" }))

    }
  })
}

const GetCurrentUserTotalFollowersAndFollowing = (uid) => {
  return useQuery([GET_CURRENT_USER_TOTAL_FOLLOWERS_AND_FOLLOWING_QUERY_NAME, uid], async () => {
    const res = await api.request.getCurrentUserTotalFollowersAndFollowing()
    return res
  })
}

const GetUserTotalFollowersAndFollowing = (userId) => {
  return useQuery([GET_USER_TOTAL_FOLLOWING_AND_FOLLOWERS_QUERY_NAME, userId], async () => {
    const res = await api.request.getUserTotalFollowingAndFollowers(userId)
    return res
  })
}


const GetCurrentUserFollowers = ({ uid, search }) => {
  return useInfiniteQuery([GET_CURRENT_USER_FOLLOWERS_QUERY_NAME, uid, search], async ({ pageParam = 1 }) => {
    const res = await api.request.getCurrentUserFollowers({ size: 4, pageNo: pageParam, search })
    return res
  }, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return pages.length + 1
      else return undefined
    },
    keepPreviousData: true
  }
  )
}

const GetCurrentUserFollowing = ({ userId, search }) => {
  return useInfiniteQuery([GET_CURRENT_USER_FOLLOWING, userId, search], async ({ pageParam = 1 }) => {
    const query = {
      pageNo: pageParam,
      size: 4,
      search
    }
    const res = await api.request.getCurrentUserFollowing(query)
    return res
  }, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return pages.length + 1
      else return undefined
    },
    keepPreviousData: true
  })
}

const GetUserFollowers = ({ userId, search }) => {
  return useInfiniteQuery([GET_USER_FOLLOWERS_QUERY_NAME, userId, search], async ({ pageParam = 1 }) => {
    const params = {
      pageNo: pageParam,
      size: 4,
      search: search
    }
    const res = await api.request.getUserFollowers(userId, params)
    return res
  },
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.isLast) return pages.length + 1
        else return null
      },
      keepPreviousData: true

    },

  )
}

const GetUserFollowing = ({ userId, search }) => {
  return useInfiniteQuery([GET_USER_FOLLOWING_QUERY_NAME, userId, search], async ({ pageParam = 1 }) => {
    const params = {
      pageNo: pageParam,
      size: 4,
      search
    }
    const res = await api.request.getUserFollowing(userId, params)
    return res
  })
}


export default {
  FollowUser,
  GetUserHasFollow,
  UnfollowUser,
  GetRequestedFollowers,
  ConfirmFollower,
  UnconfirmFollower,
  GetCurrentUserTotalFollowersAndFollowing,
  GetUserTotalFollowersAndFollowing,
  GetCurrentUserFollowers,
  GetCurrentUserFollowing,
  GetUserFollowers,
  GetUserFollowing
}