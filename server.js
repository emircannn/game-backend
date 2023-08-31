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
const cookieParser = require('cookie-parser');

configs.serverConfig.initialServerConfig()
const PORT = process.env.PORT

utils.helpers.createUploadDir('./uploads')

app.use('/uploads', express.static('uploads'))

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet())
app.use(cors())

app.get('/', async (req, res, next) =>{
    res.send('Cookiesss')
})


app.use(middleware.loggerMiddleware)

app.use(`${process.env.APP_PREFIX}${consts.router.USER}`, router.userRouter.user)
app.use(`${process.env.APP_PREFIX}${consts.router.CATEGORY}`, router.categoryRouter.category)
app.use(`${process.env.APP_PREFIX}${consts.router.GAME}`, router.gameRouter.game)
app.use(`${process.env.APP_PREFIX}${consts.router.REVIEW}`, router.reviewRouter.review)
app.use(`${process.env.APP_PREFIX}${consts.router.CART}`, router.cartRouter.cart)
app.use(`${process.env.APP_PREFIX}${consts.router.ORDER}`, router.orderRouter.order)
app.use(`${process.env.APP_PREFIX}${consts.router.AUTH}`, router.authRouter.auth)
app.use(`${process.env.APP_PREFIX}${consts.router.ADMIN}`, router.adminRouter.admin)

connectToMongoDb(
    process.env.DATABASE_URL,
    process.env.MONGODB_MIN_POOL_SIZE,
    process.env.MONGODB_MAX_POOL_SIZE,
    process.env.MONGODB_CONNECTION_TIMEOUT).then(() => {
        app.listen(PORT, () => {
            console.log(`listening on ${PORT}`)
        })
    })
