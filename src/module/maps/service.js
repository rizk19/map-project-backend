const { getLengthUsbSource, getDataUsbSource } = require('./repository')
const { logger } = require('../../core/logger');

async function sendDataToMap(socket, db) {
    
    const length = await getLengthUsbSource(db)
    let data;

    let limit = 200
    let offset = 0
    let onPage = 0
    
    var handler = setInterval(async () => {
        data = await getDataUsbSource(db, limit, offset, onPage + 1)
        onPage++
        offset = limit * onPage
        if (onPage >= Math.ceil(length.total / limit)) {
            logger.info('DATA QUERY STOP');
            socket.emit("stopper", { status: 'SUCCESS' })

            clearInterval(handler)
        }
        socket.emit("data", { data: data, length : length })
    }, 5000)

}

module.exports = {
    sendDataToMap
}