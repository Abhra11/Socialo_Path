const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// register/signUp
router.post("/register", async (req, res) => {
  try {
    //salt and hash the password using bcrypt
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    //find the email for login
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("Users not found");

    //compare the hashed password
    const valid = await bcrypt.compare(req.body.password, user.password);
    !valid && res.status(400).json("Wrong Password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
