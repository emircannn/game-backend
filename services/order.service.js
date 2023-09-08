const Order = require('../models/order.model')
const User = require('../models/user.model')
const Cart = require('../models/cart.model');
const Game = require('../models/game.model');
const orderDal = require('../dal/index').orderDal
const socketIoUtil = require('../utils/socket');
exports.getAll = async (req) => {
    try {
        const json = await orderDal.getAll(req);
        return json
    } catch (error) {
        throw new Error(error)
    }
};

exports.getByUsername = async (req) => {
    try {
        const {user} = req.query
        const json = await orderDal.getByUsername(user);
        return json
    } catch (error) {
        throw new Error(error)
    }
};

exports.addOrder = async (req) => {
    try {
        const {user} = req.query
        const findedCart = await Cart.findOne({user})
        const total = findedCart.total
        const subtotal = findedCart.subtotal
        const game = findedCart.game

        for (const id of game) {
            const findedgame = await Game.findById(id)
            await Game.findByIdAndUpdate({_id: id}, {stok: findedgame.stok - 1})
        }

        const json = await orderDal.addOrder(user,total,subtotal,game);
        await Cart.findOneAndDelete({user})
        const io = socketIoUtil.getIO()
        io.emit('order', 'Yeni bir sipariş var var');
        return json
    } catch (error) {
        throw new Error(error)
    }
};

exports.complateOrder = async (req) => {
    try {
        const {id} = req.query
        const {orderInfo} = req.body

        const findedOrder = await Order.findById(id)
        const findedUser = await User.findById(findedOrder.user)
        for (const id of findedOrder.game) {
            if(!findedUser.library.includes(id)) {
                await User.findByIdAndUpdate({_id: findedOrder.user},{ $push: { library: id }})
            }
        }

        const json = await orderDal.complateOrder(id,orderInfo);
        return json
    } catch (error) {
        throw new Error(error)
    }
};