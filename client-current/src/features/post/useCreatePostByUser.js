import api from "@/api";
import { GET_POST_NAME } from "@/fixtures/api-query";
import globalReducer from "@/redux/globalReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const useCreatePostByUser = (uid) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation(
    async (data) => {
      const res = await api.request.createPostByUser(data);
      return res;
    },
    {
      onMutate: () => {
        dispatch(globalReducer.action.showLoadingOverlay(true));
      },
      onSuccess: (data, _var, context) => {
        queryClient.setQueryData([GET_POST_NAME, uid], (oldData) => {
          const pages = oldData.pages.map((p) => ({
            ...p,
            data: [...p.data, data],
          }));
          dispatch(globalReducer.action.showLoadingOverlay(false));
          dispatch(
            globalReducer.action.showNotification({
              message: "success create post",
              status: "success",
            })
          );
          return {
            ...oldData,
            pages,
          };
        });
      },
      onError: (err, _var, context) => {
        const message = err?.response?.data?.message;
        dispatch(globalReducer.action.showLoadingOverlay(false));
        dispatch(
          globalReducer.action.showNotification({
            message:
              message ||
              "something went wrong, please try again to create post",
            status: "success",
          })
        );
      },
    }
  );
};

export default useCreatePostByUser;
