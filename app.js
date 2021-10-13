const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
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

const csrfProtection = csrf({});

const cors = require("cors");
const corsOptions = {
  origin: "https://serene-atoll-95168.herokuapp.com/",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app
  .set("view engine", "ejs")
  // .set("views", path.join(__dirname, "views"))
  .set("views", "views")
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, "public")))
  .use(
    session({
      secret: process.env.SESSION_SECRET || "default secret",
      resave: false,
      saveUninitialized: false,
      store: store,
    })
  )
  .use(csrfProtection)
  .use(flash())
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
  })
  .use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
  })
  .use("/admin", adminRoutes)
  .use(shopRoutes)
  .use(authRoutes)
  .use(errorController.get404);

const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  family: 4,
};

mongoose
  .connect(MONGODB_URL, mongooseOptions)
  .then((result) => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
