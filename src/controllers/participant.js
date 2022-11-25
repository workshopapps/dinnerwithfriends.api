/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { Participant,Event } = require('../models');
const asyncHandler = require("express-async-handler")

// adding a participant
const addParticipant = asyncHandler( async ( req, res, next) => {
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   console.log(errors.array());
  //   return res.status(422).json({ errors: errors.array() });

  // }
  const {fullname, event_id, email, preferred_date_time} = req.body
  let message;
  const participantExists = await Participant.find({ email: req.body.email })
  if(participantExists){
     message = 'Participant exists';
    return services.createSendToken({}, 'error', message, res);
  }
  
      const eventExist = await Event.findById(event_id)
      if (!eventExist){
        return services.createSendToken({}, 'error', message, res)
      }
      const newParticipant = {
        fullname,
        event_id,
        email,
        preferred_date_time
      };
       await Participant(newParticipant).save()
       return services.createSendToken(newParticipant, 'success', message, res);

});

// deleting a participant
const deleteParticipant = (req, res, next) => {
  Participant.findByIdAndDelete({ _id: req.params.id }).exec().then((result) => {
    res.status(200).json({ message: 'Participant deleted' });
  }).catch((err) => {
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
    },
  );
};

module.exports = {
  addParticipant,
  deleteParticipant,
  updateParticipant,
};