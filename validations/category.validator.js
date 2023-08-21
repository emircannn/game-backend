const { body, query, param } = require('express-validator')

const CategoryValidator = {
    validateCreateCategory() {
        return [body('name').not().isEmpty({ignore_whitespace: true}).withMessage('İsim alanı zorunludur!') ]
    },
    validateId () {
        return [query('id').isMongoId()]
    },
    validateSeo () {
        return [query('seo').isMongoId()]
    },
}

module.exports = CategoryValidator