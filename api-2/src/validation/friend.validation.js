import Joi from "joi";

const follow = {
  params: Joi.object().keys({
    receiverId: Joi.string().required().empty().messages({
    })
  })
}

const confirmFriend = {
  params: Joi.object().keys({
    senderId: Joi.string().required().empty().messages({
    })
  })
}

const unconfirmFriend = {
  params: Joi.object().keys({
    senderId: Joi.string().required().empty()
  })
}


const unfollow = {
  params: Joi.object().keys({
    receiverId: Joi.string().required().empty()
  })
}


const getUserHasFollow = {
  params: Joi.object().keys({
    receiverId: Joi.string().required().empty().label("user receiver id")
  })
}

const getCurrentUserFriendRequest = {
  query: Joi.object().keys({
    pageNo: Joi.number().required().empty().min(1),
    size: Joi.number().required().empty().min(1)
  })
}

const getCurrentUserFollowing = {
  query: Joi.object().keys({
    pageNo: Joi.number().required().empty().min(1),
    size: Joi.number().required().empty().min(1)
  })
}

const getCurrentUserFollowers = {
  query: Joi.object().keys({
    pageNo: Joi.number().required().empty().min(1),
    size: Joi.number().required().empty().min(1)
  })
}

const deleteFollowers = {
  body: Joi.object().keys({
    senderId: Joi.string().required().empty()
  })
}


export default {
  follow,
  confirmFriend,
  unconfirmFriend,
  unfollow,
  getUserHasFollow,
  getCurrentUserFriendRequest,
  getCurrentUserFollowing,
  getCurrentUserFollowers,
  deleteFollowers
}
