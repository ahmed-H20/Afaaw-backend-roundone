const express = require("express");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../utils/validators/user.validator");

const router = express.Router();

router
  .route("/")
  .get(authenticate, authorize("admin"), getAllUsers)
  .post(authenticate, authorize("admin"), createUserValidator, createUser);
router
  .route("/:id")
  .get(authenticate, getUserValidator, getUserById)
  .patch(authenticate, authorize("admin"), updateUserValidator, updateUser)
  .delete(authenticate, authorize("admin"), deleteUserValidator, deleteUser);

module.exports = router;
