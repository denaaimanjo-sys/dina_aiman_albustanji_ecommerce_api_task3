const { body, param } = require("express-validator");

const productIdValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Product ID must be a positive integer")
];

const createProductValidator = [
  body("category_id")
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ max: 100 })
    .withMessage("Product name must not exceed 100 characters"),

  body("description")
    .optional({ nullable: true })
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than zero"),

  body("stock_quantity")
    .isInt({ min: 0 })
    .withMessage("Stock quantity cannot be negative"),

  body("sku")
    .trim()
    .notEmpty()
    .withMessage("SKU is required")
    .isLength({ max: 100 })
    .withMessage("SKU must not exceed 100 characters")
];

const updateProductValidator = [
  ...productIdValidator,

  body("category_id")
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ max: 100 })
    .withMessage("Product name must not exceed 100 characters"),

  body("description")
    .optional({ nullable: true })
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than zero"),

  body("stock_quantity")
    .isInt({ min: 0 })
    .withMessage("Stock quantity cannot be negative"),

  body("sku")
    .trim()
    .notEmpty()
    .withMessage("SKU is required")
    .isLength({ max: 100 })
    .withMessage("SKU must not exceed 100 characters"),

  body("is_active")
    .isBoolean()
    .withMessage("is_active must be true or false")
];

module.exports = {
  productIdValidator,
  createProductValidator,
  updateProductValidator
};