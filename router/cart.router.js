const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {cartValidator} = require('../validations/index')


router.get('/getAll',controller.cartController.getAll)
router.get('/getUserCart',[cartValidator.validateId()],controller.cartController.getUserCart)
router.post('/add',[cartValidator.validateAdd()], controller.cartController.addToCart)
router.post('/delete',[cartValidator.validateAdd()], controller.cartController.delete)

module.exports ={
    cart: router
}