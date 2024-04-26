const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const fsPromises = require("fs").promises;
const path = require("path");

const registerUser = async (req, res) => {
  const { user, pass } = req.body;
  if (!user || !pass)
    return res.status(400).json({ message: "Invalid user and password" });

  const duplicate = usersDB.users.find((DBuser) => DBuser.user === user);

  if (duplicate)
    return res.status(409).json({ message: "User already exists" }); //conflict

  try {
    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = {
      user: user,
      roles: {
        User: 2001,
      },
      pass: hashedPassword,
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users),
      "\n"
    );

    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { registerUser };
