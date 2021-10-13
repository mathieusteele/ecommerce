const express = require("express");

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", shopController.getIndex);

router.post("/add-to-cart", isAuth, shopController.postAddToCart);
router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);
router.get("/cart", isAuth, shopController.getCart);
// router.get("/checkout", shopController.getCheckout);
router.get("/orders", isAuth, shopController.getOrders);
router.post("/create-order", isAuth, shopController.postOrder);
router.get("/menu", shopController.getProducts);
router.get("/menu/:productId", shopController.getProductById);

module.exports = router;
