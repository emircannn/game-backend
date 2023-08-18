const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
    banner: {
        type: String,
        required: true
    },
    character: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    game: [{
        type: Schema.Types.ObjectId,
        ref: 'Game',
    }]
},{
    minimize: true,
    timestamps: true,
    autoIndex: true
})

const Category = mongoose.model('Category', categorySchema, 'category')

module.exports = Category