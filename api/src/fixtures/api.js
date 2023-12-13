
export const API_USER = "/user"
export const API_USER_PROFILE = `${API_USER}/profile`
export const API_USER_ID = `${API_USER}/:id`
export const API_USER_DETAIL_ID = `${API_USER_ID}/detail`
export const API_USER_PROFILE_ID = `${API_USER_ID}/profile`
export const API_USER_SEARCH = `${API_USER}/search`




export const API_POST = "/post"
export const API_POST_ID = `${API_POST}/:id`
export const API_POST_DETAIL = `${API_POST_ID}/detail`
export const API_POST_HAS_LIKE = `${API_POST_ID}/haslike`
export const API_POST_LIKE = `${API_POST_ID}/like`
export const API_POST_UNLIKE = `${API_POST_ID}/unlike`
export const API_POST_USER = `${API_USER}/post`
export const API_POST_USER_ID = `${API_USER}/:user_id/post`
export const API_POST_USER_LIKE = `${API_POST_USER}/like`
export const API_POST_SEARCH = `${API_POST}/search`
export const API_POST_USER_TOTAL = `${API_USER}${API_POST}/total`
export const API_POST_USER_TOTAL_ID = `${API_USER_ID}${API_POST}/total`


export const API_COMMENT = "/post/comment"
export const API_COMMENT_ID = `${API_COMMENT}/:id`
export const API_COMMENT_POST = "/post/:post_id/comment"
export const API_COMMENT_POST_ID = `${API_COMMENT_POST}/:id`
export const API_COMMENT_POST_LIKE_CHECK = `${API_COMMENT_ID}/haslike`
export const API_COMMENT_POST_LIKE_ADD = `${API_COMMENT_ID}/like`
export const API_COMMENT_POST_LIKE_REMOVE = `${API_COMMENT_ID}/unlike`
export const API_COMMENT_PARENT_ID = `${API_COMMENT}/:parent_id`
export const API_COMMENT_REPLY = `${API_COMMENT_PARENT_ID}/reply`
export const API_COMMENT_USER = `${API_USER}${API_COMMENT}`


export const API_FRIEND = '/friend'
export const API_FRIEND_ID = '/friend/:id'
export const API_FRIEND_USER_ID = `${API_USER_ID}/friend/`
export const API_FRIEND_FOLLOWERS_REQUEST = `${API_USER}/friend/request`
export const API_FRIEND_REQUEST_ID = `${API_FRIEND_ID}/request`
export const API_FRIEND_USER_TOTAL = `${API_USER}${API_FRIEND}/total`
export const API_FREIND_USER_TOTAL_ID = `${API_USER_ID}${API_FRIEND}/total`
export const API_FRIEND_USER_FOLLOWERS = `${API_USER}/friend/followers`
export const API_FRIEND_USER_FOLLOWING = `${API_USER}/friend/following`
export const API_FRIEND_USER_FOLLOWERS_ID = `${API_USER_ID}/friend/followers`
export const API_FRIEND_USER_FOLLOWING_ID = `${API_USER_ID}/friend/following`

export const API_CHAT = '/chat'
export const API_CHAT_USER_ID = `${API_USER_ID}${API_CHAT}`
export const API_CHAT_USER = `${API_USER}/chat`
export const API_CHAT_MESSAGE = `${API_CHAT}/message`
export const API_CHAT_MESSAGE_ID = `${API_CHAT}/message/:user_id`




