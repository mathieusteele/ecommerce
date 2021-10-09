const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
// const rootDir = require("./util/path");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");

const User = require("./models/user");

const app = express();

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const dotenv = require("dotenv");

dotenv.config();

const cors = require("cors");

const corsOptions = {
  origin: "https://serene-atoll-95168.herokuapp.com/",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  family: 4,
};

const MONGODB_URL = process.env.MONGODB_URL;

app
  .use(express.static(path.join(__dirname, "public")))
  .use((req, res, next) => {
    User.findById("615fb0873f78780cf8470875")
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => console.log(err));
  })
  .set("views", path.join(__dirname, "views"))
  .set("views", "views")
  .set("view engine", "ejs")
  .use(bodyParser.urlencoded({ extended: false }))
  .use(shopRoutes)
  .use("/admin", adminRoutes)
  .use(errorController.get404)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

mongoose
  .connect(process.env.MONGODB_URL, options)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Mathieu",
          email: "matt@steeleagency.com",
          cart: { items: [] },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => console.log(err));
