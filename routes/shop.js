// const path = require("path");
const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.post("/add-to-cart", shopController.postAddToCart);
router.get("/cart", shopController.getCart);
router.get("/checkout", shopController.getCheckout);
router.get("/orders", shopController.getOrders);
router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProductById);

// router.get("/", (req, res, next) => {
//   res.render("index", {
//     title: "Home",
//     path: "/",
//   });
// });

module.exports = router;
