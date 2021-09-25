const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const rootDir = require("./util/path");

const router = express.Router();

const app = express();

const indexRoutes = require("./routes/index");
const bookRoutes = require("./routes/books");

app
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .use(bodyParser.urlencoded({ extended: false }))
  .use("/", indexRoutes)
  .use("/books", bookRoutes)
  .use((req, res, next) => {
    res.render("pages/404", { title: "404 - Page Not Found", path: req.url });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
