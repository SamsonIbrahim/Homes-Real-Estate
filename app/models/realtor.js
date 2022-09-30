const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const RealtorSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: [true, "Realtor must have a username"],
    trim: true,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    required: [true, "Realtor must have a email"],
    trim: true,
    unique: true,
    sparse: true,
  },
  firstName: {
    type: String,
    required: [true, "Realtor must have a firstName"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Realtor must have a lastName"],
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  property: [
    {
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      price: {
        type: Number,
      },
      Address: {
        type: String,
      },
    },
  ],
});

RealtorSchema.plugIn(mongoosePaginate);
module.exports = mongoose.model("Realtor", RealtorSchema);
