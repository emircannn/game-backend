const Game = require('../models/game.model')
const adminDal = require('../dal/index').adminDal
const jwt = require('jsonwebtoken');

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