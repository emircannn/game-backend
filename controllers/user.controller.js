const {StatusCodes} = require('http-status-codes')
const baseResponse = require('../dto/baseresponse.dto')
const utils = require('../utils/index')
const userService = require('../services/index').user

exports.findByUsername= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 

        const json = await userService.findUser(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "İşlem Başarılı"})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.updateByUsername= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        }

        const json = await userService.updateUser(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "İşlem Başarılı"})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.getAll= async (req,res)=> {
    try {

        const json = await userService.getAll(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "İşlem Başarılı"})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.updateImage= async(req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, ...isInvalid})
            return
        }

        const json = await userService.updateImage(req,res)
        res.status(StatusCodes.CREATED).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Profil Resmi Başarıyla Güncellendi", error: false})
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null})
    }
}


//Wishlist API
exports.addWishlist= async(req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, ...isInvalid})
            return
        }

        const json = await userService.addWishlist(req)
        res.status(StatusCodes.CREATED).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Oyun istek listesine eklendi.", error: false})
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null})
    }
}

exports.deleteWishlist= async(req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, ...isInvalid})
            return
        }

        const json = await userService.deleteWishlist(req)
        res.status(StatusCodes.CREATED).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Oyun istek listenizden çıkarıldı.", error: false})
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null})
    }
}

exports.getWishlist= async (req,res)=> {
    try {
        const json = await userService.getWishlist(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "İşlem Başarılı"})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

//Friends API
exports.getFriends= async (req,res)=> {
    try {
        const json = await userService.getFriends(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "İşlem Başarılı"})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.getFriendRequest= async (req,res)=> {
    try {
        const json = await userService.getFriendRequest(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "İşlem Başarılı"})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }

}
exports.addFriend= async (req,res)=> {
    try {
        const json = await userService.addFriend(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Arkadaşlık isteği gönderildi."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}
exports.acceptFriend= async (req,res)=> {
    try {
        const json = await userService.acceptFriend(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Arkadaşlık isteği kabul edildi."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}
exports.declineFriend= async (req,res)=> {
    try {
        const json = await userService.declineFriend(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Arkadaşlık isteği reddedildi."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}
exports.deleteFriend= async (req,res)=> {
    try {
        const json = await userService.deleteFriend(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Arkadaşlık silindi."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}