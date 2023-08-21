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

const convertToSEOText = (text) => {
    if (!text) return;
  
    text = text
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, (match) => '_'.repeat(match.length));
  
    return text;
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
                error: true,
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

const filenameConverter = (fileName) => {

    if(!fileName) {
        return
    }

    const ip = process.env.DOMAIN
    const filePath = process.env.FILE_PATH
    const fileString = `${ip}${process.env.PORT}${filePath}${fileName}`

    return fileString
}
const filenameManyConverter = (files) => {
    const ip = process.env.DOMAIN
    const filePath = process.env.FILE_PATH

    const filesUrl = files?.map((file) => {
        return  `${ip}${process.env.PORT}${filePath}${file.filename}`
    })

    return filesUrl
}

module.exports = {
    logToError,
    createUploadDir,
    getHost,
    handleValidation,
    deleteFromDisk,
    convertToSEOText,
    filenameConverter,
    filenameManyConverter
}