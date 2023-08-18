const jwt = require('jsonwebtoken');
const logger = require('./logger')
const fs = require('fs')
const dns = require('dns');
const os = require('os');
const { validationResult } = require('express-validator');


const createUploadDir = (str) => {
    if(!fs.existsSync(str)){
        fs.mkdirSync(str, {recursive: true})
    }
}

const getHost = () => {
    return new Promise((resolve, reject) => {
        dns.lookup(os.hostname(), (err, ip) => {
            if (err) {
                reject(err);
            } else {
                resolve(`http://${ip}:${process.env.PORT}`);
            }
        });
    });
};

const logToError = (error, req, message) => {
    logger.error(`Ip Adresi: ${req.ip} - 
    PATH: ${req.path} - 
    BODY: ${JSON.stringify(req.body)} - 
    PARAMS: ${JSON.stringify(req.params)} -
    QUERY: ${JSON.stringify(req.query)} - 
    ERROR TIME: ${Date.now()} -
    URL: ${req.url} -
    ERROR MESSAGE : ${error.message} - 
    ERROR CALLSTACK : ${JSON.stringify(error)} -
    CUSTOM INFO : ${message}
    `)
}

const handleValidation=(req)=> {
    const validationErrors = validationResult(req)
        
        if(validationErrors.isEmpty() === false) {
            return {
                success: false, 
                timestamp: Date.now(), 
                message: validationErrors.array(), 
                data: null}
        }

        return null
}

const deleteFromDisk=(fileName)=> {
    if(fileName && fs.existsSync(`uploads/${fileName}`)) {
        fs.unlink(`uploads/${fileName}`, (err) => {
            if (err) {
                return false
            }
            return true
        })
    }

    return true
}

module.exports = {
    logToError,
    createUploadDir,
    getHost,
    handleValidation,
    deleteFromDisk
}