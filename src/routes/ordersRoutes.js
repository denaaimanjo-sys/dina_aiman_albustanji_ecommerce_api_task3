const express = require("express");
const {
  getOrders,
  getOrderById
} = require("../controllers/ordersController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/", authenticate, getOrders);
router.get("/:id", authenticate, getOrderById);

module.exports = router;