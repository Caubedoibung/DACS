const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/login", adminController.loginAdmin);
router.post("/change-password", adminController.changePassword);
router.post("/forgot-password", adminController.forgotPasswordAdmin);
router.post("/reset-password", adminController.resetPasswordAdmin);

module.exports = router;
