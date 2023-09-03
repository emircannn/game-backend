const Game = require('../models/game.model')
const Category = require('../models/category.model')
const gameDal = require('../dal/index').gameDal
const { filenameConverter,convertToSEOText, deleteFromDisk, filenameManyConverter, deleteManyFromDisk } = require('../utils/helper');

exports.getAll = async (req) => {
    try {
        const json = await gameDal.getAllGame(req);
        return json
    } catch (error) {
        throw new Error
    }
};

exports.getBySeo = async (req) => {
    try {
        const {seo} = req.query
        const json = await gameDal.getBySeo(seo);
        return json
    } catch (error) {
        throw new Error
    }
};

exports.createGame = async (req) => {
    try {
        const {
            name, platform, discountRate,
            releaseDate, youtubeLink, discountDate,
            developer, desc, preOrderDate,
            stok, similarGames,
            price, minimumSystemRequirements,
            category,recommendedSystemRequirements
        } = req.body;

        const discountPrice = discountRate ? price - (price * discountRate/100) : null
        const seo = await convertToSEOText(name)

        const game = new Game({
            name, platform, discountRate,
            releaseDate, youtubeLink, discountDate,
            developer, desc, preOrderDate,
            stok, similarGames,discountPrice,
            price, minimumSystemRequirements,seo,
            category,recommendedSystemRequirements
        })

        const isUseName = await Game.findOne({name})
        const isUseSeo = await Game.findOne({seo})

        if(isUseName && isUseSeo) {
            throw new Error('Bu isim halihazırda kullanımda')
        }

        const json = await gameDal.create(game)
        await Category.findByIdAndUpdate({_id: category},{ $push: { game: json._id }})
        return json

    } catch (error) {
        throw new Error(error.message)
    }
};

exports.updateGame = async (req) => {
    try {
        const {
            name, platform, discountRate,
            releaseDate, youtubeLink, discountDate,
            developer, desc, preOrderDate,
            stok, similarGames,
            price, minimumSystemRequirements,
            category,recommendedSystemRequirements
        } = req.body;

        const {seoName} = req.query

        const discountPrice = discountRate && price ? price - (price * discountRate/100) : undefined
        const seo = name ? convertToSEOText(name) : undefined

        const isUseName = await Game.findOne({name})
        const isUseSeo = await Game.findOne({seo})

        if(isUseName && isUseSeo) {
            throw new Error('Bu isim halihazırda kullanımda')
        }

        const json = await gameDal.update(name, platform, discountRate,
            releaseDate, youtubeLink, discountDate,
            developer, desc, preOrderDate,
            stok, similarGames,discountPrice,
            price, minimumSystemRequirements,seo,
            category,recommendedSystemRequirements,seoName)
        if(category) {
            Category.findByIdAndUpdate({_id: category},{ $push: { game: json._id }})
        }
        return json

    } catch (error) {
        throw new Error(error.message)
    }
};

exports.uploadImage= async (req)=>{
    try {
        const {seo} = req.query
        const coverImage = await filenameConverter(req.files?.coverImage ? req.files?.coverImage[0]?.filename : null)
        const bannerImage = await filenameConverter(req.files?.bannerImage ? req.files?.bannerImage[0]?.filename : null)
        const images = await filenameManyConverter(req.files?.gameImages)
        const findedGame = await Game.findOne({seo})

        const isDeletedCover =req.files?.coverImage ? deleteFromDisk(findedGame.coverImage ? findedGame.coverImage.split('uploads/')[1] : '') : true
        const isDeletedBanner =req.files?.bannerImage ? deleteFromDisk(findedGame.bannerImage ? findedGame.bannerImage.split('uploads/')[1] : '') : true
        const isDeletedImages = req.files?.gameImages ? deleteManyFromDisk(findedGame.images ? findedGame.images : '') : true

        if(isDeletedCover && isDeletedBanner && isDeletedImages) {
            const json = gameDal.uploadImage(seo,coverImage,bannerImage,images)
            return json
        }
        throw new Error('Hata')

    } catch (error) {
        throw new Error(error)
    }
}

exports.deleteGame = async (req) => {
    try {
        const {id} = req.query

        const findedGame = await Game.findById(id)

        const isDeletedCover = deleteFromDisk(findedGame.coverImage ? findedGame.coverImage.split('uploads/')[1] : '') 
        const isDeletedBanner = deleteFromDisk(findedGame.bannerImage ? findedGame.bannerImage.split('uploads/')[1] : '')
        const isDeletedImages =  deleteManyFromDisk(findedGame.images ? findedGame.images : '')
        
        if(isDeletedCover && isDeletedBanner && isDeletedImages) {
            await Category.findByIdAndUpdate({_id: findedGame.category},{ $pull: { game: id }})
            const json = await gameDal.delete(id)
            return json
        }

        throw new Error('Bir hata oluştu')

    } catch (error) {
        throw new Error(error.message)
    }
};