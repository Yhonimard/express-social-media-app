import api from "@/api"
import { GET_COMMENT_NAME } from "@/fixtures/api-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"

const useCreateCommentListByPostId = (postId) => {
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
				const newData = oldData?.pages.map(p => ({
					...p,
					data: [...p.data, { ...newCommentData, id: Date.now(), author: { username: currentUser.username, photoProfile: currentUser.photoProfile, id: currentUser.id } }]
				}))
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
		}
	})
}

export default useCreateCommentListByPostId