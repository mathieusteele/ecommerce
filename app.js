const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
// const rootDir = require("./util/path");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;

const User = require("./models/user");

const app = express();

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");

app
  .use(express.static(path.join(__dirname, "public")))
  .use((req, res, next) => {
    User.findById("615d0a41f292bd4e09975e9b")
      .then((user) => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
      })
      .catch((err) => console.log(err));
  })
  // .set("views", path.join(__dirname, "views"))
  .set("views", "views")
  .set("view engine", "ejs")
  .use(bodyParser.urlencoded({ extended: false }))
  .use(shopRoutes)
  .use("/admin", adminRoutes)
  .use(errorController.get404)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

mongoConnect(() => {
  app.listen(3000);
});
