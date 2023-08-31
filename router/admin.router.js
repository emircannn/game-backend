const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {userValidator} = require('../validations/index')
const adminToken = require('../middleware/admin.middleware');

router.get('/allGames',controller.adminController.allGames)
router.get('/getBySeoGame',adminToken, controller.adminController.getBySeoGame)
router.get('/verifyToken', controller.adminController.verifyToken)
router.post('/login', controller.adminController.login)

module.exports ={
    admin: router
}