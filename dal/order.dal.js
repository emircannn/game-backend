const Order = require('../models/order.model')

const OrderDataAccess = {
    async getAll(req) {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = 6
        const totalOrders = await Order.countDocuments()
        const totalPages = Math.ceil(totalOrders / limit);
        const json = await Order.find()
        .populate({path: "user", select: "_id name username image email"})
        .populate({path: "game", select: "_id name seo coverImage bannerImage platform price discountPrice stok"})
        .sort({
            createdAt: -1
        })
        .skip(page * limit)
        .limit(limit)

        return { json, totalPages };
    },
    async getByUsername(user) {
        return await Order.find({user: user})
        .populate({path: "game", select: "_id name seo coverImage platform"})
    },
    async addOrder(user,total,subtotal,game) {
        return await Order.create({user,total,subtotal,game})
    },
    async complateOrder(id, orderInfo) {
        return await Order.findByIdAndUpdate({_id: id}, {status: true, orderInfo}, {new: true})
    },
}

module.exports = OrderDataAccess