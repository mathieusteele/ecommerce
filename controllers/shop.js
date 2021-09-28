const Product = require("../models/product");

const errors = [];

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      title: "All Products",
      path: "/products",
      products: products,
      errors: [],
    });
  });
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId, (product) => {
    console.log(product);

    res.render("shop/product-detail", {
      title: "Product Details",
      path: "/products",
      product: product,
      errors: [],
    });
  });

  // res.redirect("/");

  // Product.fetchAll((products) => {
  //   res.render("shop/product-list", {
  //     title: "All Products",
  //     path: "/products",
  //     products: products,
  //     errors: [],
  //   });
  // });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      title: "Shop",
      path: "/",
      products: products,
      errors: [],
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    title: "Your Cart",
    path: "/cart",
  });
};

exports.postAddToCart = (req, res, next) => {
  const productId = req.body.productId;
  console.log(productId);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    title: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    title: "Checkout",
    path: "/checkout",
  });
};
