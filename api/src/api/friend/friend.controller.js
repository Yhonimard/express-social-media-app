const FriendController = (service) => {


  const follow = async (req, res, next) => {
    try {
      await service.follow(req.user, req.params)
      res.json({ message: 'success' })
    } catch (error) {
      return next(error)
    }
  }

  const unfollow = async (req, res, next) => {
    try {
      await service.unfollow(req.user, req.params)
      res.json({ message: 'success' })
    } catch (error) {
      return next(error)
    }
  }

  const getUserHasFollow = async (req, res, next) => {
    try {
      const result = await service.getUserHasFollow(req.user, req.params)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const getRequestedFollowers = async (req, res, next) => {
    try {
      const result = await service.getRequestedFollowers(req.user, req.query)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const confirmFollower = async (req, res, next) => {
    try {
      await service.confirmFollower(req.user, req.params)
      res.json({ message: 'success' })
    } catch (error) {
      return next(error)
    }
  }

  const unconfirmFollower = async (req, res, next) => {
    try {
      await service.unconfirmFollower(req.user, req.params)
      res.json({ message: 'success' })
    } catch (error) {
      return next(error)
    }
  }

  const getCurrentUserTotalFollowersAndFollowing = async (req, res, next) => {
    try {
      const result = await service.getCurrentUserTotalFollowersAndFollowing(req.user)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const getUserTotalFollowingAndFollowers = async (req, res, next) => {
    try {
      const result = await service.getUserTotalFollowingAndFollowers(req.params)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }


  const getCurrentUserFollowers = async (req, res, next) => {
    try {
      const result = await service.getCurrentUserFollowers(req.user, req.query)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const getCurrentUserFollowing = async (req, res, next) => {
    try {
      const result = await service.getCurrentUserFollowing(req.user, req.query)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }


  const getUserFollowers = async (req, res, next) => {
    try {
      const result = await service.getUserFollowers(req.params, req.query, req.user)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const getUserFollowing = async (req, res, next) => {
    try {
      const result = await service.getUserFollowing(req.params, req.query, req.user)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  return {
    follow,
    unfollow,
    getUserHasFollow,
    getRequestedFollowers,
    confirmFollower,
    unconfirmFollower,
    getCurrentUserTotalFollowersAndFollowing,
    getUserTotalFollowingAndFollowers,
    getCurrentUserFollowers,
    getCurrentUserFollowing,
    getUserFollowers,
    getUserFollowing
  }

}

export default FriendController