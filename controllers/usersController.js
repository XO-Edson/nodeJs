const Users = require("../model/User");

const getUsers = async (req, res) => {
  const usersList = await Users.find();

  if (!usersList) return res.status(204).json({ message: "No users found" });

  res.json(usersList);
};

const deleteUser = async (req, res) => {
  if (!req?.body.id)
    return res
      .status(401)
      .json({ message: `User ID ${req.body.id} does not exist` });

  const foundUser = await Users.findOne({ _id: req.body.id }).exec();

  const result = await foundUser.deleteOne();

  res.json(result, foundUser);
};

module.exports = { getUsers, deleteUser };
