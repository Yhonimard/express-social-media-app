import { Joi } from "celebrate"

const FriendValidation = () => {

  const followUser = {
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  }

  const unfollowUser = {
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  }

  const getUserHasfollow = {
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  }

  const confirmFollower = {
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  }

  const unconfirmFollower = {
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  }

  const getUserTotalFollowingAndFollowers = {
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  }
  const getCurrentUserFollowers = {
    query: Joi.object().keys({
      pageNo: Joi.number().required().min(1),
      size: Joi.number().required().min(1),
      search: Joi.string().allow('').allow(null)
    })
  }
  const getCurrentUserFollowing = {
    query: Joi.object().keys({
      pageNo: Joi.number().required().min(1),
      size: Joi.number().required().min(1),
      search: Joi.string().allow('').allow(null)
    })
  }

  const getUserFollowers = {
    query: Joi.object().keys({
      pageNo: Joi.number().required().min(1),
      size: Joi.number().required().min(1),
      search: Joi.string().allow('').allow(null)
    }),
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  }

  const getUserFollowing = {
    query: Joi.object().keys({
      pageNo: Joi.number().required().min(1),
      size: Joi.number().required().min(1),
      search: Joi.string().allow('').allow(null)
    }),
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  }

  return {
    followUser,
    unfollowUser,
    getUserHasfollow,
    confirmFollower,
    unconfirmFollower,
    getUserTotalFollowingAndFollowers,
    getCurrentUserFollowers,
    getCurrentUserFollowing,
    getUserFollowers,
    getUserFollowing,
  }

}

export default FriendValidation