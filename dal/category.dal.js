
const Category = require('../models/category.model')

const CategoryDataAccess = {
    async getAllCategory(req){
        const page = parseInt(req.query.page) - 1 || 0
        const name = req.query.name || ""
        const limit = 6
        const totalGames = await Category.countDocuments({name: { $regex: new RegExp(name, "i") }})
        const totalPages = Math.ceil(totalGames / limit);

        const categories = await Category.find({name: { $regex: new RegExp(name, "i") }})
        .select('name seo banner character')
        .skip(page * limit)
        .limit(limit)

        return {totalPages, categories}
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