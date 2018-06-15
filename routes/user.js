const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("GET USER PAGES");
});

router.post("/", (req, res) => {
  res.send("POST USER PAGES");
});

router.get("/add", (req, res) => {
  res.send("ADD A USER PAGE FORM");
});

module.exports = router;
