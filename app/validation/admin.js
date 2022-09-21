const Joi = require("Joi");

const {
  stringCheck,
  numberCheck,
  emailCheck,
  passwordCheck,
  booleanCheck,
  numberStringCheck,
  phoneNumberCheck,
  emailOrPhoneNumberField,
  editArrayStringCheck,
  validateAmount,
  arrayStringCheck,
  editStringCheck,
  editNumberCheck,
  stringCheckNotRequired,
  anyTypeCheck,
  editArrayObjectCheck,
} = require("./validationHelpers");

const { errorResponse } = require("../utils/response");

// const logInAdminSchema = joi.object({
//   email: emailCheck(),
//   password: passwordCheck(),
// });

// const signUpAdminSchema = joi.object({
//   email: emailCheck(),
//   firstName: stringCheck("First Name"),
//   lastname: stringCheck("Last Name"),
//   password: passwordCheck(),
// });

// module.exports = {
//   signUpAdminSchema,
//   logInAdminSchema,
// };

class AdminValidation {
  constructor() {}

  static async signUpAdmin(req, res, next) {
    try {
      const adminRegisterForm = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.array().items(
          Joi.string().valid(
            "projectAdmin",
            "userAdmin",
            "notificationAdmin",
            "admin"
          )
        ),
        password: Joi.string()
          .min(6)
          .pattern(new RegExp("[^a-z/A-z]"))
          .required(),
      });
      await adminRegisterForm.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  static async signInAdmin(req, res, next) {
    try {
      const loginAdminSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }).or("email", "phoneNumber");
      await loginAdminSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }
}

module.exports = AdminValidation;
