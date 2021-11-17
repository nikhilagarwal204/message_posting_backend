const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/Userschema");
require("../db/conn");

router.post("/register", async (req, res) => {
  let { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.status(400).json({ error: "Please fill all the details" });
  }
  try {
    Password = await bcrypt.hash(Password, 12);
    const UserLogin = await User.findOne({ Email: Email });
    if (UserLogin) {
      res.json({ message: "This User ID already exist" });
    }
    const user = new User({ Email, Password });
    await user.save();
    res.status(200).send("User Registered Successfully");
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json({ error: "Please fill details" });
    }
    const UserLogin = await User.findOne({ Email: Email });
    if (UserLogin) {
      const token = jwt.sign(
        { Email: Email, Password: Password },
        process.env.SECRET_KEY
      );
      const isMatch = await bcrypt.compare(Password, UserLogin.Password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.status(200).json({ jwttoken: token });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
