const Game = require('../models/game.model')
const Cart = require('../models/cart.model')
const cartDal = require('../dal/index').cartDal

exports.getAll = async () => {
    try {
        const json = await cartDal.getAll();
        return json
    } catch (error) {
        throw new Error(error)
    }
};

exports.getUserCart = async (req) => {
    try {
        const {id} = req.query

        const json = await cartDal.getUserCart(id);
        return json
    } catch (error) {
        throw new Error(error)
    }
};

exports.addToCart = async (req) => {
    try {

        const {user, game} = req.body

        const findedCart = await Cart.findOne({user})
        const findedGame = await Game.findById(game)
        const total = findedGame.discountPrice ? findedGame.discountPrice : findedGame.price
        const subtotal = findedGame.price

        if(findedCart && findedCart.game.includes(game)) {
            throw new Error('Bu oyun zaten sepetinizde')
        }

        if (findedCart) {
            const gamePrice = findedGame.discountPrice ? findedGame.discountPrice : findedGame.price;
            const total = findedCart.total + gamePrice;
            const subtotal = findedGame.price + findedCart.subtotal
            return await Cart.findOneAndUpdate({ user: user }, {$push: { game: game },$set: { total, subtotal }},{ new: true })
        }

        const json = await cartDal.addToCart(user, game, total, subtotal);
        return json
    } catch (error) {
        throw new Error(error)
    }
};

exports.delete = async (req) => {
    try {
        const {user, game} = req.body
        const findedCart = await Cart.findOne({user})
        const findedGame = await Game.findById(game)

        const gamePrice = findedGame.discountPrice ? findedGame.discountPrice : findedGame.price;
        const total = findedCart.total - gamePrice;
        const subtotal = findedGame.price - findedCart.subtotal
        return await Cart.findOneAndUpdate({ user: user }, {$pull: { game: game },$set: { total, subtotal }},{ new: true })

    } catch (error) {
        throw new Error(error)
    }
};