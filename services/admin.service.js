const Game = require('../models/game.model')
const Settings = require('../models/settings.model')
const User = require('../models/user.model')
const Review = require('../models/review.model')
const Cart = require('../models/cart.model')
const adminDal = require('../dal/index').adminDal
const jwt = require('jsonwebtoken');
const { deleteFromDisk } = require('../utils/helper');
const { reviewDal } = require('../dal/index')
const bcrypt = require('bcrypt');

exports.allGames= async (req)=>{
    try {
        const json = await adminDal.getAllGame(req)
        return json

    } catch (error) {
        throw new Error(error)
    }
}

exports.getBySeoGame= async (req)=>{
    try {
        const {seoName} = req.query

        const json = await adminDal.getBySeoGame(seoName)
        return json

    } catch (error) {
        throw new Error(error)
    }
}

exports.verifyToken= async (req)=>{
    try {
        const token = req.headers.authorization;

        if(!token) {
            return null
        }
        const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY );

        if(!decoded) {
            return null
        }

        if(decoded.role === 'admin') {
            return true;
        }

        return false;
    } catch (error) {
        throw new Error(error)
    }
}

exports.login= async (req)=>{
    try {
        const {email, password} = req.body

        if(email !== process.env.ADMIN_EMIAL) {
            throw new Error('Hatalı Email Adresi!')
        }
        if(password !== process.env.ADMIN_PASSWORD) {
            throw new Error('Hatalı Şifre!')
        }
        
        const admin = {role: 'admin'}
        const token = jwt.sign(admin, process.env.SECRET_KEY, {expiresIn : 24 * 60 * 60})

        return token

    } catch (error) {
        throw new Error(error)
    }
}

exports.setDiscount = async (req) => {
    try {
        const { games, discountRate, discountDate } = req.body;

        for (const id of games) {
            const game = await Game.findOne({ _id: id });

            if (game) {
                const discountPrice = game.price - (game.price * discountRate / 100);
                await Game.updateOne({ _id: game._id },{ discountRate, discountPrice, discountDate });
            } 
            else {
                throw new Error(`ID ${id} ile eşleşen bir oyun bulunamadı.`);
            }
        }

        return true;

    } catch (error) {
        throw new Error(error.message);
    }
}

exports.discountedGames = async (req) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = 6
        const totalGames = await Game.countDocuments({
            $or: [
                { discountRate: { $ne: null } },
                { discountRate: { $gt: 0 } } 
            ]
    });
        const totalPages = Math.ceil(totalGames / limit);
        const games = await Game.find({
            $or: [
                { discountRate: { $ne: null } },
                { discountRate: { $gt: 0 } } 
            ]
        })
        .select('_id seo name coverImage name discountRate discountDate price discountPrice')
        .skip(page * limit)
        .limit(limit)
        
        return {games, totalPages};
    } catch (error) {
        throw new Error(error.message);
    }
}


exports.finishDiscount = async (req) => {
    try {
        const {id} = req.query
        const finishDiscount = await Game.findByIdAndUpdate(id, { discountRate: null, discountPrice: null, discountDate: null}, {new: true})
        return finishDiscount;

    } catch (error) {
        throw new Error(error.message);
    }
}

exports.updateSettings = async (req) => {
    try {
        const {name, email, phone, iban, bank, firstBanner, secondBanner, password} = req.body
        const {id} = req.query
        const salt = bcrypt.genSalt(12)
        const _password = bcrypt.hash(password, salt) 
        const json = await Settings.findByIdAndUpdate(id, {name, email, phone, iban, bank, firstBanner, secondBanner, password: _password}, {new: true})
        return json;

    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getFirstBanner = async () => {
    try {
        const json = await Settings.find()
        .select('firstBanner')
        .populate({path: 'firstBanner', select: 'bannerImage seo price discountPrice discountRate discoutDate preOrderDate name discountDate'})
        return json[0];

    } catch (error) {
        throw new Error(error.message);
    }
}
exports.getSecondBanner = async () => {
    try {
        const json = await Settings.find()
        .select('secondBanner')
        .populate({path: 'secondBanner', select: 'bannerImage seo price discountPrice discountRate discoutDate preOrderDate name discountDate'})
        return json[0];

    } catch (error) {
        throw new Error(error.message);
    }
}

exports.deleteUser = async (req) => {
    try {
        const {id} = req.query

        const foundedUser = await User.findById(id)
        const reviews = foundedUser.reviews
        const friends = foundedUser.friends
        const isDeletedImage = deleteFromDisk(foundedUser.image ? foundedUser.image.split('uploads/')[1] : '') 

        if(isDeletedImage) {
            for (const id of reviews) {
                await Review.findByIdAndDelete(id);
            }
            for (const user of friends) {
                await User.findByIdAndUpdate({_id: user},{ $pull: { friends: id }})
            }

            await Cart.findOneAndDelete({user: id})

            const json = await User.findByIdAndDelete(id);
            return json
        }

        throw new Error('Bir hata oluştu')

    } catch (error) {
        throw new Error(error.message);
    }
}

exports.deleteReview = async (req) => {
    try {
        const {id} = req.query
        
        const foundReview = await Review.findById(id)

        await Game.findByIdAndUpdate({_id: foundReview.game},{ $pull: { reviews: id }})
        await User.findByIdAndUpdate({_id: foundReview.user},{ $pull: { reviews: id }})
        const json = await reviewDal.delete(foundReview._id);
        return json

    } catch (error) {
        throw new Error(error.message)
    }
}

exports.getSettings = async (req) => {
    try {
        
        const json = await Settings.find()
        return json

    } catch (error) {
        throw new Error(error.message)
    }
}