const { read } = require('./service')
const { logger } = require('../../core/logger');

const socketDirectory = async socket => {
    const readResult = await read()
    socket.on('requestListDirectory', (status) => {
        logger.info("Directory Socket Used");
        socket.emit("listDirectory", readResult)
    });
}

module.exports = {
    socketDirectory
};