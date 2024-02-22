import api from ".";

const login = async (data) => {
  const res = await api.instance.request.post("/auth/login", data);
  return res.data;
};
const register = async (data) => {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.confirmPassword);
  formData.append("image-photo_profile", data.photo_profile);

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
  formData.append("image-post", data.image);

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
  const res = await api.instance.request.get(`/post/${postId}/detail`);
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
  formData.append("image/post", data.image);

  const res = await api.instance.request.post(`/user/post`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const getCurrentUser = async () => {
  const res = await api.instance.request.get(`/user`);
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
  const res = await api.instance.request.get(`/post/${pid}/haslike`);
  return res.data;
};

const likePostByCurrentUser = async (pid) => {
  const res = await api.instance.request.post(`/post/${pid}/like`);
  return res.data;
};

const unlikePostByCurrentUser = async (pid) => {
  const res = await api.instance.request.delete(`/post/${pid}/unlike`);
  return res.data;
};


const getPostHasLikeCurrentUser = async (query) => {
  const { pageNo, size } = query
  const res = await api.instance.request.get(`/user/post/like`, {
    params: {
      pageNo,
      size
    }
  })
  return res.data
}

const getUserComment = async (query) => {
  const { pageNo, size } = query
  const res = await api.instance.request.get(`/user/post/comment`, {
    params: {
      pageNo,
      size
    }
  })
  return res.data
}


const getPostByUserId = async (uid, query) => {
  const { pageNo, size } = query
  const res = await api.instance.request.get(`/user/${uid}/post`, {
    params: {
      pageNo,
      size
    }
  })
  return res.data
}

const getUserDetail = async (uid) => {
  const res = await api.instance.request.get(`/user/${uid}/detail`)
  return res.data
}


const getUserProfileByUserId = async (uid) => {
  const res = await api.instance.request.get(`/user/${uid}/profile`)
  return res.data
}


const getUserHasFollow = async (receiverId) => {
  const res = await api.instance.request.get(`/user/${receiverId}/friend`)
  return res.data
}

const followUser = async (receiverId) => {
  const res = await api.instance.request.post(`/friend/${receiverId}`)
  return res.data
}

const unfollowUser = async (receiverId) => {
  const res = await api.instance.request.delete(`/friend/${receiverId}`)
  return res.data
}
const getRequestedFollowers = async (query) => {
  const { pageNo, size } = query
  const res = await api.instance.request.get(`/user/friend/request`, {
    params: {
      pageNo,
      size
    }
  })
  return res.data
}

const getCurrentUserFollowing = async (query) => {
  const { pageNo, size, search } = query
  const res = await api.instance.request.get(`/user/friend/following`, {
    params: {
      pageNo,
      size,
      search
    }
  })

  return res.data
}

const confirmFollower = async (senderId) => {
  const res = await api.instance.request.patch(`/friend/${senderId}/request`)
  return res.data
}

const unconfirmFollower = async (senderId) => {
  const res = await api.instance.request.delete(`/friend/${senderId}/request`)
  return res.data
}

const getCurrentUserFollowers = async ({ pageNo, size, search }) => {
  const res = await api.instance.request.get(`/user/friend/followers`, {
    params: {
      pageNo,
      size,
      search
    }
  })
  return res.data
}

const deleteFollowers = async (data) => {
  const res = await api.instance.request.delete(`/user/friend/followers`, {
    data
  })
  return res.data
}

const searchPost = async ({ search, pageNo, size }) => {
  const res = await api.instance.request.get(`/post/search`, {
    params: {
      search,
      pageNo,
      size
    }
  })
  return res.data
}

const searchUser = async ({ search, pageNo, size }) => {
  const res = await api.instance.request.get(`/user/search`, {
    params: {
      search,
      pageNo,
      size
    }
  })
  return res.data
}

const getCurrentUserHasLikeComment = async ({ cid }) => {
  const res = await api.instance.request.get(`/post/comment/${cid}/haslike`)
  return res.data
}

const likeComment = async ({ cid }) => {
  const res = await api.instance.request.post(`/post/comment/${cid}/like`)
  return res.data
}

const unlikeComment = async ({ cid }) => {
  const res = await api.instance.request.delete(`/post/comment/${cid}/unlike`, {
  })
  return res.data
}

const getCommentReply = async ({ cid }, { pageNo, size }) => {
  const res = await api.instance.request.get(`/post/comment/${cid}/reply`, {
    params: {
      pageNo,
      size
    }
  })
  return res.data
}


const replyComment = async ({ pcid }, data) => {
  const res = await api.instance.request.post(`/post/comment/${pcid}/reply`, data)
  return res.data
}

const getUserChats = async (query) => {
  const res = await api.instance.request.get(`/user/chat`, {
    params: query
  })
  return res.data
}

const getCurrentuserTotalPosts = async () => {
  const res = await api.instance.request.get(`/user/post/total`)
  return res.data
}

const getCurrentUserTotalFollowersAndFollowing = async () => {
  const res = await api.instance.request.get(`/user/friend/total`)
  return res.data
}

const getUserTotalPost = async (userId) => {
  const res = await api.instance.request.get(`/user/${userId}/post/total`)
  return res.data
}

const getUserTotalFollowingAndFollowers = async (userId) => {
  const res = await api.instance.request.get(`/user/${userId}/friend/total`)
  return res.data
}

const getUserFollowers = async (userId, params) => {
  const res = await api.instance.request.get(`/user/${userId}/friend/followers`, {
    params
  })
  return res.data
}

const getUserFollowing = async (userId, params) => {
  const res = await api.instance.request.get(`/user/${userId}/friend/following`, {
    params
  })
  return res.data
}

const getMessages = async (userId, pageNo) => {
  const query = {
    pageNo,
    size: 15
  }
  const res = await api.instance.request.get(`/chat/message/${userId}`, {
    params: query
  })
  return res.data
}

const createChat = async (userId) => {
  const res = await api.instance.request.post(`user/${userId}/chat`)
  return res.data
}

const sendMessage = async ({ receiverId, text, render_id }) => {
  const data = {
    receiver_id: receiverId,
    text,
    render_id
  }
  const res = await api.instance.request.post(`/chat/message`, data)
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
  unlikePostByCurrentUser,
  getPostHasLikeCurrentUser,
  getUserComment,
  getPostByUserId,
  getUserDetail,
  getUserProfileByUserId,
  getUserHasFollow,
  followUser,
  unfollowUser,
  getRequestedFollowers,
  getCurrentUserFollowing,
  confirmFollower,
  unconfirmFollower,
  getCurrentUserFollowers,
  deleteFollowers,
  searchPost,
  searchUser,
  getCurrentUserHasLikeComment,
  likeComment,
  unlikeComment,
  getCommentReply,
  replyComment,
  getUserChats,
  getCurrentuserTotalPosts,
  getCurrentUserTotalFollowersAndFollowing,
  getUserTotalPost,
  getUserTotalFollowingAndFollowers,
  getUserFollowers,
  getUserFollowing,
  getMessages,
  createChat,
  sendMessage,
};
