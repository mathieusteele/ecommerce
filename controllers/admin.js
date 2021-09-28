const Product = require("../models/product");

const errors = [];

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      title: "Admin Products",
      path: "/admin/products",
      products: products,
      errors: [],
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    title: "Add Product",
    path: "/add-product",
    errors: errors,
  });
};

exports.postAddProduct = (req, res, next) => {
  Product.fetchAll((products) => {
    if (products.includes({ title: req.body.title, author: req.body.author })) {
      errors.push(
        `Error! A book with the name "${req.body.title}" and author ${req.body.title} already exists.`
      );
      res.writeHead(302, { Location: "/admin/add-product" });
      res.end();
    } else {
      const title = req.body.title;
      const author = req.body.author;
      const imageUrl = req.body.imageUrl;
      const description = req.body.description;
      const price = req.body.price;

      const product = new Product(title, author, imageUrl, description, price);
      product.save();
      res.writeHead(302, { Location: "/admin/products" });
      res.end();
    }
  });
};

exports.getEditProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    title: "Edit Product",
    path: "/edit-product",
    productTitle: req.query.title,
    productAuthor: req.query.author,
    errors: errors,
  });
};

exports.postEditProduct = (req, res, next) => {
  Product.fetchAll((products) => {
    productIndex = products.findIndex(
      (book) =>
        book.title === req.body.oldTitle && book.author === req.body.oldAuthor
    );

    products[productIndex].title = req.body.newTitle;
    products[productIndex].author = req.body.newAuthor;

    res.writeHead(302, { Location: "/admin/products" });
    res.end();
  });
};

exports.getRemoveProduct = (req, res, next) => {
  res.render("admin/remove-product", {
    title: "Delete Product",
    path: "/delete-product",
    productTitle: req.query.title,
    productAuthor: req.query.author,
    errors: errors,
  });
};

exports.postRemoveProduct = (req, res, next) => {
  const products = Product.fetchAll();

  productIndex = products.findIndex(
    (book) =>
      book.title === req.body.oldTitle && book.author === req.body.oldAuthor
  );

  products.splice(productIndex, 1);

  res.writeHead(302, { Location: "/admin" });
  res.end();
};

exports.postRemoveError = (req, res, next) => {
  if (errors.includes(req.body.error)) {
    position = errors.indexOf(req.body.error);

    errors.splice(position, 1);
  }

  res.writeHead(302, { Location: "/admin" });
  res.end();
};
