const { onUsbAdd } = require("./listener");
const { send, remove } = require("./socket")
const usbDetect = require('usb-detection');
const { logger } = require('../../core/logger');

function usbListener(socket) {
    usbDetect.on('add', async () => {
        logger.info("USB Listener Socket Used");
        let usbResult = await onUsbAdd()
        if (usbResult) {
            send(socket, usbResult)
        }
    });
    usbDetect.on('remove', () => {
        remove(socket)
    });
}

module.exports = {
    usbListener
}