import api from "@/api"
import global from "@/config/global"
import { GET_CURRENT_USER_PROFILE_NAME, GET_CURRENT_USER_QUERY_NAME, GET_USER_DETAIL_NAME, GET_USER_NAME, GET_USER_PROFILE_BY_UID, SEARCH_USER_QUERY_NAME } from "@/fixtures/api-query"
import { GET_SEARCH_USER_SIZE } from "@/fixtures/global"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import moment from "moment"
import { useDispatch } from "react-redux"

const SearchUser = (value) => {
  return useInfiniteQuery([SEARCH_USER_QUERY_NAME, value], async ({ pageParam = 1 }) => {
    const query = {
      search: value,
      pageNo: pageParam,
      size: GET_SEARCH_USER_SIZE
    }
    const res = await api.request.searchUser(query)
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

const GetCurrentUser = (userId) => {
  return useQuery([GET_CURRENT_USER_QUERY_NAME, userId], async () => {
    const res = await api.request.getCurrentUser()
    return res
  })
}

const GetCurrentUserProfile = (uid) => {
  return useQuery([GET_CURRENT_USER_PROFILE_NAME, uid], async () => {
    const res = await api.request.getCurrentUserProfile();
    return res;
  });
};



const GetUserDetail = (uid) => {
  return useQuery([GET_USER_DETAIL_NAME, uid], async () => {
    const res = await api.request.getUserDetail(uid)
    return res
  })
}


const GetProfileByUserId = (uid) => {
  return useQuery([GET_USER_PROFILE_BY_UID, uid], async () => {
    const res = await api.request.getUserProfileByUserId(uid)
    return res
  })
}


const UpdateCurrentUserProfile = (uid) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation(
    async (data) => {
      const res = await api.request.updateCurrentUserProfile(data);
      return res;
    },
    {
      onMutate: async (newData) => {
        dispatch(global.reducer.action.showLoadingOverlay());
        await queryClient.cancelQueries([GET_CURRENT_USER_PROFILE_NAME, uid]);
        const prevData = queryClient.getQueryData([GET_CURRENT_USER_PROFILE_NAME, uid]);

        queryClient.setQueryData([GET_CURRENT_USER_PROFILE_NAME, uid], (oldData) => {
          return {
            ...oldData,
            name: newData.name,
            bio: newData.bio,
            birthday: moment(newData.birthday).format("DD MMMM, YYYY"),
            phone: newData.phone,
          };
        });

        return {
          prevData,
        };
      },
      onError: (err, _var, context) => {
        const message = err?.response?.data?.message;
        queryClient.setQueryData(
          [GET_CURRENT_USER_PROFILE_NAME, uid],
          context.prevData
        );
        dispatch(
          global.reducer.action.showNotification({
            message: message || "error when updating profile, pls try again",
            status: "error",
          })
        );
        dispatch(global.reducer.action.closeLoadingOverlay());
      },
      onSettled: () => {
        queryClient.invalidateQueries([GET_CURRENT_USER_PROFILE_NAME, uid]);
      },
      onSuccess: () => {
        dispatch(
          global.reducer.action.showNotification({
            message: "success updating profile",
          })
        );
        dispatch(global.reducer.action.closeLoadingOverlay());
      },
    }
  );
};



export default {
  SearchUser,
  GetCurrentUser,
  GetCurrentUserProfile,
  GetUserDetail,
  GetProfileByUserId,
  UpdateCurrentUserProfile
}

