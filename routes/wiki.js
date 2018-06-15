const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { Page } = require("../models");
const { addPage } = require("../views");
const randomWords = require("random-words");

function generateSlug(str) {
  if (!str) {
    let result = randomWords({min:2, max:5});
    result = result.replace(/\s+/g, "_").replace(/\W/g, '');
  } else {
  const result = str.replace(/\s+/g, "_").replace(/\W/g, '');
  }
  return result;
}

router.use(bodyParser({extended: false}));
router.get("/", (req, res) => {
  res.send("GET WIKI PAGES");
});

router.post("/", async (req, res) => {
  const page = new Page({
      title: req.body.title,
      content: req.body.pagecontent
  });

  try {
    await page.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }

});

router.get("/add", (req, res) => {
  res.send(addPage());
});

module.exports = router;
