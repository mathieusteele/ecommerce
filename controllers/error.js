exports.get404 = (req, res, next) => {
  res.render("404", {
    title: "404 - Page Not Found",
    path: "/404",
    requestedPath: req.url,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
};
