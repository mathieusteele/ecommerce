const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const dotenv = require("dotenv");
dotenv.config();

const errorController = require("./controllers/error");
const User = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: "sessions",
});

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

app
  .use(express.static(path.join(__dirname, "public")))
  .use(
    session({
      secret: process.env.SESSION_SECRET || "default secret",
      resave: false,
      saveUninitialized: false,
      store: store,
    })
  )
  .use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => console.log(err));
    // User.findById("615fb0873f78780cf8470875")
    //   .then((user) => {
    //     req.user = user;
    //     next();
    //   })
    //   .catch((err) => console.log(err));
  })
  .set("views", path.join(__dirname, "views"))
  .set("views", "views")
  .set("view engine", "ejs")
  .use(bodyParser.urlencoded({ extended: false }))
  .use(shopRoutes)
  .use("/admin", adminRoutes)
  .use(authRoutes)
  .use(errorController.get404);

mongoose
  .connect(MONGODB_URL, options)
  .then((result) => {
    // User.findOne().then((user) => {
    //   if (!user) {
    //     const user = new User({
    //       name: "Mathieu",
    //       email: "matt@steeleagency.com",
    //       cart: { items: [] },
    //     });
    //     user.save();
    //   }
    // });
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
