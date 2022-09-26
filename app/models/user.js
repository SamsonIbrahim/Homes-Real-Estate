const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: "string",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    unique: true,
  },
  lastName: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
