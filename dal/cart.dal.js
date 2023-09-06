const Cart = require('../models/cart.model')

const CartDataAccess = {
    async getAll(req) {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = 6
        const totalCarts = await Cart.countDocuments()
        const totalPages = Math.ceil(totalCarts / limit);
        const carts = await Cart.find()
        .populate({path: "user", select: "_id name username image email"})
        .populate({path: "game", select: "_id name seo coverImage bannerImage platform price discountPrice stok"})
        .sort({
            createdAt: -1
        })
        .skip(page * limit)
        .limit(limit)

        return {carts, totalPages}
    },
    async getUserCart(id) {
        return await Cart.findOne({user:id}).populate({path: "game", select: "_id name seo coverImage bannerImage platform price discountPrice stok"})
    },
    async cartCount(id) {
        const data = await Cart.findOne({user:id})
        return data?.game.length
    },
    async addToCart(user, game, total, subtotal) {
        return await Cart.create({user, game, total, subtotal})
    },
}

module.exports = CartDataAccess