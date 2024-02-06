const express = require('express')
const router  = express.Router()
const goalController = require('../controllers/goalController')
const auth = require('../middleware/authMiddleware')


router.get('/',auth.protect,goalController.getGoal)
router.post('/',auth.protect,goalController.setGoal)
router.put('/:id',auth.protect,goalController.updateGoal)
router.delete('/:id',auth.protect,goalController.deleteGoal)


module.exports= router