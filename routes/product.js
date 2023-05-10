const Product = require("../models/Product");
const {
  verifyTokenAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/productControllers");

const router = require("express").Router();

//create
router.post("/", verifyTokenAndAdmin, createProduct);

//update
router.put("/:id", verifyTokenAndAdmin, updateProduct);

//delete
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//get Product
router.get("/find/:id", getProduct);

//getAllProduct
router.get("/", getAllProducts);
module.exports = router;
