const Game = require('../models/game.model')
const User = require('../models/user.model')
const Review = require('../models/review.model')
const reviewDal = require('../dal/index').reviewDal

exports.getAll = async () => {
    try {
        const json = await reviewDal.getAll();
        return json
    } catch (error) {
        throw new Error
    }
};

exports.create = async (req) => {
    try {
        const {rate,review,user,game} = req.body

        const reviewModel = new Review({
            rate,
            review,
            user,
            game
        })

        const json = await reviewDal.create(reviewModel);
        await Game.findByIdAndUpdate({_id: game},{ $push: { reviews: json._id }})
        await User.findByIdAndUpdate({_id: user},{ $push: { reviews: json._id }})

        return json
    } catch (error) {
        throw new Error
    }
};

exports.getWithSeo = async (req) => {
    try {
        const {seo} = req.query
        const json = await reviewDal.reviewsWithMatchingGameSeo(seo);
        return json
    } catch (error) {
        throw new Error
    }
};

exports.delete = async (req) => {
    try {
        const {id} = req.query
        const json = await reviewDal.delete(id);
        await Game.findByIdAndUpdate({_id: json.game},{ $pull: { reviews: id }})
        await User.findByIdAndUpdate({_id: json.user},{ $pull: { reviews: id }})
        return json
    } catch (error) {
        throw new Error
    }
};