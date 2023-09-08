const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const verifyToken = require('../middleware/auth.middleware')  
const adminToken = require('../middleware/admin.middleware')  
const { upload } = require('../middleware/fileupload.middleware');


router.post('/sendMessage',verifyToken,upload.fields([{name: 'media', maxCount: 1}]), controller.chatController.sendMessage)
router.post('/adminMessage',adminToken,upload.fields([{name: 'media', maxCount: 1}]), controller.chatController.adminMessage)
router.get('/getAdminMessage',adminToken, controller.chatController.getAdminMessage)
router.get('/getMessage',verifyToken, controller.chatController.getMessage)
router.get('/getAll',adminToken, controller.chatController.getAll)

module.exports ={
    chat: router
}