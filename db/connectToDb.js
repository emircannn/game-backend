const mongoose = require('mongoose')
const logger = require('../utils/index').logger

connectToMongoDb=async(host,minPoolSize,maxPoolSize, connectTimeoutMS)=>{
    try {
        await mongoose.connect(`${host}`, {
            compressors: 'zlib',
            autoIndex: true,
            minPoolSize,
            maxPoolSize,
            connectTimeoutMS
        })
        logger.info('Connected to MongoDB');
        console.log(`Connected to Db`)
    } catch (err) {
        logger.info(`Error ${err.message}`);
        throw new Error(err.message)
    }
}
module.exports={
    connectToMongoDb
}