const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {userValidator} = require('../validations/index')
const verifyToken = require('../middleware/auth.middleware')    


router.get('/getAll',controller.userController.getAll)
router.get('/getByUsername/:userName',[userValidator.validateFindByUsername()],controller.userController.findByUsername)
router.post('/updateImage',verifyToken,[userValidator.validateUploadLogo()],controller.userController.updateImage)
router.post('/updateByUsername/:userName',verifyToken,[userValidator.validateFindByUsername()],controller.userController.updateByUsername)

// Wishlist
router.get('/getWishlist',verifyToken, [userValidator.validateUsername()], controller.userController.getWishlist)
router.post('/addWishlist',verifyToken,[userValidator.validateUploadLogo()],controller.userController.addWishlist)
router.post('/deleteWishlist',verifyToken,[userValidator.validateUploadLogo()],controller.userController.deleteWishlist)

//Friends
router.get('/getFriends',[userValidator.validateUploadLogo()], controller.userController.getFriends)
router.get('/getFriendRequest',[userValidator.validateUploadLogo()], controller.userController.getFriendRequest)
router.post('/addFriend',verifyToken,[userValidator.validateUploadLogo()], controller.userController.addFriend)
router.post('/acceptFriend',verifyToken,[userValidator.validateUploadLogo()], controller.userController.acceptFriend)
router.post('/declineFriend',verifyToken,[userValidator.validateUploadLogo()], controller.userController.declineFriend)
router.post('/deleteFriend',verifyToken,[userValidator.validateUploadLogo()], controller.userController.deleteFriend)

module.exports ={
    user: router
}