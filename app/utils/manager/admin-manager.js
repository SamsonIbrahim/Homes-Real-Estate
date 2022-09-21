const bcrypt = require("bcrypt");
const AdminModel = require("../../models/admin");
const Admin = require("../../class/admin");

class AdminManager {
  static async createAdmin(email, firstName, lastName, password) {
    try {
      const createAdmin = await AdminModel.create({
        email,
        firstName,
        lastName,
        password,
      });
      return await AdminManager.findAdminById(createAdmin.id);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async findAdminById(id) {
    const idValid = await AdminManager.checkIfMongooseObjectIDValid(id);
    if (idValid) {
      const findUser = await AdminModel.findOne({ _id: id });
      return new Admin(findUser);
    }
  }

  static async checkIfMongooseObjectIDValid(id) {
    try {
      if (typeof id === "string" && id.length === 24) {
        return true;
      }
      return false;
    } catch (error) {
      return new Error(error);
    }
  }
}

module.exports = AdminManager;
