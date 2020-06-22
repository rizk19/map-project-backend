const { getDataAll, getLength } = require('./repository');
const { sendDataToMap } = require('./service')
const { sqlite3 } = require("../../core/database");
const { logger } = require('../../core/logger');

const socketMaps = socket => {
    socket.on('selectedDB', (path) => {
        logger.info("Map Socket Used");
        let db = new sqlite3.Database(path, (err) => {
            if (err) {
                return logger.error(err.message);
            }
            logger.info('Connected to the USB SQlite database.');
        });
        setTimeout(() => {
            sendDataToMap(socket, db);
        }, 300);
    });
}

module.exports = {
    socketMaps
};