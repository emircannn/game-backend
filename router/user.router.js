const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {userValidator} = require('../validations/index')


router.post('/create',[userValidator.validateCreateUser()], controller.userController.createUser)
router.post('/updateImage',[userValidator.validateUploadLogo()],controller.userController.updateImage)
router.post('/updateByUsername/:userName',[userValidator.validateFindByUsername()],controller.userController.updateByUsername)
router.get('/getByUsername/:userName',[userValidator.validateFindByUsername()],controller.userController.findByUsername)
router.get('/getAll',controller.userController.getAll)

module.exports ={
    user: router
}