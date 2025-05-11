const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/forgot-password", userController.forgotPasswordUser);
router.post("/reset-password", userController.resetPasswordUser);

module.exports = router;
