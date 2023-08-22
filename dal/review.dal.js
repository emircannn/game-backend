const Review = require('../models/review.model')
const Game = require('../models/game.model')

const ReviewDataAccess = {
    async getAll() {
        return await Review.find()
        .populate({path: "game", select: "_id name seo rating coverImage bannerImage rating"})
        .populate({path: "user", select: "_id name username image"})
    },
    async create(review) {
        return await Review.create(review)
    },
    async reviewsWithMatchingGameSeo (seo) {
        const findedGame = await Game.findOne({seo})
        if (!findedGame) {
            throw new Error("Oyun bulunamadı");
          }
        return await Review.find({game :findedGame._id})
        .populate({path: "game", select: "_id name seo rating coverImage bannerImage rating"})
        .populate({path: "user", select: "_id name username image"})
    },
    async delete(id) {
        return await Review.findByIdAndDelete({_id:id})
    },
}

module.exports = ReviewDataAccess