const User = require("../model/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { user, pass } = req.body;
  if (!user || !pass)
    return res.status(400).json({ message: "Invalid user and password" });

  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate)
    return res.status(409).json({ message: "User already exists" }); //conflict

  try {
    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = await User.create({
      username: user,
      password: hashedPassword,
    });

    console.log(newUser);

    res.status(201).json({ success: `New user ${user} created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { registerUser };
