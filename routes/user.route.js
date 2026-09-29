const express = require("express");

const {
  createUser,
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateCurrentUser,
  deleteUser,
} = require("../controllers/user.controller");
const validate = require("../middleware/validate.middleware");
const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const {
  createUserSchema,
  updateUserSchema,
  updateProfileSchema,
  userIdSchema,
} = require("../validations/user.validation");
const roles = require("../constants/roles");

const router = express.Router();

router
  .route("/")
  .post(protect, authorize(roles.ADMIN), validate(createUserSchema), createUser)
  .get(protect, authorize(roles.ADMIN), getAllUsers);

router.get("/me", protect, getCurrentUser);
router.put("/me", protect, validate(updateProfileSchema), updateCurrentUser);

router
  .route("/:id")
  .get(protect, authorize(roles.ADMIN), validate(userIdSchema), getUserById)
  .put(protect, authorize(roles.ADMIN), validate(updateUserSchema), updateUser)
  .delete(protect, authorize(roles.ADMIN), validate(userIdSchema), deleteUser);

module.exports = router;
