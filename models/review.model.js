const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    rate: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
    },
    like: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    dislike: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
},{
    minimize: true,
    timestamps: true,
    autoIndex: true
})

const Review = mongoose.model('Review', reviewSchema, 'review')

module.exports = Review