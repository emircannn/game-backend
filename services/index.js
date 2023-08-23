const userService = require('./user.service')
const categoryService = require('./category.service')
const gameService = require('./game.service')
const reviewService = require('./review.service')
const cartService = require('./cart.service')
const orderService = require('./order.service')

module.exports = {
    user: userService,
    category: categoryService,
    game: gameService,
    review: reviewService,
    cartService,
    orderService
}