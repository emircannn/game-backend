const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {userValidator} = require('../validations/index')


router.get('/getAll',controller.userController.getAll)
router.get('/getByUsername/:userName',[userValidator.validateFindByUsername()],controller.userController.findByUsername)
router.post('/create',[userValidator.validateCreateUser()], controller.userController.createUser)
router.post('/updateImage',[userValidator.validateUploadLogo()],controller.userController.updateImage)
router.post('/updateByUsername/:userName',[userValidator.validateFindByUsername()],controller.userController.updateByUsername)

// Wishlist
router.get('/getWishlist',[userValidator.validateUsername()], controller.userController.getWishlist)
router.post('/addWishlist',[userValidator.validateUsername()],controller.userController.addWishlist)
router.post('/deleteWishlist',[userValidator.validateUsername()],controller.userController.deleteWishlist)

module.exports ={
    user: router
}