const path = require("path");
const express = require("express");

const router = express.Router();

const books = [];
const errors = [];

router.get("/", (req, res, next) => {
  res.render("pages/books", {
    title: "Books",
    path: "/books",
    books: books,
    errors: errors,
  });
});

router.get("/add-product", (req, res, next) => {
  res.render("pages/add-product", {
    title: "Add Product",
    path: "/add-product",
    errors: errors,
  });
});

router.post("/add-product", (req, res, next) => {
  if (books.includes({ title: req.body.title, author: req.body.author })) {
    errors.push(
      `Error! A book with the name "${req.body.title}" and author ${req.body.title} already exists.`
    );
    res.writeHead(302, { Location: "/add-product" });
    res.end();
  } else {
    books.push({ title: req.body.title, author: req.body.author });
    res.writeHead(302, { Location: "/books" });
    res.end();
  }
});

router.get("/edit-product", (req, res, next) => {
  res.render("pages/edit-product", {
    title: "Edit Product",
    path: "/edit-product",
    productTitle: req.query.title,
    productAuthor: req.query.author,
    errors: errors,
  });
});

router.post("/edit-product", (req, res, next) => {
  productIndex = books.findIndex(
    (book) =>
      book.title === req.body.oldTitle && book.author === req.body.oldAuthor
  );

  books[productIndex].title = req.body.newTitle;
  books[productIndex].author = req.body.newAuthor;

  res.writeHead(302, { Location: "/books" });
  res.end();
});

router.get("/remove-product", (req, res, next) => {
  res.render("pages/remove-product", {
    title: "Delete Product",
    path: "/delete-product",
    productTitle: req.query.title,
    productAuthor: req.query.author,
    errors: errors,
  });
});

router.post("/remove-product", (req, res, next) => {
  productIndex = books.findIndex(
    (book) =>
      book.title === req.body.oldTitle && book.author === req.body.oldAuthor
  );

  books.splice(productIndex, 1);

  res.writeHead(302, { Location: "/books" });
  res.end();
});

router.post("/clear-error", (req, res, next) => {
  if (errors.includes(req.body.error)) {
    position = errors.indexOf(req.body.error);

    errors.splice(position, 1);
  }

  res.writeHead(302, { Location: "/books/" });
  res.end();
});

module.exports = router;
