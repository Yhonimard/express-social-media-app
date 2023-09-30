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


const unfriend = {
  params: Joi.object().keys({
    receiverId: Joi.string().required().empty().uuid().guid().messages({
      "string.empty": "receiverId is required!!",
      "any.required": "receiverId is required!!",
      "string.uuid": "receiverId must have a valid uuid",
      "string.guid": "receiverId must have a valid uuid"
    })
  })
}




export default {
  addFriend,
  confirmFriend,
  unconfirmFriend,
  unfriend
}