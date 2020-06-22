var path = require('path');
const glob = require('glob')
const dbPath = path.resolve(__dirname, "../../core/database/collection")

function read() {
    return new Promise((resolve, reject) => {
        glob(`${dbPath}/*.db3`, null, function (er, files) {
            if (er) {
                return reject({ msg: 'FAIL' })
            }
            return resolve({ rawpath: dbPath ,fullpath: files})
        });
    });
}

module.exports = {
    read
}