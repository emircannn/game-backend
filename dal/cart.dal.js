const Cart = require('../models/cart.model')

const CartDataAccess = {
    async getAll() {
        return await Cart.find()
    },
    async getUserCart(id) {
        return await Cart.findOne({user:id}).populate({path: "game", select: "_id name seo coverImage bannerImage platform price discountPrice"})
    },
    async addToCart(user, game, total, subtotal) {
        return await Cart.create({user, game, total, subtotal})
    },
}

module.exports = CartDataAccess