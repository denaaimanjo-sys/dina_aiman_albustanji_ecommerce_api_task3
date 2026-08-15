const { body, param } = require("express-validator");

const categoryIdValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer")
];

const createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ max: 100 })
    .withMessage("Category name must not exceed 100 characters"),

  body("description")
    .optional({ nullable: true })
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters")
];

const updateCategoryValidator = [
  ...categoryIdValidator,

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ max: 100 })
    .withMessage("Category name must not exceed 100 characters"),

  body("description")
    .optional({ nullable: true })
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("is_active")
    .isBoolean()
    .withMessage("is_active must be true or false")
];

module.exports = {
  categoryIdValidator,
  createCategoryValidator,
  updateCategoryValidator
};