const { socketMaps } = require('../../module/maps/socket');
const socket = require('socket.io');

const registerSocketio = (server) => {
    const io = socket(server)
    socketMaps(io)
};


module.exports = {
    registerSocketio
};