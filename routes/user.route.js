const express = require("express");

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const validate = require("../middleware/validate.middleware");
const {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} = require("../validations/user.validation");

const router = express.Router();

router
  .route("/")
  .post(validate(createUserSchema), createUser)
  .get(getAllUsers);

router
  .route("/:id")
  .get(validate(userIdSchema), getUserById)
  .put(validate(updateUserSchema), updateUser)
  .delete(validate(userIdSchema), deleteUser);

module.exports = router;