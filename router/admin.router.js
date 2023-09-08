const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {userValidator} = require('../validations/index')
const adminToken = require('../middleware/admin.middleware');

router.get('/allGames',controller.adminController.allGames)
router.get('/getSettings',adminToken,controller.adminController.getSettings)
router.get('/getFirstBanner',controller.adminController.getFirstBanner)
router.get('/getSecondBanner',controller.adminController.getSecondBanner)
router.get('/getBySeoGame',adminToken, controller.adminController.getBySeoGame)
router.get('/discountedGames',adminToken,controller.adminController.discountedGames)
router.get('/verifyToken', controller.adminController.verifyToken)
router.post('/login', controller.adminController.login)
router.post('/setDiscount',adminToken,controller.adminController.setDiscount)
router.post('/finishDiscount',adminToken,controller.adminController.finishDiscount)
router.post('/updateSettings',adminToken, controller.adminController.updateSettings)
router.post('/deleteUser',adminToken, controller.adminController.deleteUser)
router.post('/deleteReview',adminToken, controller.adminController.deleteReview)

module.exports ={
    admin: router
}