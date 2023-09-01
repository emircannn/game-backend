const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {categoryValidator} = require('../validations/index');
const { upload } = require('../middleware/fileupload.middleware');
const adminToken = require('../middleware/admin.middleware')



router.get('/getAll',controller.categoryController.getAllCategory)
router.get('/getBySeo',[categoryValidator.validateSeo()],controller.categoryController.getBySeo)
router.post('/create',adminToken,upload.fields([{name: 'banner', maxCount: 1},{name: 'character', maxCount: 1}]),controller.categoryController.createCategory)
router.post('/update',adminToken,[categoryValidator.validateId()],upload.fields([{name: 'banner', maxCount: 1},{name: 'character', maxCount: 1}]),controller.categoryController.updateCategory)
router.post('/delete',adminToken,[categoryValidator.validateId()],controller.categoryController.deleteCategory)

module.exports ={
    category: router
}