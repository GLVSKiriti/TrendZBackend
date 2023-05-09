const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register route

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  var user = await User.findOne({ username: req.body.username });
  if (user === null) {
    user = await User.findOne({ email: req.body.email });
    if (user === null) {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        try {
          if (err) {
            console.log(err);
            res.status(500).json(err);
          }
          newUser.password = hash;
          const savedUser = await newUser.save();
          res.status(201).json(savedUser);
        } catch (err) {
          res.status(500).json(err);
        }
      });
    } else {
      res.status(401).json({
        error: "Email already exists",
      });
    }
  } else {
    res.status(401).json({
      error: "Username already exists",
    });
  }
});

//login route

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) {
      res.status(401).json({ error: "Wrong Credentials" });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "3d" }
          );

          res.status(200).json({
            message: "Succefully Login",
            token,
          });
        } else {
          res.status(401).json({
            error: "Wrong Password",
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
    });
  }
});

module.exports = router;
