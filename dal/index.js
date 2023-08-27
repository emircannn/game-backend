const userDal = require('./user.dal')
const categoryDal = require('./category.dal')
const gameDal = require('./game.dal')
const reviewDal = require('./review.dal')
const cartDal = require('./cart.dal')
const orderDal = require('./order.dal')
const adminDal = require('./admin.dal')

module.exports = {
    categoryDal,
    userDal,
    gameDal,
    reviewDal,
    cartDal,
    orderDal,
    adminDal
}