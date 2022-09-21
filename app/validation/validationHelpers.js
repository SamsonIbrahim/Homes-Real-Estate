const joi = require("joi");

/**
 * contains validation helpers
 *
 * @class ValidationHelper
 */

class ValidationHelper {
  /**
   * It validates a number.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */

  static numberCheck(param, min = 1) {
    return joi
      .number()
      .integer()
      .required()
      .min(min)
      .strict()
      .messages({
        "any.required": `${param} is a required field`,
        "number.base": `${param} must be a number`,
        "number.empty": `${param} cannot be an empty field`,
        "number.min": `${param} can not be lesser than ${min}`,
      });
  }

  /**
   * It validates a String that has only numbers.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static numberStringCheck(param, min = 1) {
    return joi
      .number()
      .integer()
      .required()
      .min(min)
      .messages({
        "any.required": `${param} is a required field`,
        "number.base": `${param} must be a number`,
        "number.empty": `${param} cannot be an empty field`,
        "number.min": `${param} can not be lesser than ${min}`,
      });
  }

  /**
   * It validates a number.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editNumberCheck(param, min = 1, max = 1000000000) {
    return joi
      .number()
      .min(min)
      .messages({
        "number.base": `${param} must be a number`,
        "number.empty": `${param} cannot be an empty field`,
        "number.min": `${param} can not be lesser than ${min}`,
        "number.max": `${param} can not be greater than ${max}`,
      });
  }

  /**
   * It validates a string.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static stringCheck(param, min = 1, max = 12000000) {
    return joi
      .string()
      .required()
      .trim()
      .min(min)
      .max(max)
      .messages({
        "any.required": `${param} is a required field`,
        "string.max": `${param} can not be greater than ${max} characters`,
        "string.min": `${param} can not be lesser than ${min} characters`,
        "string.base": `${param} must be a string`,
        "string.empty": `${param} cannot be an empty field`,
      });
  }

  /**
   * It validates a string.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static stringCheckNotRequired(param, min = 1, max = 12000000) {
    return joi
      .string()
      .trim()
      .min(min)
      .max(max)
      .messages({
        "any.required": `${param} is a required field`,
        "string.max": `${param} can not be greater than ${max} characters`,
        "string.min": `${param} can not be lesser than ${min} characters`,
        "string.base": `${param} must be a string`,
        "string.empty": `${param} cannot be an empty field`,
      });
  }

  /**
   * It validates a password.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static passwordCheck() {
    return joi.string().trim().required().min(7).messages({
      "string.base": "Password must be a string",
      "string.empty": "Password field cannot be an empty field",
      "any.required": "Password field is required",
      "string.min": "Password can not be lesser than 7 characters",
    });
  }

  /**
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static phoneNumberCheck() {
    return joi
      .string()
      .regex(new RegExp(/^([0]{1})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7,8})$/))
      .required()
      .messages({
        "string.base": "Phone number must be a string",
        "string.empty": "Phone number cannot be an empty field",
        "any.required": "Phone number is required",
        "string.pattern.base": "Phone number is not valid",
      });
  }

  /**
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editPhoneNumberCheck() {
    return joi
      .string()
      .trim()
      .regex(new RegExp(/^([0]{1})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7,8})$/))
      .messages({
        "string.base": "Phone number must be a string",
        "string.empty": "Phone number cannot be an empty field",
        "string.min": "Phone number can not be lesser than 11 characters",
        "string.max": "Phone number can not be greater than 11 characters",
        "string.pattern.base": "Phone number is not valid",
      });
  }

  /**
   * It validates a string that is not required.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editStringCheck(param, min = 1, max = 5000) {
    return joi
      .string()
      .min(min)
      .max(max)
      .trim()
      .empty()
      .messages({
        "string.base": `${param}  must be a string`,
        "string.empty": `${param} cannot be an empty field`,
        "string.min": `${param} can not be lesser than ${min} characters`,
        "string.max": `${param} can not be greater than ${max} characters`,
      });
  }

  /**
   * It validates a email
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static emailCheck() {
    return joi.string().email().required().messages({
      "any.required": "Email is a required field",
      "string.email": "Email is not valid",
      "string.empty": "Email cannot be an empty field",
    });
  }

  /**
   * It validates an optional email
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editEmailCheck() {
    return joi.string().email().messages({
      "string.email": "Email is not valid",
      "string.empty": "Email cannot be an empty field",
    });
  }

  /**
   * It validates a string is part of an enum.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static enumCheck(fields, param) {
    return joi
      .string()
      .required()
      .valid(...fields)
      .messages({
        "string.empty": `${param} must not be an empty field`,
        "any.required": `${param} is a required field`,
        "any.only": `Please enter a valid ${param}`,
      });
  }

  /**
   * It validates a string is part of an enum.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editEnumCheck(fields, param) {
    return joi
      .string()
      .valid(...fields)
      .messages({
        "string.empty": `${param} must not be an empty field`,
        "any.only": `Please enter a valid ${param}`,
      });
  }

  /**
   * It validates an array.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static arrayStringCheck(param, min) {
    return joi
      .array()
      .items(joi.string().min(min))
      .required()
      .messages({
        "array.empty": `${param} is a required field`,
        "array.base": `${param} must be a valid array`,
        "any.required": `${param} cannot be an empty field`,
      });
  }

  /**
   * It validates an array that is not required
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editArrayStringCheck(param, min) {
    return joi
      .array()
      .items(joi.string().min(min))
      .messages({
        "array.empty": `${param} is a required field`,
        "array.base": `${param} must be a valid array`,
        "any.required": `${param} cannot be an empty field`,
      });
  }

  /**
   * It validates an array that is not required and gas object items
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editArrayObjectCheck(param) {
    return joi
      .array()
      .items(joi.object().min(2))
      .messages({
        "array.empty": `${param} is a required field`,
        "array.base": `${param} must be a valid array`,
        "any.required": `${param} cannot be an empty field`,
      });
  }

  static booleanCheck(param) {
    return joi.boolean().messages({
      "boolean.base": `${param} is not a boolean`,
    });
  }

  /**
   * It validates an object.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static objectCheck(param) {
    return joi.object({}).messages({
      "object.base": `${param} is not an object`,
    });
  }

  static emailOrPhoneNumberField(param) {
    // joi to validate email OR phone number in the sameField
    return joi
      .string()
      .trim()
      .required()
      .regex(
        new RegExp(
          /(^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)|(^([0]{1})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7,8})$)/
        )
      )
      .messages({
        "string.base": `${param} must be a string`,
        "string.empty": `${param} cannot be an empty field`,
        "string.pattern.base": `${param} is not valid`,
      });
  }
}

module.exports = ValidationHelper;
