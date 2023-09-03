const Category = require('../models/category.model')

exports.sortBy= (sort) => {
    let sortBy = {}

        if(sort === 'created') {
            sortBy = {createdAt: -1}
        }
        if(sort === 'price') {
            sortBy = {price: -1}
        }
        if(sort === 'priceasc') {
            sortBy = {price: 1}
        }
        if(sort === 'new') {
            sortBy = {releaseDate: -1}
        }
        if(sort === 'old') {
            sortBy = {releaseDate: 1}
        }
        if(sort === 'reviews') {
            sortBy = {rating: -1}
        }
        if(sort === 'discount') {
            sortBy = {discountRate: -1}
        }

        return sortBy
}

exports.filter =({name, category, platform, stok, minPrice, maxPrice, preOrder, weeklyDiscount}) => {
    const filter = {};
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    if (name) {
        filter.name = { $regex: new RegExp(name, "i") };
    }

    if(weeklyDiscount) {
        filter.discountDate = { $lt: sevenDaysAgo, $ne: null };
    }

    if (category) {
        filter.category = category?._id;
    }

    if (platform) {
        filter.platform = platform;
    }

    if (minPrice && maxPrice) {
        filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
        filter.price = { $gte: minPrice }; 
    } else if (maxPrice) {
        filter.price = { $lte: maxPrice }; 
    }

    if(preOrder) {
        filter.preOrderDate = { $ne: null };
    }

    if (stok === 0) {
        filter.stok = 0;
    } else if (stok === 1) {
        filter.stok = { $gt: 0 };
    }
    else if (stok === 'all') {
        
    }

    return filter;
}