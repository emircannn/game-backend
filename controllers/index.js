const userController = require('./user.controller')
const categoryController = require('./category.controller')
const gameController = require('./game.controller')
const reviewController = require('./review.controller')
const cartController = require('./cart.controller')
const orderController = require('./order.controller')
const authController = require('./auth.controller')
const adminController = require('./admin.controller')
const chatController = require('./chat.controller')

module.exports={
    userController,
    categoryController,
    gameController,
    reviewController,
    cartController,
    orderController,
    authController,
    adminController,
    chatController
}