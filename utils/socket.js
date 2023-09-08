const socket = require('socket.io');
let io;

module.exports = {
    init: (server) => {
        io = socket(server, {
            cors: {
                origin: '*'
            },
            pingTimeout: 30000,
        });
        return io;
    },
    getIO: () => {
        if (!io) {
            console.log(io)
        }
        return io;
    },
};