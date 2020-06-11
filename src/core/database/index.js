var path = require('path');
const sqlite3 = require('sqlite3').verbose();
const usbDetect = require('usb-detection');
const drivelist = require('drivelist');
const glob = require('glob')

const dbPath = path.resolve(__dirname, "./collection/vesel_data_15052018mesoa.db3")

const { logger } = require('../logger');

const dbsqlite = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.info('Connected to the vesel SQlite database.');
});

let usbList = [];

usbDetect.startMonitoring();
usbDetect.on('add', () => {
  const poll = setInterval(() => {
    drivelist.list().then((drives) => {
      // const drives = await drivelist.list();
      console.log('drives', drives);

      drives.forEach((drive) => {
        if (drive.isUSB) {
          const mountPath = drive.mountpoints[0].path;
          if (!usbList.includes(mountPath)) {
            console.log('mountPath', mountPath); //op
            glob(`${mountPath}/*.png`, null, function (er, files) {
              return new Promise((resolve, reject) => {
                console.log('file', files);
              });
            });

            usbList.push(mountPath);
            clearInterval(poll)
          }
        }
      })
    })
  }, 2000)
});
console.log('usblist', usbList);

// pool.query('SELECT NOW()')
//   .then(res => {
//     logger.info(`db connected`)
//   })
//   .catch(err => {
//     logger.error(err.message)
//   })

// dbsqlite.close((err) => {
//   if (err) {
//     return logger.error(err.message);
//   }
//   logger.info('Close the database connection.');
// });

module.exports = {
  dbsqlite
}