const Game = require('../models/game.model')
const Category = require('../models/category.model')
const { sortBy, filter } = require('./sort&filter')

const AdminDataAccess = {
        async getAllGame(req) {
        const page = parseInt(req.query.page) - 1 || 0
        const name = req.query.name || ""
        const category = req.query.category || ""
        const platform = req.query.platform || ""
        const stok = parseInt(req.query.stok) || 'all'
        const sort = req.query.sort || "created"
        
        const foundedCategory =category ? await Category.findOne({ seo: category }) : null
        const filterObject = filter({name, category:foundedCategory, platform, stok});
        const limit = 6
        const totalGames = await Game.countDocuments(filterObject);
        const totalPages = Math.ceil(totalGames / limit);

        const games = await Game.find(filterObject)
        .select('coverImage name seo category platform price discountPrice discountRate _id rating reviews stok')
        .populate({path: 'category', select: '_id seo name'})
        .skip(page * limit)
        .limit(limit)
        .sort(sortBy(sort))

        return { games, totalPages };
    },
    async getBySeoGame(seoName) {
        return await Game.findOne({seo: seoName})
    },
}

module.exports = AdminDataAccess