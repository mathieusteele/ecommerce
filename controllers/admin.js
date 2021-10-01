const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/menu", {
      title: "Manage Menu",
      path: "/admin/menu",
      products: products,
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    title: "Add Entrée",
    path: "/admin/add-entree",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.writeHead(302, { Location: "/admin/menu" });
  res.end();
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      title: "Edit Product",
      path: "/admin/edit-entree",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedImageUrl = req.body.imageUrl;

  const updatedProduct = new Product(
    productId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
  );

  updatedProduct.save();
  res.redirect("/admin/menu");
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.deleteById(productId);
  res.redirect("/admin/menu");
};
