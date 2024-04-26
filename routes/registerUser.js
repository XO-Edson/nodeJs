const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/registerControler");

router.post("/", registerUser);

module.exports = router;
