const { body, query, param } = require('express-validator')

const ReviewValidator = {
    validateCreate () {
        return [body('user').not().isEmpty({ignore_whitespace: true}).isMongoId(),
        body('game').not().isEmpty({ignore_whitespace: true}).isMongoId(),
        body('rate').not().isEmpty({ignore_whitespace: true}).withMessage('Puan alanı zorunludur!').isNumeric(),
        body('review').not().isEmpty({ignore_whitespace: true}).withMessage('Değerlendirme alanı zorunludur!').isString(),]
    },
    validateId () {
        return [query('id').isMongoId()]
    },
    validateSeo () {
        return [query('seo').isString()]
    },
}

module.exports = ReviewValidator