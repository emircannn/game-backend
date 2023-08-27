const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {userValidator} = require('../validations/index')

router.get('/allGames', controller.adminController.allGames)
router.get('/verifyToken', controller.adminController.verifyToken)
router.post('/login', controller.adminController.login)

module.exports ={
    admin: router
}