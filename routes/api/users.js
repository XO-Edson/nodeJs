const express = require("express");
const router = express.Router();
const { getUsers, deleteUser } = require("../../controllers/usersController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), getUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

module.exports = router;
