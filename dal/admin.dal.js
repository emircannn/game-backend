const Game = require('../models/game.model')

const AdminDataAccess = {
    async getAllGame() {
        return await Game.find()
        .select('coverImage name seo category platform price discountPrice discountRate _id rating reviews stok')
        .populate({path: 'category', select: '_id seo name'})
    },
}

module.exports = AdminDataAccess