const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  messages: [{
    content: String,
    media: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
    isAdminMessage: {
      type: Boolean,
      default: false,
    },
  }],
  isReaded: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});
chatSchema.path('messages').default([]);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;