const userService = require('./user.service')
const categoryService = require('./category.service')

module.exports = {
    user: userService,
    category: categoryService
}