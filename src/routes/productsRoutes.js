const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deactivateProduct,
  deleteProduct
} = require("../controllers/productsController");
const {
  productIdValidator,
  createProductValidator,
  updateProductValidator
} = require("../validators/productsValidator");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", productIdValidator, validate, getProductById);
router.post("/", authenticate, authorize("admin"), createProductValidator, validate, createProduct);
router.put("/:id", authenticate, authorize("admin"), updateProductValidator, validate, updateProduct);
router.patch("/:id/deactivate", authenticate, authorize("admin"), productIdValidator, validate, deactivateProduct);
router.delete("/:id", authenticate, authorize("admin"), productIdValidator, validate, deleteProduct);

module.exports = router;