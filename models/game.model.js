const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema({
    name: {
        type: String,
    },
    bannerImage: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    seo: {
        type: String,
    },
    releaseDate: {
        type: String,
    },
    developer: {
        type: String,
    },
    stok: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    platform: {
        type: String,
    },
    youtubeLink: {
        type: String,
    },
    images: {
        type: Array,
    },
    desc: {
        type: String,
    },
    similarGames: [{
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    minimumSystemRequirements: {
        operatingSystem: String,
        processor: String,
        memory: String,
        graphicsCard: String,
        network: String,
        disk: String,
    },
    recommendedSystemRequirements: {
        operatingSystem: String,
        processor: String,
        memory: String,
        graphicsCard: String,
        network: String,
        disk: String,
    },
    rating: {
        type: Number,
        default: 0
    },
    discountRate: {
        type: Number,
    },
    discountPrice: {
        type: Number,
    },
    discountDate: {
        type: Date,
    },
    preOrderDate: {
        type: Date,
        default: null,
    }
},{
    minimize: true,
    timestamps: true,
    autoIndex: true
})

const Game = mongoose.model('Game', gameSchema, 'game')

module.exports = Game



