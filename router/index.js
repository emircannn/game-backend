const userRouter = require('./user.router')
const categoryRouter = require('./category.router')
const gameRouter = require('./game.router')
const reviewRouter = require('./review.router')
const cartRouter = require('./cart.router')
const orderRouter = require('./order.router')
const authRouter = require('./auth.router')

module.exports = {
    userRouter,
    categoryRouter,
    gameRouter,
    reviewRouter,
    cartRouter,
    orderRouter,
    authRouter
}