import Sequelize from "sequelize";

// DB
export const DB_PRIMARY = "POSTGRES";


export const TABLE_META_CREATED_AT = "created_at";
export const TABLE_META_UPDATED_AT = "updated_at";
export const TABLE_META_ATTRIBUTES = {
  createdAt: { type: Sequelize.DATE, field: TABLE_META_CREATED_AT, defaultValue: Sequelize.literal("NOW()") },
  updatedAt: { type: Sequelize.DATE, field: TABLE_META_UPDATED_AT, defaultValue: Sequelize.literal("NOW()") },
};
export const TABLE_META_OPTIONS = { timestamps: true, underscored: true };
export const FOREIGN_KEY_CONSTRAINS = {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  constraints: true
}



// USER
export const USER_MODEL_NAME = "User";
export const USER_TABLE_NAME = "users";
export const USER_HAS_MANY_POST_FK = "user_id";
export const USER_HAS_MANY_POST_ALIAS = "posts";
export const USER_HAS_MANY_COMMENT_FK = "user_id"
export const USER_HAS_MANY_COMMENT_ALIAS = "comments"
export const USER_BELONGS_TO_MANY_POST_LIKE_FK = "user_id"
export const USER_BELONGS_TO_MANY_POST_LIKE_ALIAS = "likedPost"
export const USER_BELONGS_TO_MANY_LIKE_COMMENT_FK = "user_id"
export const USER_BELONGS_TO_MANY_LIKE_COMMENT_ALIAS = "likedComment"
export const USER_HAS_ONE_USER_PROFILE_FK = "user_id"
export const USER_HAS_ONE_USER_PROFILE_ALIAS = "profile"
export const USER_BELONGS_TO_MANY_FRIEND_FK = "user_id"
export const USER_BELONGS_TO_MANY_FRIEND_ALIAS = 'following'
export const USER_BELONGS_TO_MANY_USER_FRIEND_FK = 'friend_id'
export const USER_BELONGS_TO_MANY_USER_FRIEND_ALIAS = 'follower'
export const USER_BELONGS_TO_MANY_USER_CHAT_ALIAS = 'chat'
export const USER_BELONGS_TO_MANY_USER_CHAT_FK = 'user_id'


// POST
export const POST_MODEL_NAME = "Post";
export const POST_TABLE_NAME = "posts";
export const POST_BELONGS_TO_USER_FK = "user_id";
export const POST_BELONGS_TO_USER_ALIAS = "author";
export const POST_HAS_MANY_COMMENT_FK = "post_id"
export const POST_HAS_MANY_COMMENT_ALIAS = "comments"
export const POST_BELONGS_TO_MANY_USER_LIKE_FK = "post_id"
export const POST_BELONGS_TO_MANY_USER_LIKE_ALIAS = "likedBy"

// COMMENT
export const COMMENT_MODEL_NAME = "Comment"
export const COMMENT_TABLE_NAME = "comment"
export const COMMENT_BELONGS_TO_POST_FK = "post_id"
export const COMMENT_BELONGS_TO_POST_ALIAS = "post"
export const COMMENT_BELONGS_TO_USER_FK = "user_id"
export const COMMENT_BELONGS_TO_USER_ALIAS = "author"
export const COMMENT_BELONGS_TO_PARENT_FK = "parent_id"
export const COMMENT_BELONGS_TO_PARENT_ALIAS = "parent"
export const COMMENT_HAS_MANY_CHILD_FK = "parent_id"
export const COMMENT_HAS_MANY_CHILD_ALIAS = "replies"
export const COMMENT_BELONGS_TO_MANY_LIKE_USER_FK = "comment_id"
export const COMMENT_BELONGS_TO_MANY_LIKE_USER_ALIAS = "likedBy"


// USER_LIKE_POST
export const USER_LIKE_POST_MODEL_NAME = "UserLikePost"
export const USER_LIKE_POST_TABLE_NAME = "user_like_post"
export const USER_LIKE_POST_BELONGS_TO_POST_ALIAS = "post"
export const USER_LIKE_POST_BELONGS_TO_POST_FK = "post_id"

// USER LIKE COMMENT
export const USER_LIKE_COMMENT_MODEL_NAME = "UserLikeComment"
export const USER_LIKE_COMMENT_TABLE_NAME = "user_like_comment"

// USER PROFILE
export const USER_PROFILE_MODEL_NAME = "UserProfile"
export const USER_PROFILE_TABLE_NAME = "user_profile"
export const USER_PROFILE_BELONGS_TO_USER_ALIAS = "user"
export const USER_PROFILE_BELONGS_TO_USER_FK = "user_id"


// USER FRIEND
export const USER_FRIEND_MODEL_NAME = "UserFriend"
export const USER_FRIEND_TABLE_NAME = "user_friends"
export const USER_FRIEND_BELONGS_TO_USER_FOLLOWER_ALIAS = "follower"
export const USER_FRIEND_BELONGS_TO_USER_FOLLOWER_FK = "user_id"
export const USER_FRIEND_BELONGS_TO_USER_FOLLOWING_ALIAS = 'following'
export const USER_FRIEND_BELONGS_TO_USER_FOLLOWING_FK = 'friend_id'

// CHAT
export const CHAT_MODEL_NAME = "Chat"
export const CHAT_TABLE_NAME = 'chat'
export const CHAT_BELONGS_TO_MANY_USER_CHAT_FK = "chat_id"
export const CHAT_BELONGS_TO_MANY_USER_CHAT_ALIAS = "user"
export const CHAT_HAS_MANY_MESSAGE_FK = 'chat_id'
export const CHAT_HAS_MANY_MESSAGE_ALIAS = 'messages'


// USER CHAT
export const USER_CHAT_MODEL_NAME = 'UserChat'
export const USER_CHAT_TABLE_NAME = 'user_chat'


// MESSAGE
export const MESSAGE_MODEL_NAME = "Message"
export const MESSAGE_TABLE_NAME = "messages"
export const MESSAGE_BELONGS_TO_CHAT_FK = 'chat_id'
export const MESSAGE_BELONGS_TO_CHAT_ALIAS = 'chat'
export const MESSAGE_BELONGS_TO_SENDER_FK = 'sender_id'
export const MESSAGE_BELONGS_TO_SENDER_ALIAS = 'sender'
export const MESSAGE_BELONGS_TO_RECEIVER_FK = 'receiver_id'
export const MESSAGE_BELONGS_TO_RECEIVER_ALIAS = 'receiver'