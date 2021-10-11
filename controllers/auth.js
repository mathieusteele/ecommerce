const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    title: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("615fb0873f78780cf8470875")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
