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

const dbFunction = (path) => {
  let dbUSB = new sqlite3.Database(path, (err) => {
    if (err) {
      return logger.error(err.message);
    }
    logger.info('Connected to the USB SQlite database.');
    return dbUSB
  });
}

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
  dbsqlite,
  dbFunction,
  sqlite3
}