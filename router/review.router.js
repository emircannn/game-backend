const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {reviewValidator} = require('../validations/index');
const verifyToken = require('../middleware/auth.middleware')  

router.get('/getAll', controller.reviewController.getAll)
router.get('/getById', controller.reviewController.getById)
router.get('/getWithSeo', [reviewValidator.validateSeo()] ,controller.reviewController.getWithSeo)
router.post('/create',verifyToken, [reviewValidator.validateCreate()] ,controller.reviewController.create)
router.post('/delete',verifyToken ,controller.reviewController.delete)
router.post('/like',verifyToken ,controller.reviewController.like)
router.post('/dislike',verifyToken ,controller.reviewController.dislike)


module.exports ={
    review: router
}