const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const { LOCAL_DB, TEST_DB, PRODUCTION_DB } = require("./keys");

let mongoUrl = null;
const mongoConnection = () => {
  if (process.env.NODE_ENV === "test") {
    mongoUrl = TEST_DB || "mongodb://localhost:27017";
  } else if (process.env.NODE_ENV === "production") {
    mongoUrl = PRODUCTION_DB;
  } else {
    mongoUrl = LOCAL_DB;
  }
  // console.log(mongoUrl);
  return mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = mongoConnection;
