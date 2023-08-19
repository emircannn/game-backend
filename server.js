const express = require('express');
const app = express();
const cors = require('cors');
const {default: helmet} = require('helmet');
const { connectToMongoDb } = require('./db/connectToDb') ;
const configs = require('./configs/index')
const middleware = require('./middleware/index')
const consts = require('./consts/index')
const router = require('./router/index')
const utils = require('./utils/index')

configs.serverConfig.initialServerConfig()
const PORT = process.env.PORT

utils.helpers.createUploadDir('./uploads')

app.use('/uploads', express.static('uploads'))

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use(middleware.loggerMiddleware)

app.use(`${process.env.APP_PREFIX}${consts.router.USER}`, router.userRouter.user)

connectToMongoDb(
    process.env.DATABASE_URL,
    process.env.MONGODB_MIN_POOL_SIZE,
    process.env.MONGODB_MAX_POOL_SIZE,
    process.env.MONGODB_CONNECTION_TIMEOUT).then(() => {
        app.listen(PORT, () => {
            console.log(`listening on ${PORT}`)
        })
    })
