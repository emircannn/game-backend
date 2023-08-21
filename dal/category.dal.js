
const Category = require('../models/category.model')

const CategoryDataAccess = {
    async getAllCategory(){
        return Category.find()
    },
    async create(name,banner,character,seo){
        return Category.create({name,banner,character,seo})
    },
    async updateCategory(name,id,banner,character,seo){
        return Category.findByIdAndUpdate({_id: id},{name,banner,character,seo})
    },
    async deleteCategory(id){
        return Category.findByIdAndDelete({_id: id})
    },
    async findBySeo(seo){
        return Category.findOne({seo}).populate('game')
    },

}

module.exports = CategoryDataAccess