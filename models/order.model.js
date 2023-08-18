const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    subtotal: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    orderInfo: {
        type: String,
        default: false,
    },
    game: {
        type: [
            {
                name: {type: String, required: true},
                id: {type: String, required: true},
                price: {type: Number, required: true},
                discountRate: {type: Number, required: true},
                discountPrice: {type: Number, required: true},
                count: {type: Number, required: true},
            },
        ]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
},{
    minimize: true,
    timestamps: true,
    autoIndex: true
})

const Order = mongoose.model('Order', orderSchema, 'order')

module.exports = Order