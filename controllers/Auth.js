const User = require("../models/User");
const Jwt = require("jsonwebtoken");
const Expressjwt = require("express-jwt");
const { validationResult } = require("express-validator");
exports.signOut = (req, res) => {
  res.json({ message: "signout successfully 👍" });
};
exports.signUp = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = {
        errmsg: errors.array(),
      };
      return res.status(422).json(err);
    }

    const user = new User(req.body);
    await user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          err: "data could not be inserted please check your request",
        });
      }
      res.status(201).json({
        message: `${user.name} you have successfully registered into the system`,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.signIn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ error: "user email doesnot exist" });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "email and password mismatched" });
    }
    const token = Jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: {
        _id,
        name,
        email,
        role,
      },
    });
  } catch (error) {}
};
