
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
    async getAllUsers(req) {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = 6
        const totalUsers = await User.countDocuments()
        const totalPages = Math.ceil(totalUsers / limit);
        const user = await User.find()
        .select('image name username email createdAt wishlist library friends')
        .populate({path: 'wishlist', select: 'coverImage name'})
        .populate({path: 'library', select: 'coverImage name'})
        .populate({path: 'friends', select: 'image username'})
        .sort({
            createdAt: -1
        })
        .skip(page * limit)
        .limit(limit)

        return {totalPages, user}
    },
    async addWishlist(id,wishlist) {
        return await User.findByIdAndUpdate({_id: id}, { $push: { wishlist: wishlist }})
    },
    async deleteWishlist(id,wishlist) {
        return await User.findByIdAndUpdate({_id: id}, { $pull: { wishlist: wishlist }})
    },
    async getWishlist(username) {
        return await User.findOne({username}).select('wishlist').populate({path: "wishlist", select: "_id name seo discountPrice coverImage bannerImage discountRate price preOrderDate"})
    },
    async getLibrary(username) {
        return await User.findOne({username}).select('library').populate({path: "library", select: "_id name seo discountPrice coverImage bannerImage discountRate price preOrderDate"})
    },
    async getFriends(id) {
        return await User.findById(id).select('friends').populate({path: "friends", select: "_id name username image"})
    },
    async getFriendRequest(id) {
        return await User.findById(id).select('friendRequests').populate({path: "friendRequests", select: "_id name username image"})
    },
    async addFriend(id, friendRequests) {
        const isExist = await User.findById(friendRequests)
        if(!isExist.friendRequests.includes(id)) {
            return await User.findByIdAndUpdate({_id: friendRequests}, { $push: { friendRequests: id }})
        }
        throw new Error('İstek zaten yollanmış')
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