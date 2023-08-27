
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
    async addWishlist(id,wishlist) {
        return await User.findByIdAndUpdate({_id: id}, { $push: { wishlist: wishlist }})
    },
    async deleteWishlist(id,wishlist) {
        return await User.findByIdAndUpdate({_id: id}, { $pull: { wishlist: wishlist }})
    },
    async getWishlist(username) {
        return await User.findOne({username}).select('wishlist').populate({path: "wishlist", select: "_id name seo discountPrice coverImage bannerImage discountRate price"})
    },
    async getFriends(id) {
        return await User.findById(id).select('friends').populate({path: "friends", select: "_id name username image"})
    },
    async getFriendRequest(id) {
        return await User.findById(id).select('friendRequests').populate({path: "friendRequests", select: "_id name username image"})
    },
    async addFriend(id, friendRequests) {
        return await User.findByIdAndUpdate({_id: friendRequests}, { $push: { friendRequests: id }})
    },
    async acceptFriend(id, friendRequests) {
        await User.findByIdAndUpdate({_id: id}, { $pull: { friendRequests: friendRequests }})
        await User.findByIdAndUpdate({_id: friendRequests}, { $push: { friends: id }})
        return await User.findByIdAndUpdate({_id: id}, { $push: { friends: friendRequests }})
    },
    async declineFriend(id, friendRequests) {
        return await User.findByIdAndUpdate({_id: id}, { $pull: { friendRequests: friendRequests }})
    },
    async deleteFriend(id, friendRequests) {
        await User.findByIdAndUpdate({_id: friendRequests}, { $pull: { friends: id }})
        return await User.findByIdAndUpdate({_id: id}, { $pull: { friends: friendRequests }})
    },
}

module.exports = UserDataAccess