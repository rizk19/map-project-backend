const { getDataByLimit, getLength } = require('./repository')

async function sendDataToMap(socket) {
    const length = await getLength()
    let data;
    
    let limit = 100
    let offset = 0
    let onPage = 0
    // for (let onPage = 1; onPage <= Math.ceil(length.total / limit);onPage++) {
    //     data = await getDataByLimit(limit, offset, onPage)
        
    //     offset = limit * onPage // 1 -> 11 -> 21
    // }
    var handler = setInterval(async () => {
        data = await getDataByLimit(limit, offset, onPage+1)
        console.log(data);
        onPage++
        offset = limit * onPage
        if (onPage >= Math.ceil(length.total / limit)) {
            console.log('berhenti');
        socket.emit("stopper", {status :'SUCCESS'})
            
            clearInterval(handler)
        }
        socket.emit("data", data)
    }, 5000)
    
    
}

module.exports = {
    sendDataToMap
}