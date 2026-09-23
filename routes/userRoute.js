const express = require("express");
const userRouter = express.Router();
const validate = require("../middlewares/validation.middleware");
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

userRouter.post("/",validate(createUserSchema), createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id",  validate(userIdSchema), getUserById);
userRouter.put("/:id", validate(updateUserSchema),updateUser);
userRouter.delete("/:id",validate(userIdSchema), deleteUser);

module.exports = userRouter;
