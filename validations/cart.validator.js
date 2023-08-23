const { body, query, param } = require('express-validator')

const CartValidator = {
    validateAdd () {
        return [body('user').isMongoId(), body('game').isMongoId()]
    },
    validateUser () {
        return [body('user').isMongoId(),]
    },
    validateUserQuery () {
        return [query('user').isMongoId(),]
    },
    validateId () {
        return [query('id').isMongoId()]
    },
    validateUsername () {
        return [query('username').isString()]
    },
    validateFindByUsername () {
        return [param('userName').isString()]
    },
}

module.exports = CartValidator