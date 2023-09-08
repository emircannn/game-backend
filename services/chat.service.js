const User = require('../models/user.model')
const Chat = require('../models/chat.model');
const { filenameConverter } = require('../utils/helper');
const socketIoUtil = require('../utils/socket');
const { chatFilter } = require('../dal/sort&filter');

exports.userSendMessage = async (req) => {
    const io = socketIoUtil.getIO()
  try {
    const { chat, content } = req.body;
    const media = await filenameConverter(req.files?.media ? req.files?.media[0]?.filename : null)
    existChat = await Chat.findOne({chat})
    const message = {
        isAdminMessage: false,
        content,
        media,
        timestamp: Date.now()
    };
    if (!existChat) {
        const newChat = new Chat({ chat });
        newChat.messages.push(message);
        await newChat.save();
        io.emit('sendMessage', {chat, message});
        io.emit('notification', 'Yeni bir destek talebi var');
        return newChat;
    }
    existChat.isReaded = false;
    existChat.messages.push(message);
    await existChat.save();
    io.emit('notification', 'Yeni bir destek talebi var');
    io.emit('sendMessage', {chat, message});
    return existChat;
  } catch (error) {
    throw new Error(error);
  }
};

exports.adminMessage = async (req) => {
    const io = socketIoUtil.getIO()
    try {
        const { chat, content } = req.body;
        const media = await filenameConverter(req.files?.media ? req.files?.media[0]?.filename : null)
        const chatMessage = await Chat.findOne({chat})
        const message = {
            isAdminMessage: true,
            content,
            media,
            timestamp: Date.now()
        };
        chatMessage.isReaded = true;
        chatMessage.messages.push(message);
        await chatMessage.save();
        io.emit('sendMessage',  {chat, message});
        return chatMessage
    } catch (error) {
        throw new Error(error)
    }
};
exports.getAdminMessage = async (req) => {
    try {
        const {username} = req.query
        const findedUser = await User.findOne({username})

        return await Chat.findOne({chat: findedUser?._id}).populate({path: 'chat', select: 'image username name'})

    } catch (error) {
        throw new Error(error)
    }
};

exports.getMessage = async (req) => {
    try {
        const {id} = req.query

        return await Chat.findOne({chat: id})

    } catch (error) {
        throw new Error(error)
    }
};

exports.getAll = async (req) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0
        const filter = req.query.filter
        const chatFilters = chatFilter({answered: filter})
        const limit = 6
        const totalGames = await Chat.countDocuments(chatFilters)
        const totalPages = Math.ceil(totalGames / limit);

        const chats = await Chat.find(chatFilters)
        .populate({path: 'chat', select: 'username'})
        .skip(page * limit)
        .limit(limit)
        .sort({
            updatedAt: -1
        })
        .lean();

        const chatsWithLastMessage = chats.map((chat) => {
            const lastMessage = chat.messages
              .filter((message) => !message.isAdminMessage)
              .slice(-1)[0];
            return { ...chat, messages: [lastMessage] };
          });
  
          return { chats: chatsWithLastMessage, totalPages };

    } catch (error) {
        throw new Error(error)
    }
};