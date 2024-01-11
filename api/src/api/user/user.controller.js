const UserController = (service) => {

  const getCurrentUser = async (req, res, next) => {
    try {
      const result = await service.getCurrentUser(req.user)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }


  const getCurrentUserProfile = async (req, res, next) => {
    try {
      const result = await service.getCurrentUserProfile(req.user)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }


  const getUserById = async (req, res, next) => {
    try {
      const result = await service.getUserById(req.params)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const getProfileByUserId = async (req, res, next) => {
    try {
      const result = await service.getProfileByUserId(req.params)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const updateProfile = async (req, res, next) => {
    try {
      await service.updateProfile(req.body, req.user)
      res.json({ message: "success" })
    } catch (error) {
      return next(error)
    }
  }

  const searchUser = async (req, res, next) => {
    try {
      const result = await service.searchUser(req.query, req.user)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  return {
    getCurrentUser,
    getCurrentUserProfile,
    getUserById,
    getProfileByUserId,
    updateProfile,
    searchUser
  }
}

export default UserController