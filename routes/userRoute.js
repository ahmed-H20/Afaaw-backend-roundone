const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../services/userService");
const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../utils/validators/user.validator");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUserById)
  .patch(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
