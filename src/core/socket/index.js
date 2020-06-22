const { socketMaps } = require('../../module/maps/socket');
const { usbListener } = require('../../module/usb/service');
const { socketDirectory } = require('../../module/listdirectory/socket');
const socket = require('socket.io');
const { logger } = require('../logger')

const registerSocketio = (server) => {
    let io = socket(server)

    let maps = io.of("/mapsocke");
    maps.on("connection", socket => {
        
        socketMaps(socket)

        usbListener(socket)

        socketDirectory(socket)
    });

};

module.exports = {
    registerSocketio
};