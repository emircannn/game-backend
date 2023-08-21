const Game = require('../models/game.model')
const Category = require('../models/category.model')
const gameDal = require('../dal/index').gameDal
const { filenameConverter,convertToSEOText, deleteFromDisk, filenameManyConverter, deleteManyFromDisk } = require('../utils/helper');

exports.getAll = async () => {
    try {
        const json = await gameDal.getAllGame();
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

        const discountPrice = price - (price * discountRate/100)
        const seo = convertToSEOText(name)

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
        Category.findByIdAndUpdate({_id: category},{ $push: { game: json._id }})
        return json

    } catch (error) {
        throw new Error(error.message)
    }
};

exports.uploadImage= async (req)=>{
    try {
        const {seo, youtubeLink} = req.query

        const coverImage = await filenameConverter(req.files?.coverImage ? req.files?.coverImage[0]?.filename : null)
        const bannerImage = await filenameConverter(req.files?.bannerImage ? req.files?.bannerImage[0]?.filename : null)
        const images = await filenameManyConverter(req.files.images)
        const findedGame = await Game.findOne({seo})

        const isDeletedCover = deleteFromDisk(findedGame.coverImage ? findedGame.coverImage.split('uploads/')[1] : '')
        const isDeletedBanner = deleteFromDisk(findedGame.bannerImage ? findedGame.bannerImage.split('uploads/')[1] : '')
        const isDeletedImages = deleteManyFromDisk(findedGame.images ? findedGame.images : '')

        if(isDeletedCover && isDeletedBanner && isDeletedImages) {
            const json = gameDal.uploadImage(seo, youtubeLink,coverImage,bannerImage,images)
            return json
        }
        throw new Error('Hata')

    } catch (error) {
        throw new Error(error)
    }
}