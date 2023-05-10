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

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) {
      res.status(404).json({
        error: "There is no user with that id",
      });
    } else {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllUsers = async (req, res) => {
  const query = req.query.new || false;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUserStats = async (req, res) => {
  const date = new Date();
  const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastyear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
