const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {cartValidator} = require('../validations/index')
const verifyToken = require('../middleware/auth.middleware')  
const adminToken = require('../middleware/admin.middleware')  


router.get('/getAll',adminToken,controller.orderController.getAll)
router.get('/getUserOrder',verifyToken,controller.orderController.getByUsername)
router.post('/add',verifyToken,[cartValidator.validateUserQuery()], controller.orderController.addOrder)
router.post('/complate',adminToken,[cartValidator.validateId()], controller.orderController.complateOrder)

module.exports ={
    order: router
}