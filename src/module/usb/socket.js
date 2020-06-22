function send(socket, file) {
    socket.emit("usbfile", file)
}

function remove(socket, file) {
    console.log('DETACH USB SOCKET');
    socket.emit("usbdisconnect", { status: "DISCONNECT" })
}

module.exports = {
    send,
    remove
}