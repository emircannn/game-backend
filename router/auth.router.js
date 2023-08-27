const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {userValidator} = require('../validations/index')

router.post('/signup',[userValidator.validateCreateUser()], controller.authController.signup)
router.post('/login', controller.authController.login)
router.get('/getUser', controller.authController.getUser)
router.get('/dashboard',[userValidator.validateUploadLogo()], controller.authController.dashboard)

module.exports ={
    auth: router
}