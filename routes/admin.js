// const path = require("path");
const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

// router.get("/", adminController.getProducts);

router.get("/products", adminController.getProducts);

router.get("/add-product", adminController.getAddProduct);
router.post("/add-product", adminController.postAddProduct);
router.get("/edit-product", adminController.getEditProduct);
router.post("/edit-product", adminController.postEditProduct);
router.get("/remove-product", adminController.getRemoveProduct);
router.post("/remove-product", adminController.postRemoveProduct);
router.post("/clear-error", adminController.postRemoveError);

module.exports = router;
