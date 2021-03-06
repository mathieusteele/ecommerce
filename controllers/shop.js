const Product = require("../models/product");
const Order = require("../models/order");

exports.getIndex = (req, res, next) => {
  res.render("shop/index", {
    title: "Steeles Meals",
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
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        title: "Menu",
        path: "/menu",
        products: products,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.product")
    .then((user) => {
      let subtotal = 0;

      user.cart.items.map((cartEntry) => {
        for (i = 0; i < cartEntry.quantity; i++) {
          subtotal += cartEntry.product.price * 100;
        }
      });
      res.render("shop/cart", {
        title: "Your Cart",
        path: "/cart",
        products: user.cart.items,
        subtotal: parseInt(subtotal) / 100,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postAddToCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postRemoveOneFromCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then((product) => {
      return req.user.removeOneFromCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user.removeFromCart(productId).then((result) => {
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id }).then((orders) => {
    res.render("shop/orders", {
      title: "Your Orders",
      path: "/orders",
      orders: orders,
    });
  });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.product")
    .then((user) => {
      let total = 0;

      user.cart.items.map((cartEntry) => {
        for (i = 0; i < cartEntry.quantity; i++) {
          total += cartEntry.product.price * 100;
        }
      });

      const products = user.cart.items.map((cartEntry) => {
        return {
          quantity: cartEntry.quantity,
          product: { ...cartEntry.product._doc },
        };
      });

      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products: products,
        total: parseInt(total) / 100,
      });

      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    title: "Checkout",
    path: "/checkout",
  });
};
