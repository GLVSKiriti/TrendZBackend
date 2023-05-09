const { updateUser, deleteUser } = require("../controllers/userControllers");
const {
  verifyTokenAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

//updateuser
router.put("/:id", verifyTokenAuthorization, updateUser);

//deleteuser

router.delete("/:id", verifyTokenAuthorization, deleteUser);

module.exports = router;
