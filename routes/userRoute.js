const express = require("express");
const userRouter = express.Router();

const validate = require("../middlewares/validation.middleware");
const { protect, allowedTo } = require("../middlewares/auth.middleware");

const {
  createUserSchema,
  userIdSchema,
  updateUserSchema,
} = require("../validations/user.validation");

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../services/userService");

// Admin only: create a new user and list all users
userRouter.post(
  "/",
  protect,
  allowedTo("admin"),
  validate(createUserSchema),
  createUser
);

userRouter.get("/", protect, allowedTo("admin"), getAllUsers);

// Authenticated user/admin routes
userRouter.get("/:id", protect, validate(userIdSchema), getUserById);
userRouter.put("/:id", protect, validate(updateUserSchema), updateUser);

// Admin only: delete a user
userRouter.delete(
  "/:id",
  protect,
  allowedTo("admin"),
  validate(userIdSchema),
  deleteUser
);

module.exports = userRouter;
