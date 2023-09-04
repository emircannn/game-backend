const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {cartValidator} = require('../validations/index')
const verifyToken = require('../middleware/auth.middleware')  
const adminToken = require('../middleware/admin.middleware')  


router.get('/getAll',adminToken,controller.cartController.getAll)
router.get('/cartCount',verifyToken, controller.cartController.cartCount)
router.get('/getUserCart',verifyToken,[cartValidator.validateId()],controller.cartController.getUserCart)
router.post('/add',verifyToken,[cartValidator.validateAdd()], controller.cartController.addToCart)
router.post('/delete',verifyToken,[cartValidator.validateAdd()], controller.cartController.delete)

module.exports ={
    cart: router
}