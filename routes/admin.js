// const path = require("path");
const express = require("express");
const { body } = require("express-validator");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/menu", isAuth, adminController.getProducts);

router.get("/add-entree", isAuth, adminController.getAddProduct);
router.post(
  "/add-entree",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postAddProduct
);
router.get("/edit-entree/:productId", isAuth, adminController.getEditProduct);
router.post(
  "/edit-entree",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postEditProduct
);
router.post("/delete-entree", isAuth, adminController.postDeleteProduct);

module.exports = router;
