const express = require("express");
const { createUserValidator } = require("../utils/Validations/UserValidation");
const router = express.Router();
const { protect } = require("../services/authService");
const multer = require("multer");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  unActiveUser,
  activeUser,
} = require("../services/userServices");

const upload = multer({ dest: "uploads/users" });

router.use(protect);

router.post(
  "/",
  upload.single("profileImage"),
  createUserValidator,
  createUser,
);
router.get("/", getAllUsers);

// loged user data
router.get("/me", getLoggedUserData, getUserById);
router.put("/updateMyPassword", updateLoggedUserPassword);
router.put("/updateMe", updateLoggedUserData);
router.put("/unActiveMe", unActiveUser);
router.put("/activeMe", activeUser);

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
