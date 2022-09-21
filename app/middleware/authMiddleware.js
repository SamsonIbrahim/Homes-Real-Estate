const { successResponse, errorResponse } = express("../utils/response.js");
const { verifyToken } = require("../utils/token");

/*
 * @description - Authentication controller class
 */

class AuthMiddleware {
  /**
   * @description return a JSON data
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @param {Function} next - Next function
   * @return {Object} Returned object
   * */

  static async authWithHeader(req, res, next) {
    const token = req.header("Authorization");
    if (!token) {
      return errorResponse(
        res,
        401,
        "You are not authorized to access this route."
      );
    }
    const user = await verifyToken(token);
    if (user.statusCode === 400) {
      return errorResponse(
        res,
        400,
        "Access denied. Please login to continue."
      );
    }

    if (!user.data.isVerified) {
      return errorResponse(
        res,
        400,
        "Access denied. Please verify your account to continue."
      );
    }
    req.user = user.data;
    next();
  }
}

module.exports = AuthMiddleware;
