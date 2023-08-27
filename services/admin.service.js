const User = require('../models/user.model')
const Game = require('../models/game.model')
const adminDal = require('../dal/index').adminDal
const bcrypt = require('bcrypt');
const utils = require('../utils/index');
const { createToken, comparePassword } = require('../utils/helper');
const jwt = require('jsonwebtoken');

exports.allGames= async ()=>{
    try {
        const json = await adminDal.getAllGame()
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