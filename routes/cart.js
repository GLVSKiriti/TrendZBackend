const Cart = require("../models/Cart");
const {
  verifyTokenAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/verifyToken");
const {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllUserCarts,
} = require("../controllers/cartControllers");

const router = require("express").Router();

//create
router.post("/", verifyToken, createCart);

//update
router.put("/:id", verifyTokenAuthorization, updateCart);

//delete
router.delete("/:id", verifyTokenAuthorization, deleteCart);

//get user cart
router.get("/find/:userId", verifyTokenAuthorization, getUserCart);

//get all user carts
router.get("/", verifyTokenAndAdmin, getAllUserCarts);

module.exports = router;
