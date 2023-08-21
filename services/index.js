const userService = require('./user.service')
const categoryService = require('./category.service')
const gameService = require('./game.service')

module.exports = {
    user: userService,
    category: categoryService,
    game: gameService
}