const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const AdminSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: [true, "Admin must have a username"],
    trim: true,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    required: [true, "Admin must have a email"],
    trim: true,
    unique: true,
    sparse: true,
  },
  firstName: {
    type: String,
    required: [true, "Admin must have a firstName"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Admin must have a lastName"],
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

AdminSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Admin", AdminSchema);
