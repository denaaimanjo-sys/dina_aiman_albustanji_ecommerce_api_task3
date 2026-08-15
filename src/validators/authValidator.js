const { body } = require("express-validator");

const registerValidator = [
  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ max: 100 })
    .withMessage("Full name must not exceed 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be between 8 and 100 characters"),

  body("role")
    .optional()
    .isIn(["customer", "admin"])
    .withMessage("Role must be customer or admin")
];

const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
];

module.exports = {
  registerValidator,
  loginValidator
};