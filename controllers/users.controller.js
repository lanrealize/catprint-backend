const User = require("../models/users.model");

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findOne({ openID: req.params.openID });
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function deleteUser(req, res) {
  try {
    await User.deleteOne({ openID: req.params.openID });
    res
      .status(204)
      .json({ message: `User with id: ${req.params.openID} deleted` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function createUser(req, res) {
  try {
    const user = await User.findOne({ openID: req.params.openID });
    if (user) {
      res
      .status(200)
      .json({ id: req.params.openID });
    } else {
      User.create({ openID: req.params.openID });
      res
        .status(201)
        .json({ id: req.params.openID });
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  deleteUser: deleteUser,
  createUser: createUser,
};
