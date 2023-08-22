
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
    async addWishlist(username,wishlist) {
        return await User.findOneAndUpdate({username}, { $push: { wishlist: wishlist }})
    },
    async deleteWishlist(username,wishlist) {
        return await User.findOneAndUpdate({username}, { $pull: { wishlist: wishlist }})
    },
    async getWishlist(username) {
        return await User.findOne({username}).select('wishlist').populate({path: "wishlist", select: "_id name seo discountPrice coverImage bannerImage discountRate price"})
    },
}

module.exports = UserDataAccess