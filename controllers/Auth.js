const User = require("../models/User");
exports.signOut = (req, res) => {
  res.json({ message: "signout successfully 👍" });
};
exports.signUp = async (req, res) => {
  try {
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
