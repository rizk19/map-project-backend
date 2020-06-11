require('dotenv').config()
const http = require('http')
var usb = require('usb')
const usbDetect = require('usb-detection');
const drivelist = require('drivelist');

const { logger } = require('./core/logger')
const { registerTerminus } = require('./core/terminus')
const { createApp } = require('./server')
const { registerSocketio } = require('./core/socket')

const app = createApp()
const server = http.createServer(app)
registerTerminus(server)
registerSocketio(server)


usb.on('detach', (device) => {
  console.log('DETACH');

})

server.listen(process.env.APP_PORT, () => {
  logger.info('Server up...')
  logger.info(`http://localhost:${process.env.APP_PORT}/`)
  // })

})