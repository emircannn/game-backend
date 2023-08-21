const { body, query, param } = require('express-validator')

const GameValidator = {
    validateId () {
        return [query('id').isMongoId()]
    },
    validateSeo () {
        return [query('seo').isString()]
    },
}

module.exports = GameValidator