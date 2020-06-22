const drivelist = require('drivelist');
const glob = require('glob')
const { logger } = require('../../core/logger');

function onUsbAdd() {
    return new Promise((resolve, reject) => {
            const poll = setInterval(() => {
                drivelist.list().then((drives) => {
                    // const drives = await drivelist.list();
                    drives.forEach((drive) => {
                        if (drive.isUSB && drive.mountpoints) {

                            const mountPath = drive.mountpoints[0].path;
                            // if (!usbList.includes(mountPath)) {
                            // console.log('mountPath', mountPath); //op
                            glob(`${mountPath}/collection/*.db3`, null, function (er, files) {
                                if (er) {
                                    logger.error(er);
                                    return reject({ msg : 'FAIL' })
                                }
                                return resolve({ rawpath: mountPath ,fullpath: files})
                            });
                            // usbList.push(mountPath);
                            clearInterval(poll)
                            // }
                        }
                    })
                })
            }, 2000)
    });
}


module.exports = {
    onUsbAdd
}