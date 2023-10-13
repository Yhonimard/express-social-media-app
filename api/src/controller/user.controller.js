import moment from "moment/moment";
import ApiBadRequestError from "../exception/ApiBadRequestError";
import UserService from "../service/user.service";
import userValidation from "../validation/user.validation";
import apiBadRequestError from "../exception/ApiBadRequestError";

const UserController = () => {
  const userService = UserService();
  const validation = userValidation;

  const getUserById = async (req, res, next) => {
    const { params } = req;
    try {
      const { error } = validation.getUserById.params.validate(params);
      if (error) throw new ApiBadRequestError(error.message);
      const response = await userService.getUserById(params?.userId);
      res.json({ message: "success get user by id", data: response });
    } catch (error) {
      return next(error);
    }
  };

  const getUserCurrent = async (req, res, next) => {
    const { user } = req;
    const currentUser = user;
    try {
      const response = await userService.getUserCurrent(currentUser);
      res.json({ message: "success get user user current", data: response });
    } catch (error) {
      return next(error);
    }
  };

  const getUserProfile = async (req, res, next) => {
    try {
      const response = await userService.getUserProfile(req.user);

      res.json(response );
    } catch (error) {
      return next(error);
    }
  };

  const updateProfile = async (req, res, next) => {
    const data = {
      ...req.body,
      phone: req.body.phone,
    };
    try {
      const { error } = validation.updateProfile.body.validate(data);
      if (error) throw new ApiBadRequestError(error.message);

      const response = await userService.updateProfile(req.user, data);
      res.json({ message: "success update user profile" });
    } catch (error) {
      return next(error);
    }
  };

  return {
    getUserById,
    getUserCurrent,
    updateProfile,
    getUserProfile,
  };
};

export default UserController;
