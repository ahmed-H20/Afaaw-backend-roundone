const express = require("express");
const {
  getAllCarts,
  getOneCartByLoggedUser,
  addProduct,
  removeProduct,
  changeProductQuantity,
} = require("../services/cartService");

const router = express.Router();

router.get("/", getAllCarts);
router.get(":id", getOneCartByLoggedUser);
router.post("/", addProduct);
router.patch("/", changeProductQuantity);
router.delete("/", removeProduct);

module.exports = router;
