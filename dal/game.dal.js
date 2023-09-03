const Game = require('../models/game.model')
const Category = require('../models/category.model')
const { sortBy, filter } = require('./sort&filter')

const GameDataAccess = {
    async getAllGame(req) {
        const page = parseInt(req.query.page) - 1 || 0
        const name = req.query.name || ""
        const category = req.query.category || ""
        const platform = req.query.platform || ""
        const stok = parseInt(req.query.stok) || 'all'
        const sort = req.query.sort || "created"
        const minPrice = req.query.minPrice || 0
        const maxPrice = req.query.maxPrice || 999999
        const preOrder = req.query.preOrder || null
        const weeklyDiscount = req.query.weeklyDiscount || null
        
        const foundedCategory = category ? await Category.findOne({ seo: category }) : null
        const filterObject = filter({name, category:foundedCategory, platform, stok, minPrice, maxPrice, preOrder, weeklyDiscount});
        const limit = 6
        const totalGames = await Game.countDocuments(filterObject)
        const totalPages = Math.ceil(totalGames / limit);

        const games = await Game.find(filterObject)
        .select('bannerImage name seo coverImage price discountPrice discountDate discountRate _id preOrderDate')
        .skip(page * limit)
        .limit(limit)
        .sort(sortBy(sort))

        return { games, totalPages };
    },
    async getBySeo(seo) {
        return await Game.findOne({seo})
        .populate({path: 'category', select: '_id seo name'})
        .populate({path: 'similarGames', select: '_id seo name coverImage bannerImage price discountPrice discountRate preOrderDate'})
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