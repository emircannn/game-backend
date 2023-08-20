
const Category = require('../models/category.model')

const CategoryDataAccess = {
    async create(name,banner,character,seo){
        return Category.create({name,banner,character,seo})
    },
    async uploadPhotos({name, banner}){
        return Category.updateOne({name},{banner})
    },

}

module.exports = CategoryDataAccess