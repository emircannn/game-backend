const Game = require('../models/game.model')

const GameDataAccess = {
    async getAllGame() {
        return await Game.find().select('bannerImage name seo coverImage price discountPrice discountRate _id')
    },
    async getBySeo(seo) {
        return await Game.findOne({seo})
        .populate({path: 'category', select: '_id seo name'})
        .populate({path: 'similarGames', select: '_id seo name coverImage bannerImage price discountPrice discountRate'})
    },
    async create(game) {
        return await Game.create(game)
    },
    async update(name, platform, discountRate,
        releaseDate, youtubeLink, discountDate,
        developer, desc, preOrderDate,
        stok, similarGames,discountPrice,
        price, minimumSystemRequirements,seo,
        category,recommendedSystemRequirements,seoName) {
        return await Game.updateOne({seo: seoName}, {name, platform, discountRate,
            releaseDate, youtubeLink, discountDate,
            developer, desc, preOrderDate,
            stok, similarGames,discountPrice,
            price, minimumSystemRequirements,seo,
            category,recommendedSystemRequirements}, {new: true})
    },
    async delete(id) {
        return await Game.findByIdAndDelete(id)
    },
    async uploadImage(seo,coverImage,bannerImage,images) {
        return await Game.updateOne({seo}, {coverImage,bannerImage,images})
    },
}

module.exports = GameDataAccess