const Category = require('../models/category.model')
const categoryDal = require('../dal/index').categoryDal
const fileService = require('../services/file.service')
const utils = require('../utils/index');

exports.createCategory= async (req,res)=>{
        try {
            const {name} = req.body

            const hasName = await Category.findOne({name})

            if(hasName) {
            throw new Error('Bu isim halihazırda kullanımda')
            }
    
            const banner = await fileService.uploadFile(req, res)
            const character = "deneme"/* await fileService.uploadFile2(req, res) */
            const seo = utils.helpers.convertToSEOText(name)
    
            const json = await categoryDal.create(name,banner,character,seo)
            return json
    
        } catch (error) {
            throw new Error(error)
        }
    }

exports.updateCategory= async (req)=>{
        try {
            const {id} = req.query
            const {name} = req.body

            const hasName = await Category.findOne({name})

            if(hasName) {
            throw new Error('Bu isim halihazırda kullanımda')
            }
    
            const findedUser = await Category.findById(id)
            const isDeleted = utils.helpers.deleteFromDisk(findedUser.banner ? findedUser.banner.split('uploads/')[1] : '')
            const isDeleted2 = utils.helpers.deleteFromDisk(findedUser.character ? findedUser.character.split('uploads/')[1] : '')
            const banner = await fileService.uploadFile(req, res)
            const character = await fileService.uploadFile2(req, res)
            const seo = utils.helpers.convertToSEOText(name)
    
            if(isDeleted & isDeleted2) {
                const json = await categoryDal.create(name,banner,character,seo)
                return json
            }
            throw new Error('Hata')
    
        } catch (error) {
            throw new Error(error)
        }
    }
