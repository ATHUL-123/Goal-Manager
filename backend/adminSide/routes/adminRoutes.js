const express = require("express");
const router = express.Router();
const { register} = require("../../controllers/userController");
const { protect } = require("../middleware/adminAuthMiddleware");

const adminController = require("../controllers/adminController");

router.post("/login",adminController.postAdminLogin);
router.get("/",protect,adminController.getUsersList);
// router.post("/addUser",protect,register);
// router.delete("/:userId",protect,adminController.deleteUser)
// router.put("/:userId",protect,adminController.editUser)
// router.post("/search",protect,adminController.searchUser);
// router.post('/block', protect,adminController.userBlock)
// router.post('/unblock', protect,adminController.userUnBlock)

module.exports = router;