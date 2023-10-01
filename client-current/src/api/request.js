import api from ".";

const login = async (data) => {
  const res = await api.instance.request.post("/auth/login", data)
  return res.data
}
const register = async (data) => {
  const formData = new FormData()
  formData.append("username", data.username)
  formData.append("password", data.confirmPassword)
  formData.append("photoProfile", data.photoProfile)

  const res = await api.instance.request.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
  })
  return res.data
}

const createPost = async (data) => {
  const formData = new FormData()
  formData.append("title", data.title)
  formData.append("content", data.content)
  formData.append("image", data.image)

  const res = await api.instance.request.post("/post", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return res.data
}

const getAllPost = async (pageNo) => {
  const res = await api.instance.request.get("/post", {
    params: {
      size: 4,
      pageNo
    }
  })
  return res.data
}

const deletePostByPostId = async (postId) => {
  const res = await api.instance.request.delete(`/post/${postId}`)
  return res.data
}

const updatePostByPostId = async (postId, data) => {
  const res = await api.instance.request.patch(`/post/${postId}`, data)
  return res.data
}


const getSinglePost = async (postId) => {
  const res = await api.instance.request.get(`/post/${postId}`)
  return res.data
}

const getAllCommentByPostId = async (postId, pageNo, size) => {
  const res = await api.instance.request.get(`/post/${postId}/comment`, {
    params: {
      pageNo,
      size
    }
  })
  return res.data
}

const createCommentByPostId = async (postId, data) => {
  const res = await api.instance.request.post(`/post/${postId}/comment`, data)
  return res.data
}

const getPostLikeList = async (postId) => {
  const res = await api.instance.request.get(`/post/${postId}/like`)
  return res.data
}

const likeOrUnlikePost = async (postId) => {
  const res = await api.instance.request.post(`/post/${postId}/like`)
  return res.data
}

export default {
  login,
  register,
  createPost,
  getAllPost,
  deletePostByPostId,
  getSinglePost,
  updatePostByPostId,
  getAllCommentByPostId,
  createCommentByPostId,
  getPostLikeList,
  likeOrUnlikePost
}