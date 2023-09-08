const Game = require('../models/game.model')
const Cart = require('../models/cart.model')
const cartDal = require('../dal/index').cartDal

exports.getAll = async (req) => {
    try {
        const json = await cartDal.getAll(req);
        return json
    } catch (error) {
        throw new Error(error)
    }
};

exports.getUserCart = async (req) => {
    try {
        const {id} = req.query

        const json = await cartDal.getUserCart(id);
        return json
    } catch (error) {
        throw new Error(error)
    }
};

exports.cartCount = async (req) => {
    try {
        const {id} = req.query

        const json = await cartDal.cartCount(id);
        return json
    } catch (error) {
        throw new Error(error)
    }
};

exports.addToCart = async (req) => {
    try {

        const {user, game} = req.body

        const findedCart = await Cart.findOne({user})
        const findedGame = await Game.findById(game)
        const total = findedGame.discountPrice ? findedGame.discountPrice : findedGame.price
        const subtotal = findedGame.price

        if(findedGame.stok <= 0) {
            throw new Error('Bu oyun stoklarda mevcut değil')
        }

        if(findedCart && findedCart.game.includes(game)) {
            throw new Error('Bu oyun zaten sepetinizde')
        }

        if (findedCart) {
            const gamePrice = findedGame.discountPrice ? findedGame.discountPrice : findedGame.price;
            const total = findedCart.total + gamePrice;
            const subtotal = findedGame.price + findedCart.subtotal
            return await Cart.findOneAndUpdate({ user: user }, {$push: { game: game },$set: { total, subtotal }},{ new: true })
        }

        const json = await cartDal.addToCart(user, game, total, subtotal);
        return json
    } catch (error) {
        throw new Error(error)
    }
};
exports.delete = async (req) => {
    try {
        const { user, game } = req.body;
        const findedCart = await Cart.findOne({ user });
        const findedGame = await Game.findById(game);

        if (!findedCart || !findedGame) {
            throw new Error('Sepet veya oyun bulunamadı.');
        }

        const gamePrice = findedGame.discountPrice || findedGame.price;

        // Oyunu sepette bulunuyor mu kontrol et
        const gameIndex = findedCart.game.findIndex(cartGame => cartGame.toString() === game);

        if (gameIndex === -1) {
            throw new Error('Oyun sepette bulunamadı.');
        }

        // Sepetin oyunlarından sil
        findedCart.game.splice(gameIndex, 1);

        // Toplam fiyatı güncelle
        const total = findedCart.total - gamePrice;

        // Yeni subtotal hesapla (tüm oyunların fiyatlarını topla)
        const remainingGames = await Game.find({ _id: { $in: findedCart.game } });
        const subtotal = remainingGames.reduce((acc, cartGame) => {
            const gamePrice = cartGame.price;
            return acc + gamePrice;
        }, 0);

        // Sepeti güncelle
        const updatedCart = await Cart.findOneAndUpdate(
            { user: user },
            { game: findedCart.game, total, subtotal },
            { new: true }
        );

        if (!updatedCart) {
            throw new Error('Sepet güncellenemedi.');
        }

        return updatedCart;
    } catch (error) {
        throw new Error(error.message);
    }
};