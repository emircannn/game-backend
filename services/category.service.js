const Category = require('../models/category.model')
const categoryDal = require('../dal/index').categoryDal
const { filenameConverter,convertToSEOText, deleteFromDisk } = require('../utils/helper');

exports.getAll= async ()=>{
    try {
        const json = await categoryDal.getAllCategory()
        return json

    } catch (error) {
        throw new Error(error)
    }
}
exports.getBySeo= async (req)=>{
    try {
        const {seo} = req.query

        const json = await categoryDal.findBySeo(seo)
        return json

    } catch (error) {
        throw new Error(error)
    }
}

exports.createCategory= async (req)=>{
        try {
            const {name} = req.body
            const hasName = await Category.findOne({name})

            if(hasName) {
                deleteFromDisk(req.files.banner[0].filename)
                deleteFromDisk(req.files.character[0].filename)
            throw new Error('Bu isim halihazırda kullanımda')
            }
    
            const banner = await filenameConverter(req.files.banner[0].filename)
            const character = await filenameConverter(req.files.character[0].filename)
            const seo = convertToSEOText(name)
    
            if(banner && character) {
                const json = await categoryDal.create(name,banner,character,seo)
                return json
            }

            deleteFromDisk(req.files.banner[0].filename)
            deleteFromDisk(req.files.character[0].filename)
            throw new Error('Hata')
    
        } catch (error) {
            throw new Error(error)
        }
    }

exports.updateCategory= async (req)=>{
        try {
            const {name, id} = req.query

            const hasName = await Category.findOne({name})

            if(hasName) {
                deleteFromDisk(req.files?.banner ? req.files.banner[0].filename : '')
                deleteFromDisk(req.files?.character ? req.files.character[0].filename: '')
                throw new Error('Bu isim halihazırda kullanımda')
            }

            const banner = await filenameConverter(req.files?.banner ? req.files?.banner[0]?.filename : null)
            const character = await filenameConverter(req.files?.character ? req.files?.character[0]?.filename : null)
            const seo = convertToSEOText(name)

            const findedCategory = await Category.findById(id)
            const isDeletedBanner = deleteFromDisk(findedCategory.banner && req.files?.banner ? findedCategory.banner.split('uploads/')[1] : '')
            const isDeletedChar = deleteFromDisk(findedCategory.character && req.files?.character ? findedCategory.character.split('uploads/')[1] : '')

            if(isDeletedBanner && isDeletedChar) {
                const json = await categoryDal.updateCategory(name,id,banner,character,seo)
                return json
            }

    
        } catch (error) {
            throw new Error(error)
        }
    }

exports.deleteCategory = async (req) => {
    try {
        const {id} = req.query

        const currentCategory = await Category.findById(id)

        const isDeletedBanner = deleteFromDisk(currentCategory.banner ? currentCategory.banner.split('uploads/')[1] : '')
        const isDeletedChar = deleteFromDisk(currentCategory.character ? currentCategory.character.split('uploads/')[1] : '')

        if(isDeletedBanner && isDeletedChar) {
            const json = await categoryDal.deleteCategory(id)
            return json
        }

        throw new Error('Bir hata oluştu tekrar deneyin.')
    } catch (error) {
        throw new Error(error)
    }
}
