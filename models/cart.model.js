const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
    total: {
        type: Number,
        required: true,    
    },
    subtotal: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    game: {
        type: [
            {
                name: {type: String, required: true},
                platform: {type: String, required: true},
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

const Cart = mongoose.model('Cart', cartSchema, 'cart')

module.exports = Cart