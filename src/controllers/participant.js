/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { Participant, ParticipantCount, Event } = require('../models');
const asyncHandler = require('express-async-handler');
const { AppError } = require('../utilities');
const { createSendData } = require('../services');
const {
  generateFinalEventsDates,
} = require('../services/generateFinalEventDate');
const Invitation = require('../models/invitation');
const sendCalendarMail = require('../services/Mail/nodemailer');
const { generateJWTToken } = require('../services/auth');

// adding a participant
const addParticipant = asyncHandler(async (req, res, next) => {
  const { fullname, event_id, email, preferred_date_time } = req.body;
  let message;

  const eventExist = await Event.findById(event_id);
  if (!eventExist) {
    return next(new AppError('No event found with that ID', 404));
  }
  let participantCount = await ParticipantCount.find({ event_id });
  if (participantCount[0].participant_count === eventExist.participant_number) {
    await generateFinalEventsDates();
    return next(
      new AppError('Event date already decided please refresh the page', 404)
    );
  }
  const participantExists = await Participant.findOne({
    email: req.body.email,
  });
  if (participantExists) {
    message = 'Participant exists';
    return next(new AppError(message, 409));
  }

  await ParticipantCount.findOneAndUpdate(
    { event_id: event_id },
    { $inc: { participant_count: 1 } },
    {
      new: true,
      runValidators: true,
    }
  );

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
