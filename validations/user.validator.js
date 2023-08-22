const { body, query, param } = require('express-validator')

const UserValidator = {
    validateCreateUser() {
        return [body('name').not().isEmpty({ignore_whitespace: true}), body('username').not().isEmpty({ignore_whitespace: true}), 
        body('email').not().isEmpty({ignore_whitespace: true}), body('password').not().isEmpty({ignore_whitespace: true})]
    },
    validateUploadLogo () {
        return [query('id').isMongoId()]
    },
    validateUploadLogo () {
        return [query('id').isMongoId()]
    },
    validateUsername () {
        return [query('username').isString()]
    },
    validateFindByUsername () {
        return [param('userName').isString()]
    },
}

module.exports = UserValidator