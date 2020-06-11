const { getDataAll, getLength } = require('./repository');
const { sendDataToMap } = require('./service')

const socketMaps = io => {
    const maps = io.of("/mapsocke");
    
    // let socketVar = maps.on("connection", socket => {
    //     return new Promise((resolve, reject) => {
    //         console.log('SOCKET START');
    //         return resolve(socket)
    //     })
    // })
    // maps.on("connection", socket => {
    //     sendDataToMap(socket);
    // })
    
}

module.exports = {
    socketMaps
};