const mongoose = require('mongoose')

const Schema = mongoose.Schema

const settingsSchema = new Schema({
    firstBanner: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
    },
    secondBanner: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
    },
    email: {
        type: String
    },
    password: {
        type: String,
        default: null,
    },
    phone: {
        type: String
    },
    iban: {
        type: String
    },
    bank: {
        type: String
    },
    name: {
        type: String
    },
}
,{
    minimize: true,
    timestamps: true,
    autoIndex: true
})

const Settings = mongoose.model('Settings', settingsSchema, 'settings')

module.exports = Settings