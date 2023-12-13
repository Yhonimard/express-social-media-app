import moment from "moment/moment";
import ApiBadRequestError from "../exception/ApiBadRequestError";
import UserService from "../service/user.service";
import userValidation from "../validation/user.validation";

const UserController = () => {
  const service = UserService();
  const validation = userValidation;

  const getUserById = async (req, res, next) => {
    const { params } = req;
    try {
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
      await service.updateProfile(req.user, data);
      res.json({ message: "success update user profile" });
    } catch (error) {
      return next(error);
    }
  };

  const getUserProfileByUserId = async (req, res, next) => {
    try {
      const response = await service.getUserProfileByUserId(req.params)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }

  const searchUser = async (req, res, next) => {
    try {
      const response = await service.searchUser(req.query)
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
    searchUser
  };
};

export default UserController;
