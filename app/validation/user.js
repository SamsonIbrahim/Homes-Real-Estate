const Joi = require("Joi");

const { errorResponse } = require("../utils/response");

class UserValidation {
  static async registerUser(req, res, next) {
    try {
      const UserRegisterForm = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      });

      await UserRegisterForm.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const UserLoginForm = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      });
      await UserLoginForm.validateAsync(req.body, {
        abortEarly: false,
      });

      next();
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  static async changePassword(req, res, next) {
    try {
      const ChangePasswordForm = Joi.object().keys({
        oldPassword: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required(),
      });
      await ChangePasswordForm.validateAsync(req.body, {
        abortEarly: false,
      });

      next();
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }
}

module.exports = UserValidation;
