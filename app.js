const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const layout = require("./views/layout");
const models = require("./models");
const wiki = require("./routes/wiki");
const user = require("./routes/user");

app.get("/", (req, res) => {
  res.send(layout());
});

app.use("/wiki", wiki);
app.use("/user", user);
app.use(express.static(__dirname + "/public"));

const init = async () => {
  // await db.Page.sync();
  // await db.User.sync();
    await models.db.sync();

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

init();


