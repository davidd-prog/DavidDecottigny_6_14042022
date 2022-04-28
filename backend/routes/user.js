const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const validateEmail = require("../middleware/validate_email");
const validatePassword = require("../middleware/validate_password");

router.post("/signup", validateEmail, validatePassword, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
