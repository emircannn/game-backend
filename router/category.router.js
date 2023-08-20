const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const {userValidator} = require('../validations/index')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/create', controller.categoryController.createCategory)
router.post('/deneme', controller.categoryController.deneme)

module.exports ={
    category: router
}