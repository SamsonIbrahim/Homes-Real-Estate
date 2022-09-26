const mongoose = require("mongoose");
const keys = require("../config/keys");
const { generatePassword } = require("../validation/validationHelpers");
const generateToken = require("../utils/token");
const AdminSchema = require("../models/admin");
const Admin = require("../class/admin");
const AdminModel = require("../models/admin");
const AdminManager = require("../utils/manager/admin-manager");
const { successResponse, errorResponse } = require("../utils/response");
const logger = require("../utils/logger");
const bodyparser = require("body-parser");
const HelperFunction = require("../utils/helperFunction");

/*
 * @description - Admin auth
 */
console.log();
class AdminService {
  /**
   * @description return a JSON data
   * @param {Object} admin - req body from admin controllers
   * @return {Object} Returns object
   */

  static async signUpAdminService(data) {
    try {
      const { email, password } = data;
      const admin = await AdminManager.getAdminByEmail(email);
      if (admin)
        return errorResponse(res, 409, "Admin already exist, please login");
      // hash password
      const hashedPassword = await HelperFunction.hashPassword(password);
      const newAdmin = new Admin(email, hashedPassword);
      const result = await AdminManager.createAdmin(newAdmin);
      return successResponse(res, 201, "Admin successfully created", result);
    } catch (error) {
      logger.info(error.message);
      return errorResponse(res, 500, "Internal Server Error");
    }
  }

  static async signInAdminService(req, res) {
    try {
      // get admin from db
      const { email, password } = req.body;
      const admin = await AdminManager.getAdminByEmail(email);
      if (!admin)
        return errorResponse(res, 401, "Admin does not exist, please signup");
      // check if password is correct
      const isPasswordCorrect = await HelperFunction.comparePassword(
        password,
        admin.password
      );
      if (!isPasswordCorrect)
        return errorResponse(res, 401, "Invalid password");
      // generate token
      const token = generateToken(admin.id);
      return successResponse(res, 200, "Admin successfully signed in", token);
    } catch (error) {
      logger.info(error.message);
      return errorResponse(res, 500, "Internal Server Error");
    }
  }
}

module.exports = AdminService;
