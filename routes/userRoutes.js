const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {
  createUserSchema,
  updateUserSchema,
  userParams,
} = require("../validations/user.validation");

router.post("/", validate({ body: createUserSchema }), createUser);
router.get("/", getAllUsers);
router.get("/:id", validate({ params: userParams }), getUserById);
router.put(
  "/:id",
  validate({ params: userParams, body: updateUserSchema }),
  updateUser,
);
router.delete("/:id", validate({ params: userParams }), deleteUser);

module.exports = router;
