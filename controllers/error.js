exports.get404 = (req, res, next) => {
  res.render("404", {
    title: "404 - Page Not Found",
    path: "/404",
    requestedPath: req.url,
    isAuthenticated: req.session.user,
  });
};
