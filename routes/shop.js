// const path = require("path");
const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.post("/add-to-cart", shopController.postAddToCart);
router.post("/cart-delete-item", shopController.postCartDeleteProduct);
router.get("/cart", shopController.getCart);
router.get("/checkout", shopController.getCheckout);
router.get("/orders", shopController.getOrders);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProductById);

module.exports = router;
