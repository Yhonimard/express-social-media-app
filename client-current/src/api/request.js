import api from ".";

const login = async (data) => {
  const res = await api.instance.request.post("/auth/login", data);
  return res.data;
};
const register = async (data) => {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.confirmPassword);
  formData.append("photoProfile", data.photoProfile);

  const res = await api.instance.request.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const createPost = async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("image", data.image);

  const res = await api.instance.request.post("/post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const getAllPost = async (pageNo) => {
  const res = await api.instance.request.get("/post", {
    params: {
      size: 4,
      pageNo,
    },
  });
  return res.data;
};

const deletePostByPostId = async (postId) => {
  const res = await api.instance.request.delete(`/post/${postId}`);
  return res.data;
};

const updatePostByPostId = async (postId, data) => {
  const res = await api.instance.request.patch(`/post/${postId}`, data);
  return res.data;
};

const getSinglePost = async (postId) => {
  const res = await api.instance.request.get(`/post/${postId}`);
  return res.data;
};

const getAllCommentByPostId = async (postId, pageNo, size) => {
  const res = await api.instance.request.get(`/post/${postId}/comment`, {
    params: {
      pageNo,
      size,
    },
  });
  return res.data;
};

const createCommentByPostId = async (postId, data) => {
  const res = await api.instance.request.post(`/post/${postId}/comment`, data);
  return res.data;
};


const updateComment = async (postId, commentId, data) => {
  const res = await api.instance.request.patch(
    `/post/${postId}/comment/${commentId}`,
    data
  );
  return res.data;
};

const deleteComment = async (postId, commentId) => {
  const res = await api.instance.request.delete(
    `/post/${postId}/comment/${commentId}`
  );
  return res.data;
};

const getPostByUser = async (pageNo) => {
  const res = await api.instance.request.get(`/user/post`, {
    params: {
      pageNo,
      size: 4,
    },
  });
  return res.data;
};

const updatePostByUser = async (pid, data) => {
  const res = await api.instance.request.patch(`/user/post/${pid}`, data);
  return res.data;
};

const deletePostByUser = async (pid) => {
  const res = await api.instance.request.delete(`/user/post/${pid}`);
  return res.data;
};

const createPostByUser = async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("image", data.image);

  const res = await api.instance.request.post(`/user/post`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const getCurrentUser = async () => {
  const res = await api.instance.request.get(`/user/current`);
  return res.data;
};

const getCurrentUserProfile = async () => {
  const res = await api.instance.request.get(`/user/profile`);
  return res.data;
};

const updateCurrentUserProfile = async (data) => {
  const res = await api.instance.request.patch(`/user/profile`, data);
  return res.data;
};

const getCurrentUserHasLike = async (pid) => {
  const res = await api.instance.request.get(`/post/${pid}/like/user`);
  return res.data;
};

const likePostByCurrentUser = async (pid) => {
  const res = await api.instance.request.post(`/post/${pid}/like`);
  return res.data;
};

const unlikePostByCurrentUser = async (pid) => {
  const res = await api.instance.request.delete(`/post/${pid}/like`);
  return res.data;
};

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
  updateComment,
  deleteComment,
  getPostByUser,
  updatePostByUser,
  deletePostByUser,
  createPostByUser,
  getCurrentUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  getCurrentUserHasLike,
  likePostByCurrentUser,
  unlikePostByCurrentUser
};
