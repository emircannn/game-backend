const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    rate: {
        type: Number,
    },
    review: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
    },
    like: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    dislike: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
},{
    minimize: true,
    timestamps: true,
    autoIndex: true
})

reviewSchema.post("save", async function (doc) {
    const gameId = doc.game;
    const avgRating = await mongoose.model("Review").aggregate([
      {
        $match: { game: gameId },
      },
      {
        $group: {
          _id: "$game",
          avgRating: { $avg: "$rate" },
        },
      },
    ]);
  
    await mongoose.model("Game").updateOne(
      { _id: gameId },
      { $set: { rating: avgRating[0].avgRating } }
    );
  });


  reviewSchema.post("findOneAndDelete", async function (doc) {
    const gameId = doc.game;
    const avgRating = await mongoose.model("Review").aggregate([
      {
        $match: { game: gameId },
      },
      {
        $group: {
          _id: "$game",
          avgRating: { $avg: "$rate" },
        },
      },
    ]);
  
    await mongoose.model("Game").updateOne(
      { _id: gameId },
      { $set: { rating: avgRating[0].avgRating } }
    );
  });

const Review = mongoose.model('Review', reviewSchema, 'review')

module.exports = Review