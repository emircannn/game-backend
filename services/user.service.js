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
        const {userName} = req.params

        const json = await userDal.findUserbyUsername(userName)
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

exports.addWishlist= async (req)=>{
    try {
        const {username} = req.query
        const {wishlist} = req.body

        const findedUser = await User.findOne({username})

        if(!findedUser) {
            throw new Error('Böyle bir kullanıcı mevcut değil')
        }

        if(findedUser.wishlist.includes(wishlist)) {
            throw new Error('Bu oyun zaten istek listenizde')
        }

        const json = await userDal.addWishlist(username,wishlist)
        return json


    } catch (error) {
        throw new Error(error)
    }
}

exports.deleteWishlist= async (req)=>{
    try {
        const {username} = req.query
        const {wishlist} = req.body

        const findedUser = await User.findOne({username})

        if(!findedUser) {
            throw new Error('Böyle bir kullanıcı mevcut değil')
        }

        if(!findedUser.wishlist.includes(wishlist)) {
            throw new Error('Bu oyun zaten istek listenizde değil')
        }

        const json = await userDal.deleteWishlist(username,wishlist)
        return json


    } catch (error) {
        throw new Error(error)
    }
}

exports.getWishlist= async (req)=>{
    try {
        const {username} = req.query

        const json = await userDal.getWishlist(username)
        return json

    } catch (error) {
        throw new Error(error)
    }
}

//Friends
exports.getFriends= async (req)=>{
    try {
        const {id} = req.query

        const json = await userDal.getFriends(id)
        return json

    } catch (error) {
        throw new Error(error)
    }
}

exports.getFriendRequest= async (req)=>{
    try {
        const {id} = req.query

        const json = await userDal.getFriendRequest(id)
        return json

    } catch (error) {
        throw new Error(error)
    }
}

exports.addFriend= async (req)=>{
    try {
        const {id} = req.query
        const {friendRequests} = req.body

        if (friendRequests === id) {
            throw new Error('Kendinize istek yollayamazsınız.')
        }

        const json = await userDal.addFriend(id, friendRequests)
        return json

    } catch (error) {
        throw new Error(error)
    }
}

exports.acceptFriend= async (req)=>{
    try {
        const {id} = req.query
        const {friendRequests} = req.body

        const json = await userDal.acceptFriend(id, friendRequests)
        return json

    } catch (error) {
        throw new Error(error)
    }
}

exports.declineFriend= async (req)=>{
    try {
        const {id} = req.query
        const {friendRequests} = req.body

        const json = await userDal.declineFriend(id, friendRequests)
        return json

    } catch (error) {
        throw new Error(error)
    }
}

exports.deleteFriend= async (req)=>{
    try {
        const {id} = req.query
        const {friendRequests} = req.body

        const json = await userDal.deleteFriend(id, friendRequests)
        return json

    } catch (error) {
        throw new Error(error)
    }
}