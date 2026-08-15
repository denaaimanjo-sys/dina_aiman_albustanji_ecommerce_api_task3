const express = require("express");
const {
  register,
  login,
  me
} = require("../controllers/authController");
const {
  registerValidator,
  loginValidator
} = require("../validators/authValidator");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const { loginLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginLimiter, loginValidator, validate, login);
router.get("/me", authenticate, me);

module.exports = router;