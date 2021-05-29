const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { signOut, signUp, signIn } = require("../controllers/Auth");

router.get("/", signOut);
router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 characters"),
    check("lastname")
      .isLength({ min: 3 })
      .withMessage("you must provide a lastname"),
    check("email")
      .isEmail()
      .withMessage("email should be in proper format eg: example@gmail.com"),
    check("password")
      .isLength({ min: 8, max: 15 })
      .isStrongPassword()
      .withMessage(
        "Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  ],
  signUp
);

router.post(
  "/signin",
  [
    check("email")
      .isEmail()
      .withMessage("email should be in proper format eg: example@gmail.com"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("password should not be empty")
      .isStrongPassword()
      .withMessage("please change your password as soon as possible"),
  ],
  signIn
);

module.exports = router;
