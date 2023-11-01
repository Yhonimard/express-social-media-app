import Joi from "joi";

const addFriend = {
  params: Joi.object().keys({
    receiverId: Joi.string().required().empty().uuid().guid().messages({
      "string.empty": "receiverId is required!!",
      "any.required": "receiverId is required!!",
      "string.uuid": "receiverId must have a valid uuid",
      "string.guid": "receiverId must have a valid uuid"
    })
  })
}

const confirmFriend = {
  params: Joi.object().keys({
    senderId: Joi.string().required().empty().uuid().guid().messages({
      "string.empty": "senderId is required!!",
      "any.required": "senderId is required!!",
      "string.uuid": "senderId must have a valid uuid",
      "string.guid": "senderId must have a valid uuid"
    })
  })
}

const unconfirmFriend = {
  params: Joi.object().keys({
    senderId: Joi.string().required().empty().uuid().guid().messages({
      "string.empty": "senderId is required!!",
      "any.required": "senderId is required!!",
      "string.uuid": "senderId must have a valid uuid",
      "string.guid": "senderId must have a valid uuid"
    })
  })
}


const unfollowUser = {
  params: Joi.object().keys({
    receiverId: Joi.string().required().empty().uuid().guid().messages({
      "string.empty": "receiverId is required!!",
      "any.required": "receiverId is required!!",
      "string.uuid": "receiverId must have a valid uuid",
      "string.guid": "receiverId must have a valid uuid"
    })
  })
}


const getUserHasFollow = {
  params: Joi.object().keys({
    receiverId: Joi.string().required().empty().uuid().guid().label("user receiver id")
  })
}

const getCurrentUserFriendRequestValidation = {
  query: Joi.object().keys({
    pageNo: Joi.number().required().empty().min(1).messages({
      "number.empty": "page no is required!!",
      "number.min": "size must be at least 1",
      "any.required": "page no is required!!",
    }),
    size: Joi.number().required().empty().min(1).messages({
      "number.empty": "size is required!!",
      "number.min": "size must be at least 1",
      "any.required": "size is required!!",
    })
  })
}

const getUserFollowingValidation = {
  query: Joi.object().keys({
    pageNo: Joi.number().required().empty().min(1).messages({
      "number.empty": "page no is required!!",
      "number.min": "size must be at least 1",
      "any.required": "page no is required!!",
    }),
    size: Joi.number().required().empty().min(1).messages({
      "number.empty": "size is required!!",
      "number.min": "size must be at least 1",
      "any.required": "size is required!!",
    })
  })
}

const getCurrentUserFollowers = {
  query: Joi.object().keys({
    pageNo: Joi.number().required().empty().min(1).messages({
      "number.empty": "page no is required!!",
      "number.min": "size must be at least 1",
      "any.required": "page no is required!!",
    }),
    size: Joi.number().required().empty().min(1).messages({
      "number.empty": "size is required!!",
      "number.min": "size must be at least 1",
      "any.required": "size is required!!",
    })
  })
}


export default {
  addFriend,
  confirmFriend,
  unconfirmFriend,
  unfollowUser,
  getUserHasFollow,
  getCurrentUserFriendRequestValidation,
  getUserFollowingValidation,
  getCurrentUserFollowers
}
