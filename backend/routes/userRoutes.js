const express = require('express');
const router  = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware')

router.post('/',userController.registerUser)
router.post('/login',userController.loginUser)
router.get('/me',auth.protect,userController.getMe)




module.exports=router