const Game = require('../models/game.model')

const GameDataAccess = {
    async getAllGame() {
        return await Game.find().select('bannerImage name seo coverImage price discountPrice discountRate _id')
    },
    async getBySeo(seo) {
        return await Game.findOne({seo}).populate(['category', 'similarGames'])
    },
    async create(game) {
        return await Game.create(game)
    },
    async update(game, seoName) {
        return await Game.updateOne({seo: seoName}, game)
    },
    async delete(id) {
        return await Game.findByIdAndDelete({_id: id})
    },
    async uploadImage(seo, youtubeLink,coverImage,bannerImage,images) {
        return await Game.updateOne({seo}, {youtubeLink,coverImage,bannerImage,images})
    },
}

module.exports = GameDataAccess