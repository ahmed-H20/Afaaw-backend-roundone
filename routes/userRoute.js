const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const {
    createUserValidation,
    userIdValidation,
} = require("../utils/validators/userValidator");

const { createUser, getUserById } = require("../controllers/userController");

router.post("/", createUserValidation, validate, createUser);
router.get("/:id", userIdValidation, validate, getUserById);

module.exports = router;
