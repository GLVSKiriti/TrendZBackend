const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.updateUser = async (req, res) => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        res.status(500).json({
          error: "Internal Server Error",
        });
      }
      req.body.password = hash;
    });
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updateUser === null) {
      res.status(404).json({
        error: "UserId not found",
      });
    } else {
      res.status(200).json({
        message: "User updated sucessfully",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Has Been Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
