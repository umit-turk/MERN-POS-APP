const User = require("../models/User.js");
const express = require("express");
const router = express.Router();
const bcrytp = require("bcryptjs");

//register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrytp.genSalt(10);
    const hashedPassword = await bcrytp.hash(password, salt);
    const newUser = new User({
        username,
        email,
        password:hashedPassword,
    })
    await newUser.save();
    res.status(200).json("A new user created successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
