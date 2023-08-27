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