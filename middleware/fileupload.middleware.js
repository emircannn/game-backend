const multer = require('multer');
const mimeTypes = require('../consts/index').general

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        const randomName = `${Date.now()}_${file.fieldname}_${file.originalname}`
        cb(null, randomName)
    }
})


const fileFilter = (req, file, cb) => {
    if(mimeTypes.IMAGE_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true)
        return
    }

    return cb(new Error('Desteklenmeyen Dosya Biçimi'), false)
}

const upload = multer({storage, fileFilter})
const uploadSingle = multer({storage, fileFilter}).single('image')

module.exports = {
    upload,
    uploadSingle
}