const express = require("express");
const router = express.Router();
const {
  createUserValidation,
  updateUserValidation,
  userIdValidation,
} = require("../utils/validations/userValidation");

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../services/userService");

router.post("/", createUserValidation, createUser);
router.get("/", getAllUsers);
router.get("/:id", userIdValidation, getUserById);
router.put("/:id", userIdValidation, updateUserValidation, updateUser);
router.delete("/:id", userIdValidation, deleteUser);

module.exports = router;
