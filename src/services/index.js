const {createSendToken, protect} = require("./auth")
const {newEventToken, protectEvent} = require("./event")


module.exports = {
    createSendToken,
    protect,
    newEventToken,
    protectEvent
}