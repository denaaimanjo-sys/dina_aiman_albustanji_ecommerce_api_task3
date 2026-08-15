const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUserStatus
} = require("../controllers/usersController");
const {
  userIdValidator,
  createUserValidator,
  updateUserStatusValidator
} = require("../validators/usersValidator");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const authorizeUserAccess = require("../middleware/authorizeUserAccess");

const router = express.Router();

router.get("/", authenticate, authorize("admin"), getUsers);
router.get("/:id", authenticate, userIdValidator, validate, authorizeUserAccess, getUserById);
router.post("/", authenticate, authorize("admin"), createUserValidator, validate, createUser);
router.patch("/:id/status", authenticate, authorize("admin"), updateUserStatusValidator, validate, updateUserStatus);

module.exports = router;