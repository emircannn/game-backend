const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    image: {
        type: String,
        default: null
    },
    steamLink: {
        type: String,
        default: null
    },
    eaLink: {
        type: String,
        default: null
    },
    ubisoftLink: {
        type: String,
        default: null
    },
    youtubeLink: {
        type: String,
        default: null
    },
    twitchLink: {
        type: String,
        default: null
    },
    discordLink: {
        type: String,
        default: null
    },
    level: {
        type: Number,
        default: 1
    },
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }],
    library: [{
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
},{
    minimize: true,
    timestamps: true,
    autoIndex: true
})

const User = mongoose.model('User', userSchema, 'user')

module.exports = User


