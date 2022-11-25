const createUserSchema = require("./createUser")
const createParticipantSchema = require("./createParticipant");
const loginUserSchema = require("./loginUser")
const createEventSchema = require("./createEvent")
const updatedUserSchema = require("./updateUser")

module.exports = {
createUserSchema, createParticipantSchema,createEventSchema,loginUserSchema,updatedUserSchema
}