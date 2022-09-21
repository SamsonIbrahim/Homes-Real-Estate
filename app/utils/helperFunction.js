const bcrypt = require("bcrypt");
const { BCRYPT } = require("../config/keys");
const dotenv = require("dotenv");

// dotenv.config();

class HelperFunction {
  /**
   * @description function to hash password
   * @param {*} password - password to be hashed
   * @return {Object} returns the hashed password
   */

  static async hashPassword(password) {
    const hash = await bcrypt.hash(password, Number(BCRYPT));
    return hash;
  }
}

module.exports = HelperFunction;
