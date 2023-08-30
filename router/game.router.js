const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {gameValidator} = require('../validations/index');
const { upload } = require('../middleware/fileupload.middleware');
const adminMiddleware = require('../middleware/admin.middleware')

router.get('/getAll', controller.gameController.getAllGame)
router.get('/getBySeo',[gameValidator.validateSeo()], controller.gameController.getBySeo)
router.post('/create',adminMiddleware, controller.gameController.createGame)
router.post('/update', adminMiddleware,controller.gameController.updateGame)
router.post('/delete',adminMiddleware,[gameValidator.validateId()], controller.gameController.deleteGame)
router.post('/uploadImage',adminMiddleware,[gameValidator.validateSeo()],upload.fields([{name: 'coverImage', maxCount: 1},{name: 'bannerImage', maxCount: 1},{name: 'images', maxCount: 5}]), 
controller.gameController.uploadImage)


module.exports ={
    game: router
}