const jwt = require("jsonwebtoken");

class Token {
  /**
   * @description function to generate a token
   * @param {Object} user - req body object from the Diagnostic Center controller
   * @returns {Object} - Returned object
   **/
  static generateToken(user) {
    const payload = {
      subject: user.id,
      email: user.email,
    };

    const options = {
      expiresIn: "1d",
    };
    try {
      const token = jwt.sign(payload, JWTSECRET, options);
      logger.info("token Successfully created");
      return token;
    } catch (err) {
      logger.error(`Error generating token ${JSON.stringify(err)}`);
      return "Error generating token";
    }
  }

  /**
   * @description function to verify the token
   * @param {Object} token - req body object from the Diagnostic Center controller
   * @returns {Object} - Returned object
   **/
  static async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWTSECRET);

      const user = await DiagnosticCenterSchema.findById(decoded.subject);
      if (!user) {
        logger.error(`Invalid token ${JSON.stringify(user)}`);
        return { message: "Invalid token", statusCode: 400 };
      }
      logger.info(`Token verified successfully ${JSON.stringify(user)}`);
      return { data: user, statusCode: 200 };
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        logger.error(`Token expired ${JSON.stringify(err)}`);
        return { message: "Token expired", statusCode: 400 };
      }
      logger.error(`Invalid Token${JSON.stringify(err)}`);
      return { message: "Invalid Token", statusCode: 400 };
    }
  }
}

module.exports = Token;
