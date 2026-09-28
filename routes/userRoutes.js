const express = require("express");
const { createUserValidator } = require("../utils/Validations/UserValidation");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../services/userServices");

router.post("/", createUserValidator, createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
