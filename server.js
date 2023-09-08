const express = require('express');
const http = require('http');
const socketIo = require('./utils/socket');
const app = express();
const cors = require('cors');
const { default: helmet } = require('helmet');
const { connectToMongoDb } = require('./db/connectToDb');
const configs = require('./configs/index');
const middleware = require('./middleware/index');
const consts = require('./consts/index');
const router = require('./router/index');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const Game = require('./models/game.model');

const server = http.createServer(app);
const io = socketIo.init(server);

io.on('connection', (socket) => {
  console.log(socket.id);
})

configs.serverConfig.initialServerConfig();
const PORT = process.env.PORT;

app.use('/uploads', express.static('uploads'));

app.use('/', (req, res) => {
    res.send('Welcome')
})

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet());
app.use(cors());

app.use(middleware.loggerMiddleware);

app.use(`${process.env.APP_PREFIX}${consts.router.USER}`, router.userRouter.user);
app.use(`${process.env.APP_PREFIX}${consts.router.CATEGORY}`, router.categoryRouter.category);
app.use(`${process.env.APP_PREFIX}${consts.router.GAME}`, router.gameRouter.game);
app.use(`${process.env.APP_PREFIX}${consts.router.REVIEW}`, router.reviewRouter.review);
app.use(`${process.env.APP_PREFIX}${consts.router.CART}`, router.cartRouter.cart);
app.use(`${process.env.APP_PREFIX}${consts.router.ORDER}`, router.orderRouter.order);
app.use(`${process.env.APP_PREFIX}${consts.router.AUTH}`, router.authRouter.auth);
app.use(`${process.env.APP_PREFIX}${consts.router.ADMIN}`, router.adminRouter.admin);
app.use(`${process.env.APP_PREFIX}${consts.router.CHAT}`, router.chatRouter.chat);

connectToMongoDb(
    process.env.DATABASE_URL,
    process.env.MONGODB_MIN_POOL_SIZE,
    process.env.MONGODB_MAX_POOL_SIZE,
    process.env.MONGODB_CONNECTION_TIMEOUT);

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB bağlantı hatası:', error);
});

db.once('open', () => {
    console.log('MongoDB bağlantısı başarıyla açıldı.');

    setInterval(() => {
        Game.updateExpiredDiscounts();
        Game.updateExpiredPreOrderDate();
    }, 6 * 60 * 60 * 1000);
});

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
