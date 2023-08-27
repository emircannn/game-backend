const User = require('../models/user.model')
const Game = require('../models/game.model')
const userDal = require('../dal/index').userDal
const bcrypt = require('bcrypt');
const fileService = require('../services/file.service')
const utils = require('../utils/index');
const imageDto = require('../dto/userDto');
const { createToken, comparePassword } = require('../utils/helper');
const jwt = require('jsonwebtoken');

exports.createUser= async (req)=>{
    try {
        const {name,email,username,password} = req.body

        const hassedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            name,
            email,
            username,
            password: hassedPassword
        })

        const hasEmail = await User.findOne({email})
        const hasUsername = await User.findOne({username})

        if(hasEmail) {
            throw new Error('Bu email halihazırda kullanımda')
        }
        if(hasUsername) {
            throw new Error('Bu kullanıcı adı halihazırda kullanımda')
        }

        const json = await userDal.create(user)
        const token = createToken(json._id)
        return {json, token}

    } catch (error) {
        throw new Error(error)
    }
}

exports.getUser= async (req)=>{
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY );
        
        if(!decoded) {
            return null
        }

        const user = await User.findById(decoded.id);
        if(!user) {
            return null
        }
        return user;

    } catch (error) {
        throw new Error(error)
    }
}

exports.login= async (req)=>{
    try {
        const {email, password} = req.body

        const existUser = await User.findOne({email})
        
        if(!existUser) {
            throw new Error('Böyle bir kullanıcı bulunamadı.')
        }

        const matchPassword = await comparePassword(password, existUser.password)

        if(!matchPassword) {
            throw new Error('Hatalı Şifre.')
        }

        return existUser

    } catch (error) {
        throw new Error(error)
    }
}

exports.dashboard= async (req)=>{
    try {
        const {id} = req.query

        const user = await User.findById(id).select('wishlist').select('library')
        .populate({ path: "wishlist", select: "_id name seo price discountPrice discountRate coverImage"})
        .populate({ path: "library", select: "_id name seo price discountPrice discountRate coverImage"});

        if (!user) {
            throw new Error('Kullanıcı bulunamadı');
        }

        const lastWishlist = user.wishlist[user.wishlist.length > 0 ? user.wishlist.length - 1 : 0]
        const lastGame = user.library[user.library.length > 0 ? user.library.length - 1 : 0];
        
        return {lastWishlist, lastGame}

    } catch (error) {
        throw new Error(error)
    }
}
