const Order = require('../models/order.model')

const OrderDataAccess = {
    async getAll() {
        return await Order.find()
        .populate({path: "user", select: "_id name username image email"})
        .populate({path: "game", select: "_id name seo coverImage bannerImage platform price discountPrice stok"})
    },
    async getByUsername(user) {
        return await Order.find({user})
        .populate({path: "user", select: "_id name username image email"})
        .populate({path: "game", select: "_id name seo coverImage bannerImage platform price discountPrice stok"})
    },
    async addOrder(user,total,subtotal,game) {
        return await Order.create({user,total,subtotal,game})
    },
    async complateOrder(id, orderInfo) {
        return await Order.findById({_id: id}, {status: true, orderInfo})
    },
}

module.exports = OrderDataAccess