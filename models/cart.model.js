const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
    total: {
        type: Number,    
    },
    subtotal: {
        type: Number,    
    },
    game: [{
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }],
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