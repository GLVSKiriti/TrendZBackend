const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require("../controllers/userControllers");
const {
  verifyTokenAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

//updateuser
router.put("/:id", verifyTokenAuthorization, updateUser);

//deleteuser
router.delete("/:id", verifyTokenAuthorization, deleteUser);

//getuser
router.get("/find/:id", verifyTokenAndAdmin, getUser);

//getalluser
router.get("/findall", verifyTokenAndAdmin, getAllUsers);

module.exports = router;
