const {StatusCodes} = require('http-status-codes')
const baseResponse = require('../dto/baseresponse.dto')
const utils = require('../utils/index')
const { createToken } = require('../utils/helper')
const adminService = require('../services/index').admin

exports.allGames= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 
    
        const response = await adminService.allGames(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: response.games,totalPages: response.totalPages, success: true, timestamp: Date.now(), message: "İşlem başarılı."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.getBySeoGame= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 
    
        const response = await adminService.getBySeoGame(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: response, success: true, timestamp: Date.now(), message: "İşlem başarılı."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.verifyToken= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 
    
        const response = await adminService.verifyToken(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: response, success: true, timestamp: Date.now(), message: "İşlem başarılı."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.login= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 
    
        const response = await adminService.login(req)
        res.status(StatusCodes.OK).json({...baseResponse, token: response, success: true, timestamp: Date.now(), message: "Giriş Yapıldı."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.setDiscount= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 
    
        const response = await adminService.setDiscount(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: response, success: true, timestamp: Date.now(), message: "İndirim Oluşturuldu."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}
exports.discountedGames= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 
    
        const response = await adminService.discountedGames(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: response.games,totalPages: response.totalPages ,success: true, timestamp: Date.now(), message: "İşlem başarılı."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}
exports.finishDiscount= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 
    
        const response = await adminService.finishDiscount(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: response, success: true, timestamp: Date.now(), message: "İndirim bitirildi."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}
exports.updateSettings= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 
    
        const response = await adminService.updateSettings(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: response, success: true, timestamp: Date.now(), message: "Ayarlar Güncellendi."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.getFirstBanner= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 
    
        const response = await adminService.getFirstBanner(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: response, success: true, timestamp: Date.now(), message: "İşlem Başarılı."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}
exports.getSecondBanner= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 
    
        const response = await adminService.getSecondBanner(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: response, success: true, timestamp: Date.now(), message: "İşlem Başarılı."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}
exports.deleteUser= async (req,res)=> {
    try {
        const response = await adminService.deleteUser(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: response, success: true, timestamp: Date.now(), message: "Kullanıcı Silindi."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}