const User = require('../models/user.model')
const userDal = require('../dal/index').userDal
const bcrypt = require('bcrypt');
const fileService = require('../services/file.service')
const utils = require('../utils/index');
const imageDto = require('../dto/userDto');

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
        return json

    } catch (error) {
        throw new Error(error)
    }
}

exports.findUser= async (req)=>{
    try {
        const {username} = req.params

        const json = await userDal.findUserbyUsername(username)
        return json

    } catch (error) {
        throw new Error(error)
    }
}
exports.updateUser= async (req)=>{
    try {
        const {userName} = req.params
        const {name,username,steamLink, eaLink,ubisoftLink,youtubeLink,twitchLink,discordLink,password,email} = req.body

        const hasEmail = await User.findOne({email})
        const hasUsername = await User.findOne({username})
        const isUsername = await User.findOne({username: userName})
        const hassedPassword = password && await bcrypt.hash(password, 12)

        if(hasEmail) {
            throw new Error('Bu email halihazırda kullanımda')
        }
        if(hasUsername) {
            throw new Error('Bu kullanıcı adı halihazırda kullanımda')
        }
        if(!isUsername) {
            throw new Error('Böyle bir kullanıcı mevcut değil')
        }

        const json = await userDal.UpdatebyUsername(userName, name,username,steamLink, eaLink,ubisoftLink,youtubeLink,twitchLink,discordLink,hassedPassword,email)
        return json

    } catch (error) {
        throw new Error(error)
    }
}

exports.getAll= async (req)=>{
    try {
        const json = await userDal.getAllUsers(req)
        return json

    } catch (error) {
        throw new Error(error)
    }
}

exports.updateImage= async (req, res)=>{
    try {
        const {id} = req.query

        const str = await fileService.uploadFile(req, res)
        const findedUser = await User.findById(id)
        const isDeleted = utils.helpers.deleteFromDisk(findedUser.image ? findedUser.image.split('uploads/')[1] : '')

        if(isDeleted) {
            const json = await userDal.updateOneById(id,{image: str})
            return {...imageDto, image: str,}
        }
        throw new Error('Hata')

    } catch (error) {
        throw new Error(error)
    }
}