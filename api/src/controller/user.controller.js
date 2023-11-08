import moment from "moment/moment";
import ApiBadRequestError from "../exception/ApiBadRequestError";
import UserService from "../service/user.service";
import userValidation from "../validation/user.validation";
import apiBadRequestError from "../exception/ApiBadRequestError";

const UserController = () => {
  const service = UserService();
  const validation = userValidation;

  const getUserById = async (req, res, next) => {
    const { params } = req;
    try {
      const { error } = validation.getUserById.params.validate(params);
      if (error) throw new ApiBadRequestError(error.message);
      const response = await service.getUserById(params?.userId);
      res.json(response);
    } catch (error) {
      return next(error);
    }
  };

  const getUserCurrent = async (req, res, next) => {
    const { user } = req;
    const currentUser = user;
    try {
      const response = await service.getUserCurrent(currentUser);
      res.json({ message: "success get user user current", data: response });
    } catch (error) {
      return next(error);
    }
  };

  const getUserProfile = async (req, res, next) => {
    try {
      const response = await service.getUserProfile(req.user);

      res.json(response);
    } catch (error) {
      return next(error);
    }
  };

  const updateProfile = async (req, res, next) => {
    const data = {
      ...req.body,
      phone: String(req.body.phone),
    };
    try {
      console.log('data', data)
      const { error } = validation.updateProfile.body.validate(data);
      if (error) throw new ApiBadRequestError(error.message);

      await service.updateProfile(req.user, data);
      res.json({ message: "success update user profile" });
    } catch (error) {
      return next(error);
    }
  };

  const getUserProfileByUserId = async (req, res, next) => {
    try {
      const { error } = validation.getUserProfileByUserId.params.validate(req.params)
      if (error) throw new ApiBadRequestError(error.message)

      const response = await service.getUserProfileByUserId(req.params)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }

  const searchUserByUserId = async (req, res, next) => {
    try {
      const response = await service.searchUserByUserId(req.query)
      res.json(response)
    } catch (error) {
      return next(error)
    }

  }

  return {
    getUserById,
    getUserCurrent,
    updateProfile,
    getUserProfile,
    getUserProfileByUserId,
    searchUserByUserId
  };
};

export default UserController;
