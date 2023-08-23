const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {cartValidator} = require('../validations/index')


router.get('/getAll',controller.orderController.getAll)
router.get('/getUserOrder',[cartValidator.validateId()],controller.orderController.getByUsername)
router.post('/add',[cartValidator.validateUserQuery()], controller.orderController.addOrder)
router.post('/complate',[cartValidator.validateId()], controller.orderController.complateOrder)

module.exports ={
    order: router
}