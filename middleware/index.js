const authMiddleware = require('./auth.middleware');
const loggerMiddleware = require('./logger.middleware');
const fileuploadMiddleware = require('./fileupload.middleware')

module.exports = {
    loggerMiddleware,
    authMiddleware,
    fileuploadMiddleware
}