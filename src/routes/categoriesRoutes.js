const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoriesController");
const {
  categoryIdValidator,
  createCategoryValidator,
  updateCategoryValidator
} = require("../validators/categoriesValidator");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", categoryIdValidator, validate, getCategoryById);
router.post("/", authenticate, authorize("admin"), createCategoryValidator, validate, createCategory);
router.put("/:id", authenticate, authorize("admin"), updateCategoryValidator, validate, updateCategory);
router.delete("/:id", authenticate, authorize("admin"), categoryIdValidator, validate, deleteCategory);

module.exports = router;