  import api from "@/api"
import { USE_GET_ALL_POST_NAME } from "@/fixtures/request-api"
import global from "@/redux/global"
import post from "@/redux/post"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

const useCreatePost = (formik) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  return useMutation(async (data) => {
    const formData = new FormData()
    
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", data.image);
    
    const res = await api.request.post("/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    return res.data
  }, {
    onMutate: () => {
      dispatch(global.action.showBackdrop(true))
    },
    onSuccess: (postData) => {
      if (postData.isEmpty) {
        dispatch(global.action.showNotification({ message: "upssss..., post data is empty", status: "info" }))
      }
      queryClient.setQueryData([USE_GET_ALL_POST_NAME], (oldData) => {
        const newData = oldData?.pages?.map(p => {
          if (p.isEmpty) { return { ...p, data: [postData.data] } }
          return { ...p, data: [...p.data, postData.data] }
        })
        return {
          ...oldData,
          pages: newData
        }
      })
      formik.handleReset()
      dispatch(global.action.showNotification({ message: "success create new post", status: "success" }))
      dispatch(global.action.showBackdrop(false))
      dispatch(post.action.showModal(false))
    },
    onError: ({ response: { data } }) => {
      dispatch(global.action.showNotification({ message: data?.message || "something went wrong, please try to create again later", status: "error" }))
      dispatch(global.action.showBackdrop(false))
    }
  })
}



export default useCreatePost