
const Game = require('../models/game.model')

const GameDataAccess = {
    async getAllGame() {
        return await Game.find().populate('category')
    },
    async getBySeo(seo) {
        return await Game.findOne({seo}).populate(['category'])
    },
    async create(game) {
        return await Game.create(game)
    },
    async uploadImage(seo, youtubeLink,coverImage,bannerImage,images) {
        return await Game.updateOne({seo}, {youtubeLink,coverImage,bannerImage,images})
    },
}

module.exports = GameDataAccess