const Order = require('../models/order.model')

const OrderDataAccess = {
    async getAll() {
        return await Order.find()
    },
    async getByUsername(user) {
        return await Order.findOne({user})
    },
    async addOrder(user,total,subtotal,game) {
        return await Order.create({user,total,subtotal,game})
    },
    async complateOrder(id, orderInfo) {
        return await Order.findById({_id: id}, {status: true, orderInfo})
    },
}

module.exports = OrderDataAccess