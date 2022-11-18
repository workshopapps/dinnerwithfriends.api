const asyncHandler = require("express-async-handler");
const services = require("../services");
const {createParticipantSchema} = require("../validators");
const {Participant} = require("../models");

const addParticipant = asyncHandler(async (req, res, next) => {
    const {fullname, email, participant_id, prefered_date_time} = req.body;

    const validateUserInput = createParticipantSchema.validate({ fullname, email, prefered_date_time });

    const participantData = {
            fullname,
            email,
            participant_id,
            prefered_date_time
        }

        const participant = await new Participant(participantData).save();
        const message = 'Participant added successfully';
        return services.newParticipantToken(participant, 'success', message, res);
  });

  module.exports = {
    addParticipant
  }