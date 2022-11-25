/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { Participant, ParticipantCount, Event } = require('../models');
const asyncHandler = require('express-async-handler');
const { AppError } = require('../utilities');
const { generateFinalEventDate } = require('../services');

// adding a participant
const addParticipant = asyncHandler(async (req, res, next) => {
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   console.log(errors.array());
  //   return res.status(422).json({ errors: errors.array() });

  // }
  const { fullname, event_id, email, preferred_date_time } = req.body;
  let message;
  const participantExists = await Participant.find({ email: req.body.email });
  if (participantExists) {
    message = 'Participant exists';
    return next(new AppError(message, 409));
  }

  const eventExist = await Event.findById(event_id);
  if (!eventExist) {
    return next(new AppError('No event found with that ID', 404));
  }
  let participantCount = await ParticipantCount.findById(event_id);
  if (participantCount.participant_count === eventExist.participant_number) {
    eventExist.final_event_date = await generateFinalEventDate(Participant);
    eventExist.published = true;
    await eventExist.save();
    return;
  }
  await ParticipantCount.findByIdAndUpdate(
    { _id: event_id },
    { $inc: { participant_count: 1 } },
    {
      new: true,
      runValidators: true,
    }
  );

  const newParticipant = {
    fullname,
    event_id,
    email,
    preferred_date_time,
  };
  await Participant(newParticipant).save();

  // if (eventExist.participant_number ===)
  return services.createSendToken(newParticipant, 'success', message, res);
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
