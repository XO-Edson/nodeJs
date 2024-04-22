const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/subdir", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});

router.get("/next(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "next.html"));
});

module.exports = router;
