const AuthController = (service) => {
  const login = async (req, res, next) => {
    try {
      const response = await service.login(req.body)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }

  const register = async (req, res, next) => {
    try {
      const data = {
        ...req.body,
        photo_profile: req.file.path
      }

      await service.register(data)
      res.json({ message: "success" })
    } catch (error) {
      return next(error)
    }
  }

  return {
    login,
    register
  }
}

export default AuthController