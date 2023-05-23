const createEvent = function createEventEmitter(func) {
    const eventEmitter = require(`events`)
    const emitter = new eventEmitter()
    return emitter.on(`start`, func)
}
const emitEvent = function emitCustomEvent(event){
    event.emit(`start`)
}
module.exports.createEvent = createEvent
module.exports.emitEvent = emitEvent