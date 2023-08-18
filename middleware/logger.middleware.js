
const logger = require('../utils/index').logger

module.exports = (req,res,next) => {
    logger.info(`Ip Adresi: ${req.ip} - 
    PATH: ${req.path} - 
    BODY: ${JSON.stringify(req.body)} - 
    PARAMS: ${JSON.stringify(req.params)} -
    QUERY: ${JSON.stringify(req.query)} - 
    MIDDLEWARE ACCESS: ${Date.now()} -
    URL: ${req.url}
    `)
   next();
}