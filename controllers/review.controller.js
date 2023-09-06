const {StatusCodes} = require('http-status-codes')
const baseResponse = require('../dto/baseresponse.dto')
const utils = require('../utils/index')
const reviewService = require('../services/index').review

exports.getAll= async (req,res)=> {
    try {
        const json = await reviewService.getAll(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json.reviews,totalPages: json.totalPages, success: true, timestamp: Date.now(), message: "İşlem Başarılı."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.getById= async (req,res)=> {
    try {

        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, ...isInvalid})
            return
        }


        const json = await reviewService.getById(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Değerlendirme başarılı."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.create= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, ...isInvalid})
            return
        }

        const json = await reviewService.create(req, res)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Değerlendirme başarılı."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.getWithSeo= async (req,res)=> {
    try {
        const json = await reviewService.getWithSeo(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json.reviews, totalPages: json.totalPages, images: json.findedGame ,
            success: true, 
            timestamp: Date.now(), message: "İşlem başarılı."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.delete= async (req,res)=> {
    try {
        const json = await reviewService.delete(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Değerlendirme başarı ile silindi."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.like= async (req,res)=> {
    try {
        const json = await reviewService.like(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Beğenildi"})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}
exports.dislike= async (req,res)=> {
    try {
        const json = await reviewService.dislike(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Dislike"})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}