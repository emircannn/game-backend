const authMiddleware = require('./auth.middleware');
const loggerMiddleware = require('./logger.middleware');
const singlefileuploadMiddleware = require('./singlefileupload.middleware')

module.exports = {
    loggerMiddleware,
    authMiddleware,
    singlefileuploadMiddleware
}