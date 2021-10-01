// const path = require("path");
const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/menu", adminController.getProducts);

router.get("/add-entree", adminController.getAddProduct);
router.post("/add-entree", adminController.postAddProduct);
router.get("/edit-entree/:productId", adminController.getEditProduct);
router.post("/edit-entree", adminController.postEditProduct);
router.post("/delete-entree", adminController.postDeleteProduct);

module.exports = router;
