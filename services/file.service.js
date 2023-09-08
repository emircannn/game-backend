const {uploadSingle} = require('../middleware/fileupload.middleware')
const multer = require('multer');

exports.uploadFile = (req, res) => {
    return new Promise((resolve, reject) => {
        uploadSingle(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                reject(err);
            } else if (err) {
                reject(err);
            }
            const ip = process.env.DOMAIN
            const filePath = process.env.FILE_PATH
            const fileName = req.file?.filename
            const fileString = `${ip}${filePath}${fileName}`
            resolve(fileString)
        })
    })
};