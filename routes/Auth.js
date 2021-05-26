const express = require("express");
const router = express.Router();
const { signOut, signUp } = require("../controllers/Auth");

router.get("/", signOut);
router.post("/signup", signUp);

module.exports = router;
