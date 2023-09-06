const Game = require('../models/game.model')
const User = require('../models/user.model')
const Review = require('../models/review.model')
const reviewDal = require('../dal/index').reviewDal
const jwt = require('jsonwebtoken')

exports.getAll = async (req) => {
    try {
        const json = await reviewDal.getAll(req);
        return json
    } catch (error) {
        throw new Error
    }
};

exports.getById = async (req) => {
    try {
        const {id} = req.query
        const json = await Review.find({user: id})
        .populate({ path: "user", select: "_id name image username"})
        .populate({ path: "game", select: "_id name coverImage seo"})

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
        const json = await reviewDal.reviewsWithMatchingGameSeo(req);
        return json
    } catch (error) {
        throw new Error
    }
};

exports.delete = async (req) => {
    try {
        const {id} = req.query
        const token = req?.headers?.authorization?.split(" ")[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        if(!token) {
            throw new Error('Oturumunuzu yenileyin.')
        }
        
        const foundReview = await Review.findById(id)

        if(decoded.id !== foundReview.user.toString()) {
            throw new Error('Hatalı oturum, oturumunuzu yenileyin.')
        }
        
        await Game.findByIdAndUpdate({_id: foundReview.game},{ $pull: { reviews: id }})
        await User.findByIdAndUpdate({_id: foundReview.user},{ $pull: { reviews: id }})
        const json = await reviewDal.delete(foundReview._id);
        return json

    } catch (error) {
        throw new Error
    }
};

exports.like = async (req) => {
    try {
        const {id, user} = req.query
        const foundReview = await Review.findById(id)

        if(!foundReview.like.includes(user)) {
            if(foundReview.dislike.includes(user)) {
                await Review.findByIdAndUpdate({_id: id}, { $pull: { dislike: user }})
                return await Review.findByIdAndUpdate({_id: id}, { $push: { like: user }})
            }
            return await Review.findByIdAndUpdate({_id: id}, { $push: { like: user }})
        }

    } catch (error) {
        throw new Error
    }
};

exports.dislike = async (req) => {
    try {
        const {id, user} = req.query
        const foundReview = await Review.findById(id)

        if(!foundReview.dislike.includes(user)) {
            if(foundReview.like.includes(user)) {
                await Review.findByIdAndUpdate({_id: id}, { $pull: { like: user }})
                return await Review.findByIdAndUpdate({_id: id}, { $push: { dislike: user }})
            }
            return await Review.findByIdAndUpdate({_id: id}, { $push: { dislike: user }})
        }

    } catch (error) {
        throw new Error
    }
};