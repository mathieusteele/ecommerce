// const path = require("path");
const express = require("express");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/menu", isAuth, adminController.getProducts);

router.get("/add-entree", isAuth, adminController.getAddProduct);
router.post("/add-entree", isAuth, adminController.postAddProduct);
router.get("/edit-entree/:productId", isAuth, adminController.getEditProduct);
router.post("/edit-entree", isAuth, adminController.postEditProduct);
router.post("/delete-entree", isAuth, adminController.postDeleteProduct);

module.exports = router;
