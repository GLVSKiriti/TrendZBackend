const Product = require("../models/Product");
const {
  verifyTokenAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

const router = require("express").Router();

//create
router.post("/", verifyTokenAndAdmin, createProduct);

//update
router.put("/:id", verifyTokenAndAdmin, updateProduct);

//delete
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

module.exports = router;
