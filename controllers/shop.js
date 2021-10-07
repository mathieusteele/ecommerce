const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  res.render("shop/index", {
    title: "Steele's Meals",
    path: "/",
  });
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        title: "Entrée Details",
        path: "/menu",
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        title: "Menu",
        path: "/menu",
        products: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      let subtotalInCents = 0;

      products.map((product) => {
        subtotalInCents += product.priceInCents * product.quantity;
      });
      res.render("shop/cart", {
        title: "Your Cart",
        path: "/cart",
        products: products,
        subtotalInCents: subtotalInCents,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddToCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      // console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user.deleteItemFromCart(productId).then((result) => {
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders().then((orders) => {
    res.render("shop/orders", {
      title: "Your Orders",
      path: "/orders",
      orders: orders,
    });
  });
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    title: "Checkout",
    path: "/checkout",
  });
};
