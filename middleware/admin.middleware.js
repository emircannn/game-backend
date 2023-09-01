const {StatusCodes} = require('http-status-codes')
const consts = require('../consts/index')
const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    try {
            const token = req?.headers?.authorization?.split(" ")[1]
            if (!token) {
                return res.status(401).json({ message: 'Token bulunamadı. Yetkilendirme reddedildi.' });
            }

            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Token doğrulama hatası. Yetkilendirme reddedildi.' });
                }

                if(decoded.role === 'admin') {
                    req.user = decoded
                    return next();
                }
                return res.status(401).json({ message: 'Token doğrulama hatası. Yetkilendirme reddedildi.' });
            });

    } catch (err) {
        console.log(err)
        res.status(StatusCodes.UNAUTHORIZED).send({
            message: consts.auth.UNAUHTRIZATION_MESSAGE
        })
    }
}