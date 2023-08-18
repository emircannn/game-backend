const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    steamLink: {
        type: String,
    },
    eaLink: {
        type: String,
    },
    ubisoftLink: {
        type: String,
    },
    youtubeLink: {
        type: String,
    },
    twitchLink: {
        type: String,
    },
    discordLink: {
        type: String,
    },
    level: {
        type: Number,
        default: 1
    },
    wislist: [{
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


