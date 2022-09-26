const bcrypt = require("bcrypt");
const Token = require("../utils/token");
const UserModel = require("./../models/user");

class UserService {
  constructor() {}

  static userResponse = (data) => {
    return {
      email: data.email,
      username: data.username,
      id: data.id,
    };
  };

  /**
   * @param {string} username the username of the user
   * @param {string} email the email of the user
   * @param { string} password the password of the user
   */

  static async register(data) {
    try {
      const { email, password } = data;
      console.log();
      const user = await UserModel.findOne({
        email: email.toLowerCase(),
      });

      if (user)
        return {
          statusCode: 400,
          message: "User already exists",
        };

      const hashpassword = await bcrypt.hashSync(password, 6);

      const createUser = await UserModel.create({
        email: email.toLowerCase(),

        password: hashpassword,
      });

      return {
        statusCode: 200,
        message: "User created successfully",
        data: await UserService.userResponse(createUser),
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async login(data) {
    try {
      const { email, password } = data;

      const user = await UserModel.findOne({
        email: email.toLowerCase(),
      });

      if (!user)
        return {
          statusCode: 400,
          message: "Invalid credentials",
        };

      const isPasswordValid = await bcrypt.compareSync(password, user.password);

      if (!isPasswordValid)
        return {
          statusCode: 400,
          message: "Invalid credentials",
        };

      const token = await Token.generateToken(user.id);

      return {
        statusCode: 200,
        message: "Login successful",
        data: {
          token,
          user: await UserService.userResponse(user),
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async changePassword(data) {
    const { oldPassword, newPassword } = data;
    const user = await UserModel.findOne({ _id: data.id });

    //update password if password is valid
    const isPasswordValid = await bcrypt.compareSync(
      oldPassword,
      user.password
    );

    if (!isPasswordValid)
      return {
        statusCode: 400,
        message: "Invalid credentials",
      };

    const hashpassword = await bcrypt.hashSync(newPassword, 6);

    await UserModel.findOneAndUpdate(
      { _id: data.id },
      { password: hashpassword }
    );

    return {
      statusCode: 200,
      message: "Password changed successfully",
    };
  }
}

module.exports = UserService;
