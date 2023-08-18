const helpers = require('../utils/index').helpers
const {StatusCodes} = require('http-status-codes')
const consts = require('../consts/index')

module.exports = (req,res,next) => {
    try {
        next()
        return
        if(!req.url.includes('/admin')){
            const token = req.header.authorization.split(" ")[1]
            console.log(token)
            const decodedToken = helpers.verifyToken(token)
            if (decodedToken.decodedToken === null) {
            //* 401 *//
            return res.status(StatusCodes.UNAUTHORIZED).send({
                message: consts.auth.UNAUHTRIZATION_MESSAGE
            })
            }
            req.user=decodedToken
            next()
        }

        next()
    } catch (err) {
        console.log(err)
        res.status(StatusCodes.UNAUTHORIZED).send({
            message: consts.auth.UNAUHTRIZATION_MESSAGE
        })
    }
}