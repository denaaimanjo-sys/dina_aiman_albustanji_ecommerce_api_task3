const { body, param } = require("express-validator");

const userIdValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("User ID must be a positive integer")
];

const createUserValidator = [
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

  body("phone")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 30 })
    .withMessage("Phone must not exceed 30 characters"),

  body("role")
    .optional()
    .isIn(["customer", "admin"])
    .withMessage("Role must be customer or admin")
];

const updateUserStatusValidator = [
  ...userIdValidator,

  body("is_active")
    .isBoolean()
    .withMessage("is_active must be true or false")
];

module.exports = {
  userIdValidator,
  createUserValidator,
  updateUserStatusValidator
};