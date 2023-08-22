const {StatusCodes} = require('http-status-codes')
const baseResponse = require('../dto/baseresponse.dto')
const utils = require('../utils/index')
const userService = require('../services/index').user

exports.createUser= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 

        const json = await userService.createUser(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Hesap Başarı ile Oluşturuldu."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

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

        const json = await userService.getAll()
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