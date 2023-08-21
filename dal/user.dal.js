
const User = require('../models/user.model')

const UserDataAccess = {
    async create(user){
        return User.create(user)
    },
    async updateOneById(id, body) {
        return await User.findByIdAndUpdate({_id: id}, body)
    },
    async findUserbyUsername(username) {
        return await User.findOne({username})
    },
    async UpdatebyUsername(userName, name,username,steamLink, eaLink,ubisoftLink,youtubeLink,twitchLink,discordLink,hassedPassword,email) {
        return await User.updateOne({username: userName}, {name,username,steamLink, eaLink,ubisoftLink,youtubeLink,twitchLink,discordLink,password:hassedPassword,email})
    },
    async getAllUsers() {
        return await User.find()
    },

}

module.exports = UserDataAccess