const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {reviewValidator} = require('../validations/index');

router.get('/getAll', controller.reviewController.getAll)
router.get('/getWithSeo', [reviewValidator.validateSeo()] ,controller.reviewController.getWithSeo)
router.post('/create', [reviewValidator.validateCreate()] ,controller.reviewController.create)
router.post('/delete', [reviewValidator.validateId()] ,controller.reviewController.delete)


module.exports ={
    review: router
}