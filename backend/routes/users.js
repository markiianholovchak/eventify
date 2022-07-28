const express = require("express");
const { loginUser, signupUser } = require("../controllers/usersController");

const router = express.Router();

// Login user
router.post("/login", loginUser);

// Sign up user
router.post("/signup", signupUser);

module.exports = router;
