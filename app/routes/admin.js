const express = require("express");
const validate = require("../validation/admin");
// const { signUpAdmin, loginAdmin } = require("../validation/admin");
const {
  signUpAdminController,
  signInAdminController,
} = require("../controllers/admin");

const router = express();

router.post("/signUp", validate.signUpAdmin, signUpAdminController);

router.post("/logIn", validate.signInAdmin, signInAdminController);

module.exports = router;
