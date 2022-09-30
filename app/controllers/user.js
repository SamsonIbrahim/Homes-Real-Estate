const UserService = require("../service/user");
const { errorResponse, successResponse } = require("../utils/response");
// const logger = require("../utils/logger");

class UserController {
  static async registerUser(req, res) {
    try {
      const result = await UserService.register(req.body);

      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  static async loginUser(req, res) {
    try {
      const result = await UserService.login(req.body);

      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  static async changePassword(req, res) {
    try {
      const result = await UserService.changePassword({
        ...req.body,
        id: req.user.id,
      });

      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = UserController;
