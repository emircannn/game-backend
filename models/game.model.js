const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    developer: {
        type: String,
        required: true
    },
    stok: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    platform: {
        type: String,
        required: true
    },
    youtubeLink: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    desc: {
        type: String,
        required: true
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



