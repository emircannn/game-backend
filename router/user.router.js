const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {userValidator} = require('../validations/index')


router.get('/getAll',controller.userController.getAll)
router.get('/getByUsername/:userName',[userValidator.validateFindByUsername()],controller.userController.findByUsername)
router.post('/updateImage',[userValidator.validateUploadLogo()],controller.userController.updateImage)
router.post('/updateByUsername/:userName',[userValidator.validateFindByUsername()],controller.userController.updateByUsername)

// Wishlist
router.get('/getWishlist',[userValidator.validateUsername()], controller.userController.getWishlist)
router.post('/addWishlist',[userValidator.validateUsername()],controller.userController.addWishlist)
router.post('/deleteWishlist',[userValidator.validateUsername()],controller.userController.deleteWishlist)

//Friends
router.get('/getFriends',[userValidator.validateUploadLogo()], controller.userController.getFriends)
router.get('/getFriendRequest',[userValidator.validateUploadLogo()], controller.userController.getFriendRequest)
router.post('/addFriend',[userValidator.validateUploadLogo()], controller.userController.addFriend)
router.post('/acceptFriend',[userValidator.validateUploadLogo()], controller.userController.acceptFriend)
router.post('/declineFriend',[userValidator.validateUploadLogo()], controller.userController.declineFriend)
router.post('/deleteFriend',[userValidator.validateUploadLogo()], controller.userController.deleteFriend)

module.exports ={
    user: router
}