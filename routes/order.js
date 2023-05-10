const Order = require("../models/Order");
const {
  verifyTokenAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/verifyToken");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getAllOrders,
  Income,
} = require("../controllers/orderController");
const router = require("express").Router();

//create
router.post("/", verifyToken, createOrder);

//update
router.put("/:id", verifyTokenAndAdmin, updateOrder);

//delete
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

//get order details
router.get("/find/:userId", verifyTokenAuthorization, getUserOrder);

//get all order details
router.get("/", verifyTokenAndAdmin, getAllOrders);

//get monthly income
router.get("/income", verifyTokenAndAdmin, Income);

module.exports = router;
