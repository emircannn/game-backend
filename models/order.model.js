const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    subtotal: {
        type: Number,
    },
    total: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: false,
    },
    orderInfo: {
        type: String,
        default: null,
    },
    game: [{
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    minimize: true,
    timestamps: true,
    autoIndex: true
})

const Order = mongoose.model('Order', orderSchema, 'order')

module.exports = Order