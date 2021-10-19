const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.get("/sign-up", authController.getSignUp);

router.post("/sign-up", authController.postSignUp);

router.get("/reset/:token", authController.getNewPassword);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
