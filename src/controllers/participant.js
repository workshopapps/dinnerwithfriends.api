/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const { Participant, ParticipantCount, Event } = require('../models');
const asyncHandler = require('express-async-handler');
const { AppError } = require('../utilities');
const { createSendData } = require('../services');
const {
  generateFinalEventDate,
} = require('../services/generateFinalEventDate');
const { createParticipantSchema } = require('../validators');
const Invitation = require('../models/invitation');
// const sendCalendarMail = require('../services/Mail/nodemailer');
// const { generateJWTToken } = require('../services/auth');

// adding a participant
// adding a participant
const addParticipant = asyncHandler(async (req, res, next) => {
  const { fullname, event_id, email, preferred_date_time } = req.body;

  const validateUserInput = createParticipantSchema.validate({
    fullname,
    event_id,
    email,
    preferred_date_time,
  });

  let message;

  if (validateUserInput.error) {
    message = '';
    if (validateUserInput.error.details[0].path[0] === 'fullname')
      message =
        'Name has to start with a letter, can contain spaces, must be at least 3 characters, and no more than 30 characters. No special characters allowed';
    if (validateUserInput.error.details[0].path[0] === 'event_id')
      message = 'event id must be a valid mongodb id string.';
    if (validateUserInput.error.details[0].path[0] === 'email')
      message =
        'Email has to start with a letter, can contain numbers and underscores, must be at least 3 characters, must have @com or @net. No spaces and no other special characters allowed';
    if (validateUserInput.error.details[0].path[0] === 'preferred_date_time')
      message = 'A date field is required';
    return next(new AppError(message, 404));
  }

  const eventExist = await Event.findById(event_id);
  if (!eventExist) {
    return next(new AppError('No event found with that ID', 404));
  }
  const participantExists = await Participant.findOne({
    email: req.body.email,
    event_id: event_id,
  });

  if (participantExists) {
    message = 'Participant already accepted invite';
    return next(new AppError(message, 409));
  }
  let participantCount = await ParticipantCount.findOne({ event_id: event_id });
  if (participantCount && participantCount.participant_count < eventExist.participant_number) {
    participantCount.participant_count += 1
    await participantCount.save()
  }

  const newParticipantData = {
    fullname,
    event_id,
    email,
    preferred_date_time,
  };
  const participant = await new Participant(newParticipantData).save();
  const foundInvitation = await Invitation.findOne({
    email: email,
    event_id,
  });
  if (foundInvitation) {
    foundInvitation.status = 'accepted';
    await foundInvitation.save();
  }

  // const eventToken = await generateJWTToken(
  //   { event_id, email },
  //   process.env.INVITATION_TOKEN_SECRET,
  //   '90d'
  // );

  // // send calendar email to participants
  // const the_message = 'https://api.catchup.hng.tech/api/v1/calendar/save/'+eventToken
  // sendCalendarMail.sendCalendar(the_message, email)

  if (participantCount.participant_count === eventExist.participant_number && eventExist.final_event_date === null) {
    const finalEventDate = await generateFinalEventDate(Participant, event_id);
    eventExist.final_event_date = finalEventDate;
    eventExist.published = 'decided';
    await eventExist.save();
  }
  return createSendData(participant, 'success', message, res);
});

// deleting a participant
const deleteParticipant = (req, res, next) => {
  Participant.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({ message: 'Participant deleted' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// Updating a Participant
const updateParticipant = (req, res, next) => {
  Participant.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        fullname: req.body.fullname,
        email: req.body.email,
        prefered_date_time: req.body.prefered_date_time,
      },
    },
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({ message: 'Participant updated' });
      }
    }
  );
};

module.exports = {
  addParticipant,
  deleteParticipant,
  updateParticipant,
};
