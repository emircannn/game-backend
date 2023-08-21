const {StatusCodes} = require('http-status-codes')
const baseResponse = require('../dto/baseresponse.dto')
const utils = require('../utils/index')
const categoryService = require('../services/index').category

exports.getAllCategory= async (req,res)=> {
    try {
        const json = await categoryService.getAll(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "İşlem Başarılı."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}
exports.getBySeo= async (req,res)=> {
    try {
        const json = await categoryService.getBySeo(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "İşlem Başarılı."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.createCategory= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 

        const json = await categoryService.createCategory(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Kategori Başarı ile Oluşturuldu."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.updateCategory= async (req, res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 

        const json = await categoryService.updateCategory(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Kategori Başarı ile Güncellendi."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.deleteCategory= async (req, res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 

        const json = await categoryService.deleteCategory(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), message: "Kategori Başarı ile Silindi."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}