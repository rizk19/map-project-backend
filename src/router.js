
const registerRoute = (app) => {
  app.use('/maps', require('./module/maps/controller'))
}

module.exports = {
  registerRoute
}