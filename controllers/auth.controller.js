const {StatusCodes} = require('http-status-codes')
const baseResponse = require('../dto/baseresponse.dto')
const utils = require('../utils/index')
const { createToken } = require('../utils/helper')
const authService = require('../services/index').authService

exports.signup= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 
    
        const response = await authService.createUser(req)
        res.cookie('jwt', response.token, {
            maxAge: 14 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
            path: '/',
            domain: 'localhost',
            secure: true,
            httpOnly: true
        })
        res.status(StatusCodes.OK).json({...baseResponse, data: response.json, success: true, token: response.token, timestamp: Date.now(), message: "Hesap Başarı ile Oluşturuldu."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}

exports.getUser= async (req,res)=> {
    try {
        const isInvalid = utils.helpers.handleValidation(req)

        if(isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, error: true, ...isInvalid})
            return
        } 

        const response = await authService.getUser(req)
        return res.json(response)

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

        const json = await authService.login(req)
        const token = createToken(json._id)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, token: token, timestamp: Date.now(), message: "Giriş işlemi başarılı."})

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.BAD_REQUEST).json({...baseResponse, success: false, timestamp: Date.now(), message: error.message, data: null, error: true})
    }
}
