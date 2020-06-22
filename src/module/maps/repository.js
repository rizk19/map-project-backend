const { dbsqlite } = require("../../core/database");

const base64ArrayBuffer = arrayBuffer => {
    let base64 = "";
    let encodings =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let bytes = new Uint8Array(arrayBuffer);
    let byteLength = bytes.byteLength;
    let byteRemainder = byteLength % 3;
    let mainLength = byteLength - byteRemainder;
    let a, b, c, d;
    let chunk;
    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12; // 258048 = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6; // 4032 = (2^6 - 1) << 6
        d = chunk & 63; // 63 = 2^6 - 1
        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }
    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
        chunk = bytes[mainLength];
        a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4; // 3 = 2^2 - 1
        base64 += encodings[a] + encodings[b] + "==";
    } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
        a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4; // 1008 = (2^6 - 1) << 4
        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2; // 15 = 2^4 - 1
        base64 += encodings[a] + encodings[b] + encodings[c] + "=";
    }

    return base64;
};

const getData = async () => {
    let query = 'SELECT * FROM data limit 2'
    return new Promise((resolve, reject) => {
        dbsqlite.all(query, (err, rows) => {
            if (err) {
                return reject({ msg: err, status: 'ERROR' })
            }
            let rawData = []
            const imageConverter = (params) => {
                if (params !== null) {
                    return new Uint8Array(params)
                } else {
                    return null
                }
            }
            rows.forEach(element => {
                rawData.push({
                    waktu: element.waktu,
                    latitude: element.latitude,
                    longitude: element.longitude,
                    speed: element.speed,
                    course: element.course,
                    imagedata1: imageConverter(element.imagedata1) ? "data:image/jpeg;base64," + base64ArrayBuffer(imageConverter(element.imagedata1)) : null,
                    imagedata2: imageConverter(element.imagedata2) ? "data:image/jpeg;base64," + base64ArrayBuffer(imageConverter(element.imagedata2)) : null,
                    imagedata3: imageConverter(element.imagedata3) ? "data:image/jpeg;base64," + base64ArrayBuffer(imageConverter(element.imagedata3)) : null
                })
            });
            return resolve({
                data: rawData,
                status: 'SUCCESS'
            })
        });
    })
};

const getDataAll = async (limit, offset) => {
    try {
        for (let intro = 0; intro < 2; intro++) {
            let queryFull = `SELECT waktu, latitude,longitude, course FROM data LIMIT ${limit} OFFSET ${offset}`
            dbsqlite.all(queryFull, (err, rows) => {
                return rows
            })
        }

    } catch (error) {

    }
};

const getDataByLimit = (limit, offset, onPage) => {
    console.log('==>', onPage, 'limit', limit, 'offset', offset);

    return new Promise((resolve, reject) => {
        let queryFull = `SELECT * FROM data LIMIT ${limit} OFFSET ${offset}`
        dbsqlite.all(queryFull, (err, rows) => {
            let rawData = []
            if (err) {
                return reject({ msg: err, status: 'ERROR' })
            }
            const imageConverter = (params) => {
                if (params !== null) {
                    return new Uint8Array(params)
                } else {
                    return null
                }
            }
            rows.forEach(element => {
                rawData.push({
                    waktu: element.waktu,
                    latitude: element.latitude,
                    longitude: element.longitude,
                    speed: element.speed,
                    course: element.course,
                    imagedata1: imageConverter(element.imagedata1) ? "data:image/jpeg;base64," + base64ArrayBuffer(imageConverter(element.imagedata1)) : null,
                    imagedata2: imageConverter(element.imagedata2) ? "data:image/jpeg;base64," + base64ArrayBuffer(imageConverter(element.imagedata2)) : null,
                    imagedata3: imageConverter(element.imagedata3) ? "data:image/jpeg;base64," + base64ArrayBuffer(imageConverter(element.imagedata3)) : null
                })
            });
            if (rawData) {
                return resolve(rawData)
            }
        })
    })
};

const getDataUsbSource = (db, limit, offset, onPage) => {
    console.log('==>',onPage,'limit',limit,'offset',offset);
    
    return new Promise((resolve, reject) => {
        let queryFull = `SELECT * FROM data LIMIT ${limit} OFFSET ${offset}`
        db.all(queryFull, (err, rows) => {
            let rawData = []
            if (err) {
                // return reject({ msg: err, status: 'ERROR' })
                this.loaded = reject(new Error('Resource not yet loaded!'));
            }
            const imageConverter = (params) => {
                if (params !== null) {
                    return new Uint8Array(params)
                } else {
                    return null
                }
            }
            rows.forEach(element => {
                rawData.push({
                    waktu: element.waktu,
                    latitude: element.latitude,
                    longitude: element.longitude,
                    speed: element.speed,
                    course: element.course,
                    imagedata1: imageConverter(element.imagedata1) ? "data:image/jpeg;base64," + base64ArrayBuffer(imageConverter(element.imagedata1)) : null,
                    imagedata2: imageConverter(element.imagedata2) ? "data:image/jpeg;base64," + base64ArrayBuffer(imageConverter(element.imagedata2)) : null,
                    imagedata3: imageConverter(element.imagedata3) ? "data:image/jpeg;base64," + base64ArrayBuffer(imageConverter(element.imagedata3)) : null
                })
            });
            if (rawData) {
                return resolve(rawData)
            }
        })
    })
};

function getLength() {
    let queryCount = 'SELECT COUNT(latitude) as total FROM data'
    return new Promise((resolve, reject) => {
        dbsqlite.all(queryCount, (err, rows) => {
            if (err) {
                return reject({ msg: err, status: 'ERROR' })
            }
            return resolve({
                total: rows[0].total,
                status: 'SUCCESS'
            })
        });
    })
}

function getLengthUsbSource(db) {
    let queryCount = 'SELECT COUNT(latitude) as total FROM data'
    return new Promise((resolve, reject) => {
        db.all(queryCount, (err, rows) => {
            if (err) {
                return reject({ msg: err, status: 'ERROR' })
            }
            return resolve({
                total: rows[0].total,
                status: 'SUCCESS'
            })
        });
    })
}


module.exports = {
    getData,
    getDataAll,
    getLength,
    getDataByLimit,
    getDataUsbSource,
    getLengthUsbSource
};