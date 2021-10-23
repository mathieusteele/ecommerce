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
    body("title")
      .isString()
      .isLength({ min: 3 })
      .trim()
      .withMessage("the title must be at least 3 characters long"),
    body("imageUrl")
      .isURL()
      .withMessage(
        "The image URL is a required field and did not contain a valid URL."
      ),
    body("price")
      .isFloat()
      .withMessage("The price was not valid. Please try again."),
    body("description")
      .isLength({ min: 5, max: 400 })
      .trim()
      .withMessage("The description must be between 5 and 400 characters."),
  ],
  isAuth,
  adminController.postAddProduct
);
router.get("/edit-entree/:productId", isAuth, adminController.getEditProduct);
router.post(
  "/edit-entree",
  [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .trim()
      .withMessage("the title must be at least 3 characters long"),
    body("imageUrl")
      .isURL()
      .withMessage(
        "The image URL is a required field and did not contain a valid URL."
      ),
    body("price")
      .isFloat()
      .withMessage("The price was not valid. Please try again."),
    body("description")
      .isLength({ min: 5, max: 400 })
      .trim()
      .withMessage("The description must be between 5 and 400 characters."),
  ],
  isAuth,
  adminController.postEditProduct
);
router.post("/delete-entree", isAuth, adminController.postDeleteProduct);

module.exports = router;
