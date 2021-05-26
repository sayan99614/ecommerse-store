exports.signOut = (req, res) => {
  res.json({ message: "signout successfully 👍" });
};
exports.signUp = (req, res) => {
  console.log(req.body);
  res.send(req.body);
};
