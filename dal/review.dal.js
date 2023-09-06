const Review = require('../models/review.model')
const Game = require('../models/game.model')

const ReviewDataAccess = {
    async getAll(req) {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = parseInt(req.query.limit) || 6
        const totalReviews = await Review.countDocuments()
        const totalPages = Math.ceil(totalReviews / limit);
        const reviews = await Review.find()
        .populate({path: "game", select: "_id name seo rating coverImage bannerImage"})
        .populate({path: "user", select: "_id name username image"})
        .sort({
            createdAt: -1
        })
        .skip(page * limit)
        .limit(limit)

        return {totalPages, reviews}
    },
    async create(review) {
        return await Review.create(review)
    },
    async reviewsWithMatchingGameSeo (req) {
        const page = parseInt(req.query.page) - 1 || 0
        const seo = req.query.seo
        const limit = 6
        const findedGame = await Game.findOne({seo}).select('coverImage bannerImage _id name seo')
        const totalCarts = await Review.countDocuments({game :findedGame._id})
        const totalPages = Math.ceil(totalCarts / limit);

        if (!findedGame) {
            throw new Error("Oyun bulunamadı");
        }

        const reviews = await Review.find({game :findedGame._id})
        .populate({path: "game", select: "_id name seo rating coverImage bannerImage"})
        .populate({path: "user", select: "_id name username image"})
        .limit(limit)
        .sort({
            createdAt: -1
        })
        .skip(page * limit)

        return {totalPages, reviews, findedGame}
    },
    async delete(id) {
        return await Review.findByIdAndDelete(id)
    },
}

module.exports = ReviewDataAccess