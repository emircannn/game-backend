const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {gameValidator} = require('../validations/index');
const { upload } = require('../middleware/fileupload.middleware');

router.get('/getAll', controller.gameController.getAllGame)
router.get('/getBySeo',[gameValidator.validateSeo()], controller.gameController.getBySeo)
router.post('/create', controller.gameController.createGame)
router.post('/update', controller.gameController.updateGame)
router.post('/delete',[gameValidator.validateId()], controller.gameController.deleteGame)
router.post('/uploadImage',[gameValidator.validateSeo()],upload.fields([{name: 'coverImage', maxCount: 1},{name: 'bannerImage', maxCount: 1},{name: 'images', maxCount: 5}]), 
controller.gameController.uploadImage)


module.exports ={
    game: router
}